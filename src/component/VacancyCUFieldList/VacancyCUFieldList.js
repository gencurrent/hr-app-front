import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { 
    makeStyles,
    TextField,
    Grid,
    Button,
    Select,
    MenuItem,
    NativeSelect,
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
    CardHeader,
    CardContent,
    CardActions
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
    // TODO: Add a question length validation (length > 3 symbols)
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

const useVacancyCUFieldListStyles = makeStyles(theme => ({
  fieldItemCard: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  fieldRequiredSymbol: {
    color: theme.palette.secondary.dark
  }
}));



const VacancyCUFieldList = (props) => {
    console.log('VAcancyCUFieldList()', props);
    const classes = useVacancyCUFieldListStyles();
    
    let [fields, setFields] = useState(props.fields || []);
    
    let [dialogOpen, setDialogOpen] = useState(false); 

    const openAddFieldDialog = e => {
        setDialogOpen(!dialogOpen);
    }

    const closeAddFieldDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const saveField = fieldProps => {
        console.log('VacancyCUFieldList // saveField() // fieldProps = ', fieldProps);
        let newFields = [...fields];
        newFields.push(fieldProps);
        setFields(newFields);
    }

    const removeField = fieldIdx => {
      let newFields = [...fields];
      newFields.splice(fieldIdx, 1);
      setFields(newFields);
    }
    
    const fieldTypeMap = {
      'text': 'Text',
      'number': 'Number',
      'line': 'Short text',
      'date': 'Date'
    }

    console.log('VAcancyCUFieldList // fields = ', fields);

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
                    <Grid item xs={12}>
                        <Card variant='outlined'>
                          <CardContent>
                            <Typography component='h6' variant='h6'>{idx+1}: {el.q}</Typography>
                            <Typography component='span' variant='span'>{fieldTypeMap[el.t]} field</Typography> | <Typography component='span' color='text.secondary' variant='span'>Required</Typography>
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
                <Button variant='contained' onClick={openAddFieldDialog}>Add field</Button>
            </Grid>
        </>
    )
};

VacancyCUFieldList.propTypes = {
    fields: PropTypes.arrayOf(Object).isRequired,
};
export default VacancyCUFieldList;