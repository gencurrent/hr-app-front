/**
 * TOOD:
 * 1. Load the vacancy
 * 2. Insert data into HTML
 * 3. Create Fields based on the submission
 * 4. Send the submission
 */

import {React} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
    FormControl,
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Container,
    Button
} from '@material-ui/core';

import { anonCLient, MUTATIONS, QUERIES } from 'utils/apollo';


// const submit = (data) => {
//     anonCLient.query({query: MUTATIONS.SU})
// }

const FieldItem = (props) => {
    const {field} = {...props};
    console.log(field);
    return (
        <>
        <Grid item spacing={6} xs={12}>
          <Typography variant='p'>{field.q}</Typography>
        </Grid>
        <Grid item spacing={6} sm={12}>
        {field.t === 'text' && <TextField fullWidth multiline></TextField>}
        {field.t === 'line' && <TextField type='text'></TextField>}
        {field.t === 'number' && <TextField type='number'></TextField>}
        </Grid>
        </>
    )
}

const VacancySubmission = () => {
    const params = useParams();
    const vacancyId = params.id;
    console.log('Params', params)
    const { loading, error, data } = useQuery(QUERIES.VACANCY, {variables: {id: vacancyId}});

    
    return (
        <>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}
            {data && <>
              <Container component='main' sx={{ mb: 4 }}>
                <Paper variant='outlined' sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography variant='h1' variant='h4' align='center' gutterBottom>Apply to the {data.vacancy.position}</Typography>
                    {/* Should we use Stepper ? */}
                    
                    <Grid container spacing={3}>

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
                                {JSON.parse(data.vacancy.fields).map((field, idx) => <FieldItem field={field} />)
                                }
                        </Grid>
                        <Grid item spacing={6} xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant='contained'>
                                    Submit
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Paper>
              </Container>
                {/* <FormControl noValidate autoComplete='off' fullWidth={true}>
                    <form>
                    </form>
                </FormControl> */}
            </>
            }
        </>
    )
};


export default VacancySubmission;