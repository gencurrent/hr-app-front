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
    Container,
    CssBaseline,
    Paper
} from '@material-ui/core';

import { anonCLient, MUTATIONS, QUERIES } from 'utils/apollo';


// const submit = (data) => {
//     anonCLient.query({query: MUTATIONS.SU})
// }

const VacancySubmission = () => {
    const params = useParams();
    console.log('Params', params)

    
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Paper square>

            </Paper>
        </Container>
    )
};

export default VacancySubmission;