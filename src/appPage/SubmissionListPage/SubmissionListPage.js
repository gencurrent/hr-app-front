import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Box,
  Card,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { SubmissionListItemAnswer } from 'component';
import { QUERIES } from 'utils/apollo';
import { 
  DECISION_VALUE_LABEL_MAP,
  DECISION_VALUE_TO_SELECT_PROPERTIES
} from './constants';

const useStyles = makeStyles((theme) => ({
  submissionListItem: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2)
  },
  inline: {
    display: 'inline'
  },
  bold: {
    fontWeight: 600,
  },
  new: {
    background: theme.palette.primary.main
  },
  accepted: {
    background: theme.palette.success.main
  },
  rejected: {
    background: theme.palette.error.main
  },
}));


function SubmissionItem(props) {
  const { submission, singleVacancySusbmissions, vacancyData, vacancyId } = props;
  const classes = useStyles();
  let ts = new Date(submission.ts);
  // const tsString = new RegExp("(?P=<year>\d{4})\-(?P=<month>\d{2})\-(?P=<day>\d{2})");
  const reg = /^(?<date>\d{4}-\d{2}-\d{2})T(?<hour>\d{2}):(?<minute>\d{2}).*$/gm ;
  const matches = ts.toISOString().matchAll(reg).next().value.groups;
  const tsString = `${matches["date"]} ${matches["hour"]}:${matches["minute"]}`;
  console.log(tsString);
  let [decision, setDecision ] = useState(submission.decision);
  let [decisionClass, setDecisionClass ] = useState(classes[decision.toLowerCase()]);
  
  /**
   * 
   * @param {Event} e 
   */
  function onDecisionChange(e) {
    const {value} = e.target;
    setDecision(value);
    setDecisionClass(classes[value.toLowerCase()]);
  }
  
  return (
    <Card key={submission.uuid} variant='outlined' className={classes.submissionListItem}>
      { !singleVacancySusbmissions && 
        <Typography component='h5' variant='h5'>
          <Link to={`/vacancy/${vacancyId}`}>{vacancyData.vacancy.position} | {vacancyData.vacancy.company}</Link>
        </Typography>
      }
      {/* <Typography variant='body1' component='p' style={{fontWeight: 600}}>Name:</Typography><Typography variant='body1' component='p'>{submission.fullname}</Typography> */}

      <Grid container justifyContent='space-between'>
        <Grid item>
          <FormControl style={{m: 1, minWidth: 200}}>
            <InputLabel id={`decision-${submission.uuid}`}>Decision</InputLabel>
            <Select
              labelId={`decision-${submission.uuid}`}
              value={decision}
              variant='filled'
              label='Decision'
              className={decisionClass}
              onChange={onDecisionChange}
            >
              { Object.keys(DECISION_VALUE_LABEL_MAP).map(key => 
                <MenuItem value={key}>{DECISION_VALUE_LABEL_MAP[key]}</MenuItem>

              )}
            </Select>   
          </FormControl>
        </Grid>
        <Grid item >
          {tsString}
        </Grid>
      </Grid>
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
          <SubmissionListItemAnswer key={answer.q} answer={answer} vacancy={vacancyData.vacancy} />
        )
      )}
    </Card>
  )
}

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
            submission => (
              <SubmissionItem
                submission={submission}
                vacancyId={vacancyId}
                vacancyData={data}
                singleVacancySusbmissions={singleVacancySusbmissions}
              />
            )
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
