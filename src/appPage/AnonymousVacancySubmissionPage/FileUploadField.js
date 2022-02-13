import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button
} from '@material-ui/core';
import {
  DeleteForever
} from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';

import { pureApolloClient, MUTATIONS } from 'utils/apollo';


function FileUploadField(props) {
  const {
    fieldRequired,
    callBack,
    vacancy,
    fieldText
  } = props;

  const [stateFiles, setStateFiles] = useState([]);
  const [fieldError, setFieldError] = useState(fieldRequired ? 'The field is required' : '');
  const {
      acceptedFiles,
      getRootProps,
      getInputProps
  } = useDropzone({
      multiple: false,
      validator: fileProcessor
  });


  function onFileRemove(e) {
    e.stopPropagation();
    removeFile(acceptedFiles[0]);
  };

  /**
   * The wrapper around the parent's callback on the value being udpated.
   * @param {String|undefined} value A file path in Cloud Storage in String or an undefined (file removed from uploading) value
   */
  function valueUpdatedcallBackWrapper(value) {
    if (fieldRequired && !value){
      setFieldError('The field is required');
    }
    else {
      setFieldError(undefined);
    }
    callBack(value);
  };


  function removeFile(file){
    setStateFiles([]);
    valueUpdatedcallBackWrapper(undefined);
  };
  function reduceFileName(filename) {
      let re = /^(?<name>.*?)\.?(?<ext>\w*)$/g;
      const match = re.exec(filename);
      const name  = match.groups['name'];
      const ext = match.groups['ext'];
      const newName = filename < 70 ? filename : `${name.slice(0, 50)}..._.${ext.slice(0,10)}`;
      return newName;
  };

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
          .then(e => valueUpdatedcallBackWrapper(key))
          .then(() => {
              setStateFiles([file]);
              setFieldError(undefined);
          });
      }
    );
    return null;
  };

  const acceptedFileItems = stateFiles.map(file => (
    <li key={file.path}>
        {reduceFileName(file.path)} — {file.size} bytes
        <Button variant='outlined' size='small' onClick={onFileRemove}><DeleteForever/>Remove</Button>
    </li>
  ));
  
  return (
    <>
    <p className="MuiInputBase-input MuiInput-input">{fieldText}</p>
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
    {fieldRequired && <p class="MuiFormHelperText-root Mui-error Mui-required">{fieldError}</p>}
    </>
    );
};

FileUploadField.propTypes = {
  callBack: PropTypes.func.isRequired,
  fieldRequired: PropTypes.bool,
  vacancy: PropTypes.object.isRequired,
  fieldText: PropTypes.string.isRequired
};

export default FileUploadField;