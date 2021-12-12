import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { 
    TextField,
    FormControl,
    FormHelperText, 
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    Grid
} from '@material-ui/core';

import { VacancyCUFieldList } from 'component';
import {
  FIELD_VACANCY_HELPER_TEXT_DEFAULT,
  FIELD_VACANCY_HELPER_TEXT_DEFAULT_LENGTH_ERROR
} from './constants';
import { MUTATIONS } from 'utils/apollo';
import { Box } from '@mui/system';



const TEXT_FIELD_ROWS_NUMBER_DEFAULT = 3;

const VacancyCreateEditPage = (props) => {    
    let history = useHistory();
    let [position, setPosition] = useState('');
    let [company, setCompany] = useState('');
    let [text, setText] = useState('');
    let [fields, setFields] = useState([]);

    let [rowsNumber, setRowsNumber] = useState(5);
    
    const [positionFieldHelperProps, setPositionFieldHelperProps] = useState({'error': false, 'text': FIELD_VACANCY_HELPER_TEXT_DEFAULT});

    const updateFormPosition = e => {
        let value = e.currentTarget.value;
        if (value.length < 10){
            setPositionFieldHelperProps({'error': true, 'text': FIELD_VACANCY_HELPER_TEXT_DEFAULT_LENGTH_ERROR});
        }
        else {
            setPositionFieldHelperProps({'error': false, 'text': FIELD_VACANCY_HELPER_TEXT_DEFAULT});
        }
        setPosition(value);
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
      createVacancy({
        variables: {
          company: company,
          position: position,
          text: text,
          fields: JSON.stringify(fields)
        }
      }).then(data => {
          // Success only
          history.push('/vacancy');
      });
    }
    return (
      <Grid container direction='column' spacing={2}>
        <Grid item sm={12}>
          <Typography variant='h4' component='h3'>New vacancy</Typography>
          <FormControl className='' noValidate autoComplete='off' fullWidth={true} >
            <TextField label='Position' error={positionFieldHelperProps['error']} autoComplete='position' id='position' value={position} onChange={updateFormPosition} required />
            <FormHelperText error={positionFieldHelperProps['error']}>{positionFieldHelperProps['text']}</FormHelperText>
            <TextField label='Company' autoComplete='company' id='company' value={company} onChange={(e) => setCompany(e.currentTarget.value)} required />
            <FormHelperText>An organization to show to a candidate</FormHelperText>
            <TextField multiline rows={rowsNumber} label='Description' id='text' value={text} onChange={updateFormText} required />
            <FormHelperText>The description of vacancy a candidate will see</FormHelperText>
            <VacancyCUFieldList fields={fields} setFields={setFields} />
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={save}>Save</Button>
          </Grid>
        </Grid>
        // </CardContent>
        // <CardActions>
        // </CardActions>
          
      // </Card>
    )
};

VacancyCreateEditPage.propTypes = {
    vacancyId: PropTypes.number
}

export default VacancyCreateEditPage;