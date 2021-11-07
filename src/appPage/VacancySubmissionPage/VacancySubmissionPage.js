/**
 * TOOD:
 * 1. Load the vacancy
 * 2. Insert data into HTML
 * 3. Create Fields based on the submission
 * 4. Send the submission
 */

import { React, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import {
    FormControl,
    Card,
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Container,
    Button,
    makeStyles,
    InputLabel
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
    
    const [stateFiles, setStateFiles] = useState([]);
    const {
        acceptedFiles,
        fileRejections,
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
        const key = field.q;
        const value = e.target.value;
        
        props.valueUpdateCallback(key, value);
    }


    const setValue = (value) => {
        const key = field.q;
        props.valueUpdateCallback(key, value);
    }

    function removeFile(file){
        setStateFiles([]);
        setValue(undefined);
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
                    .then(e => setValue(key))
                    .then(() => setStateFiles([file]));
            }
        );
        return null;
    }

    return (
          <Grid container spacing={0} xs={12}>
            <Grid item spacing={6} sm={12} xs={12}>
            {field.t === 'text' && <TextField
                onChange={setKey}
                label={field.q}
                required={field.r}
                margin='normal'
                fullWidth={true}
                multiline
                rows={4}
                key={`field-${field.q}`}
            />}
            {field.t === 'line' && <TextField
                onChange={setKey}
                label={field.q}
                required={field.r}
                margin='normal'
                fullWidth
                type='text'
                key={`field-${field.q}`}
            />}
            {field.t === 'number' && <TextField 
                onChange={setKey}
                label={field.q}
                required={field.r}
                margin='normal'
                variant='outlined'
                fullWidth
                type='number'
                key={`field-${field.q}`}
            />}
            {field.t === 'file' && <>
            {/* <input onChange={onFileChange} type='file' max={1} /> */}
            {/* <Card variant={'outlined'}> */}
            <div className='drag-n-drop background-stripes'>
                <div
                    {...getRootProps({className: 'dropzone'})}
                    >
                        <input {...getInputProps()} />
                        <p style={{'textAlign': 'center'}}>Click here or drop a file here</p>
                        {/* <em>Only files with size less than 2MB are allowed</em> */}
                        <Typography align='center' component='h4'>Accepted files</Typography>
                        <p>{acceptedFileItems}</p>
                </div>
            </div>
            {/* </Card> */}
            </>}
            {field.t === 'date' && <TextField 
                onChange={setKey}
                label={field.q}
                required={field.r}
                type='date'
                key={`field-${field.q}`} 
            />}
            </Grid>
          </Grid>
    )
}
FieldItem.propTypes = {
    valueUpdateCallback: PropTypes.func.isRequired,
    vacancy: PropTypes.object.isRequired
}


const VacancySubmissionPage = () => {
    const params = useParams();
    const vacancyId = params.id;
    const classes = useStyles();
    const history = useHistory();
    let [answers, setAnswers] = useState({});
    const { loading, error, data } = useQuery(QUERIES.VACANCY, {variables: {id: vacancyId}});

    
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const submitAnswers = (e) => {
        let answersArray = Object.keys(answers).map((key) => {
            let a = answers[key];
            return {q: key, a: a};
        });

        const submissionData = {
            fullname: fullname,
            email: email,
            phone: phone,
            vacancyId: vacancyId,
            answers: JSON.stringify(answersArray)
        };
        pureApolloClient.mutate({
            mutation: MUTATIONS.CREATE_SUBMISSION,
            variables: {...submissionData}
        }).then(result => {
            if (result && result.data && result.data.createSubmission){
                history.push(`/vacancy/${vacancyId}/applied`);
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
            {data && <>
                <Box sx={{py: 4}}>
                <Paper variant='elevation' className={classes.mainCard} >
                    <Typography variant='h1' variant='h4' align='center' gutterBottom>{data.vacancy.position}</Typography>
                    {/* Should we use Stepper ? */}
                    
                    <Grid container>

                        <Grid item xs={12}>
                            <Typography variant="h5" align={'center'} gutterBottom>
                                {data.vacancy.company}
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
                                label={'Phone'}
                                name='phone'
                                id='phone'
                                onChange={e => setPhone(e.target.value)}
                                margin='normal'
                                autoComplete='phone'
                                fullWidth
                            />
                        </FormControl>
                            <FormControl fullWidth={true} className={classes.formControl} variant='outlined' >
                                {JSON.parse(data.vacancy.fields).map((field, idx) => <FieldItem valueUpdateCallback={editData} field={field} vacancy={data.vacancy} />)
                                }
                            </FormControl>
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