import {React} from 'react';
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

function SubmissionListPage() {
  const classes = useStyles();
  const { vacancyId } = useParams();
  
  let { loading, error, data } = useQuery(QUERIES.VACANCY_WITH_SUBMISSION_LIST, {
    fetchPolicy: "no-cache",
    variables: {
      id: vacancyId
    }
  });
  return (
    
    <Box sx={{py: 4}}>
        {loading && 
        (<div>Loading...</div>)}

        {error &&
          (<div>Error loading submissions</div>)}
        {data &&
        <>
          <Typography component='h3' variant='h4'>
            <Link to={`/vacancy/${vacancyId}`}>{data.vacancy.position}</Link> submissions
          </Typography>
          {data.vacancy.submissionList.map(
            submission => (
              <Card key={submission.uuid} variant='outlined' className={classes.submissionListItem}>
                <Typography>Name: {submission.fullname}</Typography>
                <Typography>Email: {submission.email}</Typography>
                <Typography>Phone: {submission.phone}</Typography>
                {JSON.parse(submission.answers).map(answer => (
                    <SubmissionListItemAnswer key={answer.q} answer={answer} vacancy={data.vacancy} />
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
