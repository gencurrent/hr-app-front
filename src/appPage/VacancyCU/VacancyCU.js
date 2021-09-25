import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { 
    TextField,
    FormControl,
    FormHelperText, 
    Typography,
    Button,
    Card,
    CardContent,
    CardActions
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

import { VacancyCUFieldList } from 'component';
import { MUTATIONS } from 'utils/apollo';


const TEXT_FIELD_ROWS_NUMBER_DEFAULT = 3;

const VacancyCU = (props) => {    
    let [position, setPosition] = useState('');
    let [company, setCompany] = useState('');
    let [text, setText] = useState('');
    let [fields, setFields] = useState([]);

    let [rowsNumber, setRowsNumber] = useState(5);
    
    const [positionHelperText, setPositionHelperText] = useState('');

    const updateFormPosition = e => {
        
    }

    const updateFormText = e => {
      let strToCheck = RegExp('\n', 'g')
      let matchesReg = e.currentTarget.value.matchAll(strToCheck)
      let newRowsNumber = Array.from(matchesReg).length + 1;
      setRowsNumber(
          newRowsNumber > TEXT_FIELD_ROWS_NUMBER_DEFAULT ? newRowsNumber : TEXT_FIELD_ROWS_NUMBER_DEFAULT
      );
      setText(e.currentTarget.value);
    }

    
    let [createVacancy, {data, loading, error }] = useMutation(MUTATIONS.CREATE_VACANCY);

    const save = (e) => {
        let data = {
            position: position,
            company: company,
            text: text,
            fields: fields,
        }
        console.log('VacancyCU // data // ',data);
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
    return (
      <Card>
        <CardContent>
          <Typography align='center' variant='h5'>New vacancy</Typography>
          <FormControl className='' noValidate autoComplete='off' fullWidth={true} >
            <TextField label='Position' autoComplete='position' id='position' value={position} onChange={(e) => setPosition(e.currentTarget.value)} required={true} />
            <FormHelperText>Vacancy position</FormHelperText>
            <TextField label='Company' autoComplete='company' id='company' value={company} onChange={(e) => setCompany(e.currentTarget.value)} required={true} />
            <FormHelperText>An organization to show to a candidate</FormHelperText>
            <TextField multiline rows={rowsNumber} label='Description' id='text' value={text} onChange={updateFormText} required={true} />
            <FormHelperText>The description of vacancy a candidate will see</FormHelperText>
            <VacancyCUFieldList fields={fields} setFields={setFields} />
          </FormControl>
        </CardContent>
        <CardActions>
            <Button variant='contained' onClick={save}>Save</Button>
        </CardActions>
          
      </Card>
    )
};

VacancyCU.propTypes = {
    vacancyId: PropTypes.number
}

export default VacancyCU;