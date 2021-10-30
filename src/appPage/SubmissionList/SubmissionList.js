import {React} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Box,
  Card,
  Container,
  Paper,
  Typography
} from '@material-ui/core';

import { SubmissionListItemAnswer } from 'component';
import { QUERIES } from 'utils/apollo';

const useStyles = makeStyles((theme) => ({
  submissionListItem: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SubmissionList(props) {
  const classes = useStyles();
  const { vacancyId } = useParams();
  
  let { loading, error, data, refetch } = useQuery(QUERIES.VACANCY_WITH_SUBMISSION_LIST, {
    fetchPolicy: "no-cache",
    variables: {
      id: vacancyId
    }
  });
  return (
    
    <Box>
        {loading ? 
        (<div>Loading...</div>)
        :
        data.vacancy.submissionList.map(
          (submission) => (
            <Container>
              <Card variant='outlined' className={classes.submissionListItem}>
                <Typography>{submission.uuid}</Typography>
                {JSON.parse(submission.answers).map(answer => (
                    <SubmissionListItemAnswer answer={answer} vacancy={data.vacancy} />
                  )
                )}
              </Card>
            </Container>
          )
        )
        }
        
    </Box>
  )
};

export default SubmissionList;
