import {React} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Box,
  Card,
  Typography
} from '@material-ui/core';

import { SubmissionListItemAnswer } from 'component';
import { QUERIES } from 'utils/apollo';

const useStyles = makeStyles((theme) => ({
  submissionListItem: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SubmissionListPage(props) {
  const classes = useStyles();
  const { vacancyId } = useParams();
  
  let { loading, error, data, refetch } = useQuery(QUERIES.VACANCY_WITH_SUBMISSION_LIST, {
    fetchPolicy: "no-cache",
    variables: {
      id: vacancyId
    }
  });
  return (
    
    <Box sx={{py: 4}}>
        {loading ? 
        (<div>Loading...</div>)
        :
        <>
          <Typography component='h6' variant='h6'>
            Vacancy <Link to={`/vacancy/${vacancyId}`}>{data.vacancy.position}</Link> submissions
          </Typography>
          {data.vacancy.submissionList.map(
            submission => (
              <Card variant='outlined' className={classes.submissionListItem}>
                <Typography>Name: {submission.fullname}</Typography>
                <Typography>Email: {submission.email}</Typography>
                <Typography>Phone: {submission.phone}</Typography>
                {JSON.parse(submission.answers).map(answer => (
                    <SubmissionListItemAnswer answer={answer} vacancy={data.vacancy} />
                  )
                )}
              </Card>
            )
          )}
        </>
        }
        
    </Box>
  )
};

export default SubmissionListPage;
