import {React} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Box,
  Card,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { SubmissionListItemAnswer } from 'component';
import { QUERIES } from 'utils/apollo';

const useStyles = makeStyles((theme) => ({
  submissionListItem: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2)
  },
  inline: {
    display: 'inline'
  },
  bold: {
    fontWeight: 600
  }
}));

function SubmissionListPage(props) {
  const { singleVacancySusbmissions } = props;
  const classes = useStyles();
  const { vacancyId } = useParams();
  
  let { loading, error, data } = useQuery(QUERIES.VACANCY_WITH_SUBMISSION_LIST, {
    fetchPolicy: "no-cache",
    variables: {
      id: vacancyId
    }
  });
  return (
    
    <Box>
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
            submission => {
              return (
              <Card key={submission.uuid} variant='outlined' className={classes.submissionListItem}>
                { !singleVacancySusbmissions && 
                  <Typography component='h5' variant='h5'>
                    <Link to={`/vacancy/${vacancyId}`}>{data.vacancy.position} | {data.vacancy.company}</Link>
                  </Typography>
                }
                {/* <Typography variant='body1' component='p' style={{fontWeight: 600}}>Name:</Typography><Typography variant='body1' component='p'>{submission.fullname}</Typography> */}
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='body1' component='p' className={`${classes.bold} ${classes.inline}`}>Name: </Typography>
                    <Typography variant='body1' component='p' className={`${classes.inline}`}>{submission.fullname}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1' component='p' className={`${classes.bold} ${classes.inline}`}>Email: </Typography>
                    <Typography variant='body1' component='p' className={`${classes.inline}`}>{submission.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1' component='p' className={`${classes.bold} ${classes.inline}`}>Phone: </Typography>
                    <Typography variant='body1' component='p' className={`${classes.inline}`}>{submission.phone}</Typography>
                  </Grid>
                </Grid>
                {JSON.parse(submission.answers).map(answer => (
                    <SubmissionListItemAnswer key={answer.q} answer={answer} vacancy={data.vacancy} />
                  )
                )}
              </Card>
            )}
          )}
        </>
        }
        
    </Box>
  )
};

SubmissionListPage.propTypes = {
  singleVacancySusbmissions: PropTypes.bool
}

export default SubmissionListPage;
