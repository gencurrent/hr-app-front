import { React, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import {
    FormControl,
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    makeStyles
} from '@material-ui/core';
import {
    DeleteForever
} from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';

import { pureApolloClient, MUTATIONS, QUERIES } from 'utils/apollo';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
    mainCard: {
        padding: theme.spacing(2),
        margin: theme.spacing(0)
    }
}));

const FieldItem = (props) => {
    const {field, vacancy} = props;
    
    // File fields
    const [stateFiles, setStateFiles] = useState([]);
    // Field-specific errors
    const [fieldError, setFieldError] = useState(field.r ? 'The field is required' : '');
    const {
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        multiple: false,
        validator: fileValidator
    });


    const onFileRemove = e => {
        e.stopPropagation();
        removeFile(acceptedFiles[0]);
    }

    const acceptedFileItems = stateFiles.map(file => (
        <li key={file.path}>
            {reduceFileName(file.path)} — {file.size} bytes
            <Button variant='outlined' size='small' onClick={onFileRemove}><DeleteForever/>Remove</Button>
        </li>
    ))

    const setKey = (e) => {
        const value = e.target.value;
        drillValue(value);
    }

    /**
     * Drill the value onto the upper level (Parent Component's callback)
     * @param {Object} value The value to pass on
     */
    const drillValue = (value) => {
        const key = field.q;
        if (field.r === true){
            if(value === undefined || value === ''){
                setFieldError('The field is required');
            }
        }
        else {
            setFieldError(undefined);
        }
        props.valueUpdateCallback(key, value);
    }

    function removeFile(file){
        setStateFiles([]);
        drillValue(undefined);
    }
    function reduceFileName(filename) {
        let re = /^(?<name>.*?)\.?(?<ext>\w*)$/g;
        const match = re.exec(filename);
        const name  = match.groups['name'];
        const ext = match.groups['ext'];
        const newName = filename < 70 ? filename : `${name.slice(0, 50)}..._.${ext.slice(0,10)}`;
        return newName;
    }

    function fileValidator(file) {
        // Request a submission from the Back End
        const filename = reduceFileName(file.path);
        pureApolloClient.mutate({
            mutation: MUTATIONS.CREATE_S3_UPLOAD_REQUEST,
            variables: {
                filename: filename,
                vacancyUUID: vacancy.uuid,
                submissionUUID: vacancy.uuid
            }
        }).then(
            (response) => { 
                let signature = JSON.parse(response.data.createS3UploadRequest.signature);
                let {url, key} = signature;
                let formData = new FormData();
                formData.append('files', file, filename);
                // Push the validated file to the Cloud Storage
                fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    body: formData
                })
                    .then(e => drillValue(key))
                    .then(() => {
                        setStateFiles([file]);
                        setFieldError(undefined);
                    });
            }
        );
        return null;
    }

    return (
          <Grid container>
            <Grid item spacing={6} sm={12} xs={12}>
            {field.t === 'text' && <TextField
                onChange={setKey}
                label={field.q}
                helperText={fieldError}
                required={field.r}
                error={fieldError !== undefined}
                margin='normal'
                fullWidth={true}
                multiline
                rows={4}
                key={`field-${field.q}`}
            />}
            {field.t === 'line' && <TextField
                onChange={setKey}
                label={field.q}
                helperText={fieldError}
                required={field.r}
                error={fieldError !== undefined}
                margin='normal'
                fullWidth
                key={`field-${field.q}`}
            />}
            {field.t === 'number' && <TextField 
                onChange={setKey}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                label={field.q}
                helperText={fieldError}
                required={field.r}
                error={fieldError !== undefined}
                margin='normal'
                variant='outlined'
                fullWidth
                type='number'
                key={`field-${field.q}`}
            />}
            {field.t === 'file' && <>
            {/* <input onChange={onFileChange} type='file' max={1} /> */}
            {/* <Card variant={'outlined'}> */}
            <p className="MuiInputBase-input MuiInput-input">{field.q}</p>
            <div className='drag-n-drop background-stripes'>
                <div
                    {...getRootProps({className: 'dropzone'})}
                    >
                        <input {...getInputProps()} />
                        <p style={{'textAlign': 'center'}}>Click here or drop a file here</p>
                        {/* <em>Only files with size less than 2MB are allowed</em> */}
                        <Typography align='center' component='h4'>Accepted file</Typography>
                        <p>{acceptedFileItems}</p>
                </div>
            </div>
            {field.r && <p class="MuiFormHelperText-root Mui-error Mui-required">{fieldError}</p>}
            {/* </Card> */}
            </>}
            {/* {field.t === 'date' && <TextField
                    onChange={setKey}
                    label="Birthday"
                    helperText={fieldError}
                    type="date"
                    defaultValue=''
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true
                    }}
                />} */}
            </Grid>
          </Grid>
    )
}
FieldItem.propTypes = {
    valueUpdateCallback: PropTypes.func.isRequired,
    vacancy: PropTypes.object.isRequired,
    setErrorsCallback: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}


const VacancySubmissionPage = () => {
    const params = useParams();
    const vacancyId = params.id;
    const classes = useStyles();
    const history = useHistory();
    const { loading, error, data: vacancyData } = useQuery(QUERIES.VACANCY, {variables: {id: vacancyId}});
    const vacancyFields = vacancyData && vacancyData.vacancy ? JSON.parse(vacancyData.vacancy.fields) : [];
    const [answers, setAnswers] = useState({});
    const [formError, setFormError] = useState('');

    
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    /**
     * Submit answers from the Submission form
     * @param {Event} e An event object
     * @return {null}
     */
    const submitAnswers = (e) => {
        let answersDict = {}
        vacancyFields.forEach(
            (field) => {answersDict[field.q] = null}
        );
        answersDict = {...answersDict, ...answers};
        
        let answersArray = Object.keys(answersDict).map((key) => ({q: key, a: answersDict[key]}));

        const submissionData = {
            fullname: fullname,
            email: email,
            phone: phone,
            vacancyId: vacancyId,
            answers: JSON.stringify(answersArray)
        };
        pureApolloClient.mutate({
            mutation: MUTATIONS.CREATE_SUBMISSION,
            variables: submissionData
        })
        .then(result => {
            if (result && result.data && result.data.createSubmission){
                history.push(`/vacancy/${vacancyId}/applied`);
            }
        }).catch(error => {
            const message = error.message;
            if (message === 'The email is invalid'){
                setFormError('*The email is invalid');
            }
            else if (message === 'The phone number is invalid'){
                setFormError('*The phone number is invalid');
            }
            else {
                setFormError('*Please, check all the fields');
            }
        });
    }

    const editData = (key, value) => {
        const answersData = {...answers};
        answersData[key] = value;
        setAnswers(answersData);
    }
    
    return (
        <>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}
            {vacancyData && <>
              <Box sx={{py: 4}}>
                <Paper variant='elevation' className={classes.mainCard} >
                    <Typography variant='h4' align='center' gutterBottom>{vacancyData.vacancy.position}</Typography>
                    {/* Should we use Stepper ? */}
                    
                    <Grid container>

                        <Grid item xs={12}>
                            <Typography variant="h5" align={'center'} gutterBottom>
                                {vacancyData.vacancy.company}
                            </Typography>
                        </Grid>


                        <Grid item spacing={6} xs={12}>
                        <FormControl fullWidth={false} className={classes.formControl} variant='outlined' >
                            <TextField
                                onChange={e => setFullname(e.target.value)}
                                label={'Full name'}
                                name='name'
                                id='name'
                                required
                                helperText={'Required'}
                                margin='normal'
                                autoComplete='name'
                                fullWidth
                            />
                            <TextField
                                onChange={e => setEmail(e.target.value)}
                                label={'Email'}
                                name='email'
                                id='email'
                                required
                                helperText={'Required'}
                                margin='normal'
                                autoComplete='email'
                                fullWidth
                            />
                            <TextField
                                label={'Phone in format +(country code)(number)'}
                                name='phone'
                                id='phone'
                                onChange={e => setPhone(e.target.value)}
                                margin='normal'
                                autoComplete='phone'
                                fullWidth
                            />
                        </FormControl>
                            <FormControl fullWidth={true} className={classes.formControl} variant='outlined' >
                                {
                                  vacancyFields.map(
                                      (field, idx) => <FieldItem
                                        valueUpdateCallback={editData}
                                        field={field}
                                        vacancy={vacancyData.vacancy} 
                                    />)
                                }
                            </FormControl>
                        </Grid>
                        <Grid item spacing={6} xs={12}>
                            <Typography>{formError}</Typography>
                        </Grid>
                        <Grid item spacing={6} xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={submitAnswers} variant='contained' color='primary'>
                                    Submit
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Paper>
              </Box>
            </>
            }
        </>
    )
};


export default VacancySubmissionPage;