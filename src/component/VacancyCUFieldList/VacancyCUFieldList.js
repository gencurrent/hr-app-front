import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { 
    TextField,
    Grid,
    Button,
    Select,
    MenuItem,
    NativeSelect,
    FormHelperText,
    FormControl,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Checkbox
} from '@material-ui/core';


/**
 * A dialog to edit field's parameters
 * @param {*} props {function onClose, function open}
 * @returns JSX
 */
const VacancyCUFieldListItemDialog = (props) => {
  const [fieldDescription, setFieldDescription] = useState({
    q: '',          // Question
    t: undefined,   // Type
    r: undefined,   // Required
    s: undefined,   // Default Score
  });
  const {onClose, open} = props;

  const updateQuestion = e => {
      let desc = {...fieldDescription, q: e.target.value};
      setFieldDescription(desc);
      props.updateNewFieldState && props.updateNewFieldState(desc);
  }
  const updateType = e => {
    let desc = {...fieldDescription, t: e.target.value};
    setFieldDescription(desc);
    props.updateNewFieldState && props.updateNewFieldState(desc);
  }

  const updateRequired = e => {
    let desc = {...fieldDescription, r: e.target.checked};
    setFieldDescription(desc);
    props.updateNewFieldState && props.updateNewFieldState(desc);
  }
  
  const handleClose = (e) => {
      onClose();
  }
  const handleSave = (e) => {
    props.onSave(fieldDescription);
    props.onClose();
  }
  
  return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit field</DialogTitle>
        <DialogContent>
          <FormControl>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField label='Field' id='field-name' onChange={updateQuestion} value={fieldDescription.q} fullWidth={true}/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Select label='Type' id='Type' onChange={updateType} fullWidth={true} >
                    <MenuItem value='text'>Text</MenuItem>
                    <MenuItem value='number'>Number</MenuItem>
                    <MenuItem value='date'>Date</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControlLabel control={<Checkbox defaultChecked onChange={updateRequired} />} label="Field is required" />
              </Grid>
            </Grid>
            
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button autoFocus onClick={handleSave}>Save</Button>
        </DialogActions>
        
      </Dialog>
  )
};

VacancyCUFieldListItemDialog.propTypes = {
    onClose: PropTypes.func.isRequired,     // Dialog got closed callback function
    open: PropTypes.bool.isRequired,    // Dialog got opened callback
    updateNewFieldState: PropTypes.func,    // Dialog updated new fiedl state
    onSave: PropTypes.func.isRequired  // New field submitted (saved)
};

const VacancyCUFieldList = (props) => {
    console.log('VAcancyCUFieldList()', props);
    
    let [fields, setFields] = useState(props.fields || []);
    
    let [dialogOpen, setDialogOpen] = useState(false); 

    const openAddFieldDialog = e => {
        setDialogOpen(!dialogOpen);
    }

    const closeAddFieldDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const addField = () => {
        let newField = {q: '', t: 'text'};
        setFields([...fields, newField]);
    }

    const saveField = fieldProps => {
        console.log('VacancyCUFieldList // saveField() // fieldProps = ', fieldProps);
        let newFields = [...fields];
        newFields.push(fieldProps);
        setFields(newFields);
    }

    return (
        <>
            <VacancyCUFieldListItemDialog
              open={dialogOpen}
              onClose={closeAddFieldDialog}
              onSave={saveField} 
              updateNewFieldState={(data) => console.log(data)}
            />
            {fields.map((el, idx) =>
                <Grid key={idx} container spacing={2}>
                    <Grid item xs={6} sm={12}>
                        {JSON.stringify(el)}
                    </Grid>
                </Grid>
            )}
            <Grid >
                <Button onClick={openAddFieldDialog}>Add field</Button>
            </Grid>
        </>
    )
};

VacancyCUFieldList.propTypes = {
    fields: PropTypes.arrayOf(Object).isRequired,
};
export default VacancyCUFieldList;