/**
 * TOOD:
 * 1. Load the vacancy
 * 2. Insert data into HTML
 * 3. Create Fields based on the submission
 * 4. Send the submission
 */

import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import {
    FormControl,
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

import { pureApolloClient, MUTATIONS, QUERIES } from 'utils/apollo';



const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
    mainCard: {
        padding: 4,
        margin: 4
    }
}));

// const submit = (data) => {
//     anonCLient.query({query: MUTATIONS.SU})
// }

const FieldItem = (props) => {
    const {field} = {...props};
    console.log(field);

    const setKey = (e) => {
        const key = field.q;
        const value = e.target.value;
        
        props.valueUpdateCallback(key, value);
    }

    return (
        <>
          <Grid container spacing={3} xs={12}>
            <Grid item spacing={6} sm={12} xs={6}>
                <Typography variant='p'>{field.q}</Typography>
            {field.t === 'text' && <TextField
              onChange={setKey}
              margin='normal' fullWidth={true} multiline key={`field-${field.q}`}
            />}
            {field.t === 'line' && <TextField
              onChange={setKey}
              margin='normal' fullWidth type='text' key={`field-${field.q}`}
            />}
            {field.t === 'number' && <TextField 
                onChange={setKey}
              margin='normal' fullWidth type='number' key={`field-${field.q}`} 
            />}
            {field.t === 'date' && <TextField 
                onChange={setKey}
              type='date' key={`field-${field.q}`} 
            />}
            </Grid>
          </Grid>
        </>
    )
}
FieldItem.propTypes = {
    valueUpdateCallback: PropTypes.func.isRequired
}


const VacancySubmission = () => {
    const params = useParams();
    const vacancyId = params.id;
    const classes = useStyles();
    let [answers, setAnswers] = useState({});
    console.log('Params', params)
    const { loading, error, data } = useQuery(QUERIES.VACANCY, {variables: {id: vacancyId}});

    // Data can not be empty
    if (data){
        
    }


    const submitAnswers = (e) => {
        let answersArray = Object.keys(answers).map((key) => {
            let a = answers[key];
            return {q: key, a: a};
        });
        
        const submissionData = {
            vacancyId: vacancyId,
            answers: JSON.stringify(answersArray)
        };
        console.log('VacancySubmission // Data to be sent', submissionData);
        // const {subLoading, subError, subData} = pureApolloClient.mutate({
        pureApolloClient.mutate({
            mutation: MUTATIONS.CREATE_SUBMISSION,
            variables: {...submissionData}
        }).then(response => console.log(response));
    }

    const editData = (key, value) => {
        const answersData = {...answers};
        answersData[key] = value;
        console.log('VacancySubmission // editData() // answersData', answersData);
        setAnswers(answersData);
    }
    
    return (
        <>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}
            {data && <>
              <Container component='main' sx={{ my: 4 }}>
                <Paper variant='elevation' className={classes.mainCard} sx={{ mb: 4 }} >
                    <Typography variant='h1' variant='h4' align='center' gutterBottom>Apply to the {data.vacancy.position}</Typography>
                    {/* Should we use Stepper ? */}
                    
                    <Grid container spacing={3} sx={{p: 4}} xs={12}>

                        <Grid item spacing={6} xs={12}>
                            <Typography variant="h5" gutterBottom>
                                {data.vacancy.position}
                            </Typography>
                        </Grid>

                        <Grid item spacing={6} xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {data.vacancy.company}
                            </Typography>
                        </Grid>


                        <Grid item spacing={6} xs={12}>
                            <FormControl fullWidth={true} className={classes.formControl} variant='outlined' >
                                {JSON.parse(data.vacancy.fields).map((field, idx) => <FieldItem valueUpdateCallback={editData} field={field} />)
                                }
                            </FormControl>
                        </Grid>
                        <Grid item spacing={6} xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={submitAnswers} variant='contained'>
                                    Submit
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Paper>
              </Container>
            </>
            }
        </>
    )
};


export default VacancySubmission;