/**
 * Contains two classes:
 *  1) VacancyCUFieldListItemDialog for adding a field in the Add Field Dialog
 *  2) VacancyCUFieldList for working with all the fields below main line
 */

import PropTypes from 'prop-types';
import { useState } from 'react';
import { 
    TextField,
    Grid,
    Button,
    Select,
    MenuItem,
    FormHelperText,
    Card,
    FormControl,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Checkbox,
    CardContent,
    CardActions
} from '@material-ui/core';

import {
  FIELD_TYPE_VALUE_TO_HELPER_TEXT_MAP,
  FIELD_TYPE_VALUE_TO_NAME_MAP
} from './constants';

/**
 * A dialog to edit field's parameters
 * @param {*} props {function onClose, function open}
 * @returns JSX
 */
const VacancyCUFieldListItemDialog = (props) => {
  const [fieldDescription, setFieldDescription] = useState({
    q: '',          // Question
    t: 'line',   // Type
    r: true,   // Required
  });
  const {onClose, open} = props;

  let [typeFieldHelperText, setTypeFieldHelperText] = useState(
    FIELD_TYPE_VALUE_TO_HELPER_TEXT_MAP['line']
  );

  const updateQuestion = e => {
    // TODO: Add a question length validation (length > 10 symbols)
    let desc = {...fieldDescription, q: e.target.value};
    setFieldDescription(desc);
  }

  const updateType = e => {
    let desc = {...fieldDescription, t: e.target.value};
    setFieldDescription(desc);
    setTypeFieldHelperText(FIELD_TYPE_VALUE_TO_HELPER_TEXT_MAP[e.target.value]);
  }

  const updateRequired = e => {
    let desc = {...fieldDescription, r: e.target.checked};
    setFieldDescription(desc);
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
                <TextField label='Field (question)' id='field-name' onChange={updateQuestion} value={fieldDescription.q} fullWidth={true}/>
                <FormHelperText>A question to your candidate</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Select
                  label='Type'
                  variant='standard'
                  onChange={updateType}
                  fullWidth
                  defaultValue='line'
                >
                    <MenuItem key='line' value='line'>Line</MenuItem>
                    <MenuItem key='text' value='text'>Text</MenuItem>
                    <MenuItem key='number' value='number'>Number</MenuItem>
                    <MenuItem key='file' value='file'>File</MenuItem>
                    {/* <MenuItem key='date' value='date'>Date</MenuItem> */}
                </Select>
                <FormHelperText>{typeFieldHelperText}</FormHelperText>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControlLabel control={<Checkbox checked={fieldDescription.r} onChange={updateRequired} />} label="Field is required" />
              </Grid>
            </Grid>
            
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button autoFocus onClick={handleSave}>Add</Button>
        </DialogActions>
        
      </Dialog>
  )
};

VacancyCUFieldListItemDialog.propTypes = {
    onClose: PropTypes.func.isRequired,     // Dialog got closed callback function
    open: PropTypes.bool.isRequired,    // Dialog got opened callback
    onSave: PropTypes.func.isRequired  // New field submitted (saved)
};

// const useVacancyCUFieldListStyles = makeStyles(theme => ({
//   fieldItemCard: {
//     padding: theme.spacing(1),
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1)
//   },
//   fieldRequiredSymbol: {
//     color: theme.palette.secondary.dark
//   }
// }));



const VacancyCUFieldList = (props) => {
    
    let [fields, setFields] = useState(props.fields || []);
    
    let [dialogOpen, setDialogOpen] = useState(false); 

    const openAddFieldDialog = e => {
        setDialogOpen(!dialogOpen);
    }

    const closeAddFieldDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const saveField = fieldProps => {
        let newFields = [...fields];
        newFields.push(fieldProps);
        setFields(newFields);
        props.setFields && props.setFields(newFields);  // Update parent component fields
    }

    const removeField = fieldIdx => {
      let newFields = [...fields];
      newFields.splice(fieldIdx, 1);
      setFields(newFields);
    }

    return (
        <>
            <VacancyCUFieldListItemDialog
              open={dialogOpen}
              onClose={closeAddFieldDialog}
              onSave={saveField}
            />
            {fields.map((el, idx) =>
                <Grid key={idx} container spacing={2}>
                    <Grid item xs={12}>
                        <Card variant='outlined'>
                          <CardContent>
                            <Typography component='h6' variant='h6'>{idx+1}: {el.q}</Typography>
                            <Typography component='span' variant='span'>{FIELD_TYPE_VALUE_TO_NAME_MAP[el.t]}</Typography> | <Typography component='span' color='text.secondary' variant='span'>{el.r ? "Required" : "Not required"}</Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <Button>Edit</Button>
                            <Button onClick={e => removeField(idx)}>Delete</Button>
                          </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            )}
            <Grid >
                <Button variant='contained' color='secondary' onClick={openAddFieldDialog}>Add field</Button>
            </Grid>
        </>
    )
};

VacancyCUFieldList.propTypes = {
    fields: PropTypes.arrayOf(Object).isRequired,
    setFields: PropTypes.func
};
export default VacancyCUFieldList;