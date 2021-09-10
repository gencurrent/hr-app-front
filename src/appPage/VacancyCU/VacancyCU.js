import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { 
    TextField,
    FormControl,
    FormHelperText, 
    Typography,
    Button
} from '@material-ui/core';

import { VacancyCUFieldList } from 'component';

const VacancyCU = (props) => {    
    let [position, setPosition] = useState('');
    let [company, setCompany] = useState('');
    let [text, setText] = useState('');
    let [fields, setFields] = useState([{q: '', 't': 'text'}]);

    
    let [createVacancy, {data, loading, error }] = useMutation(gql`
        mutation CreateVacancy($company: String!, $position: String!, $text: String!, $fields: JSONString!){
            createVacancy(company: $company, position: $position, text: $text, fields: $fields){
                company
                position
                fields
            }
        }
    `);

    const save = (e) => {
        let data = {
            position: position,
            company: company,
            text: text,
            fields: fields,
        }
        console.log(data);
        createVacancy({
            variables: {
                company: company,
                position: position,
                text: text,
                fields: JSON.stringify(fields)
            }
        }).then(data => {
            console.log(`Fetched data`, data);
        });
    }
    

    console.log('VacancyCU()');
    return (
        <>
            <Typography align='center' variant='h5'>Create a vacancy</Typography>
            <FormControl className='' noValidate autoComplete='off' fullWidth={true} >
                <TextField label='Position' id='position' value={position} onChange={(e) => setPosition(e.currentTarget.value)} required={true} />
                <FormHelperText>The position to suggest</FormHelperText>
                <TextField label='Company' id='company' value={company} onChange={(e) => setCompany(e.currentTarget.value)} required={true} />
                <FormHelperText>The organization offering the position</FormHelperText>
                <TextField label='Description' id='text' value={text} onChange={(e) => setText(e.currentTarget.value)} required={true} />
                <FormHelperText>The description of vacancy a candidate will see</FormHelperText>
                <VacancyCUFieldList fields={fields} setFields={setFields} />
                
                <Button onClick={save}>Save</Button>
            </FormControl>
            
        </>
    )
};

VacancyCU.propTypes = {
    vacancyId: PropTypes.number
}

export default VacancyCU;