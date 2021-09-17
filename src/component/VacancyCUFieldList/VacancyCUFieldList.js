import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { 
    FormControl,
    TextField,
    Grid,
    Button,
    Select,
    NativeSelect,
    FormHelperText
} from '@material-ui/core';

/**
 * {'q': string, 't': string}
 */

const VacancyCUFieldList = (props) => {
    console.log('VAcancyCUFieldList()', props);
    
    let [fields, setFields] = useState(props.fields);

    // Improve the solution?
    const updateField = (e) => {
        console.log(e);
        let fieldType = e.target.attributes.fieldtype.nodeValue;
        let fieldId = parseInt(e.target.attributes.fieldid.nodeValue);
        
        let fieldsUpdated = [...fields];
        let field = fieldsUpdated[fieldId];
        field[fieldType] = e.target.value;
        fieldsUpdated[fieldId] = field;
        setFields(fieldsUpdated);
    }
    const addField = () => {
        let newField = {q: '', t: 'text'};
        setFields([...fields, newField]);
    }
    return (
        <>
            {fields.map((el, idx) =>
                    <Grid key={idx} container spacing={2}>
                        <Grid item xs={6} sm={12}>
                            <TextField label='Field' id={`q[${idx}]`} key={`q${idx}`} inputProps={{fieldtype: 'q', fieldid: idx}}  onChange={updateField} value={el.q} fullWidth={true}/>
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            
                            {/* <Select label='Type' id={`t[${idx}]`} key={`t${idx}`} inputProps={{fieldtype: 't', fieldid: idx}} onChange={updateField} value={el.t} fullWidth={true} >
                                <option value='text'>Text</option>
                                <option value='number'>Number</option>
                            </Select> */}
                            <TextField label='Type' id={`t[${idx}]`} key={`t${idx}`} inputProps={{fieldtype: 't', fieldid: idx}} onChange={updateField} value={el.t} fullWidth={true}/>
                        </Grid>
                        
                    </Grid>
            )}
            <Grid >
                <Button onClick={addField}>Add field</Button>
            </Grid>
        </>
    )
};

VacancyCUFieldList.propTypes = {
    fields: PropTypes.arrayOf(Object).isRequired,
};
export default VacancyCUFieldList;