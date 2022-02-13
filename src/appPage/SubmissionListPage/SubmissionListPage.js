import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Box,
  Button,
  Card,
  Grid,
  InputLabel,
  FormControl,
  Link as MUILink,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { datetimeToString } from 'utils/date';
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
  // const tsString = new RegExp("(?P=<year>\d{4})\-(?P=<month>\d{2})\-(?P=<day>\d{2})");\
  const tsString = datetimeToString(ts);
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

  
  const fieldList = [
    {
      field: 'fullname',
      title: 'Full Name'
    },
    {
      field: 'email',
      title: 'Email'
    },
    {
      field: 'phone',
      title: 'Phone'
    },
    {
      field: 'resume',
      title: 'Resume',
      type: 'field'
    }
  ];

  function FieldItemsGrid(props) {
    const {submission} = props;
    const fileUrlBase = process.env.REACT_APP_CLOUD_STORAGE_URL_BASE;
    return (
      <Grid container>
        {fieldList.map(field => (
          <Grid style={{margin: '8px 0'}} item xs={12}>
            <Typography variant='body1' component='p' className={`${classes.bold} ${classes.inline}`}>{field.title}: </Typography>
            {field.type === 'field' ? (
                <MUILink target="_blank" download href={`${fileUrlBase}/${submission.resume}`}>
                  <Button variant='outlined' color='primary'>Download</Button>
                </MUILink>
              ) :  (
                <Typography variant='body1' component='p' className={`${classes.inline}`}>{submission[field.field]}</Typography>
              )
            }
          </Grid> 
        ))}
      </Grid>
    )
  };
  
  return (
    <Card key={submission.uuid} variant='outlined' className={classes.submissionListItem}>
      { !singleVacancySusbmissions && 
        <Typography component='h5' variant='h5'>
          <Link
            className='link-undecorated'
            to={`/vacancy/${vacancyId}`}
          >{vacancyData.vacancy.position} | {vacancyData.vacancy.company}
          </Link>
        </Typography>
      }

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
      <FieldItemsGrid submission={submission} />
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
            <Link
              className='link-undecorated'
              to={`/vacancy/${vacancyId}`}
            >{data.vacancy.position}</Link> submissions
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
