/**
 * 
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    Typography,
    TextField,
    Button
} from '@material-ui/core';

import { pureApolloClient, MUTATIONS } from 'utils/apollo';
import {
    DeleteForever
} from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';


const AnonymousVacancySubmissionFieldItem = (props) => {
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
        validator: fileProcessor
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
        if (field.r){
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

    // Request a file upload presigned-URL to the Back End
    function fileProcessor(file) {
        const filename = reduceFileName(file.path);
        pureApolloClient.mutate({
            mutation: MUTATIONS.CREATE_S3_UPLOAD_REQUEST,
            variables: {
                filename: filename,
                vacancyUUID: vacancy.uuid,
                submissionUUID: vacancy.submissionUUID
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
};

AnonymousVacancySubmissionFieldItem.propTypes = {
    valueUpdateCallback: PropTypes.func.isRequired,
    vacancy: PropTypes.object.isRequired
};

export default AnonymousVacancySubmissionFieldItem;