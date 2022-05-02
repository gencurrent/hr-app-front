import { React, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Translate, I18n } from 'react-redux-i18n';
import { useQuery } from '@apollo/client';
import {
  FormControl,
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';

import { pureApolloClient, MUTATIONS, QUERIES } from 'utils/apollo';
import AnonymousVacancySubmissionFieldItem from './AnonymousVacancySubmissionFieldItem';
import FileUploadField from './FileUploadField';


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  mainCard: {
    padding: theme.spacing(2),
    margin: theme.spacing(0)
  }
}));



const AnonymousVacancySubmissionPage = () => {
  const params = useParams();
  const vacancyId = params.id;
  const classes = useStyles();
  const history = useHistory();

  const [formError, setFormError] = useState('');
  // Fetched data
  const { loading, error, data: vacancyData } = useQuery(QUERIES.VACANCY, {variables: {id: vacancyId, forSubmission: true}});
  const vacancyFields = vacancyData && vacancyData.vacancy ? JSON.parse(vacancyData.vacancy.fields) : [];
  
  // Fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [answers, setAnswers] = useState({});

  /**
   * Submit answers from the Submission form
   * @param {Event} e An event object
   * @return {null}
   */
  const submitAnswers = (e) => {
    let answersDict = {}
    vacancyFields.forEach(
      (field) => {answersDict[field.q] = null}
    );
    answersDict = {...answersDict, ...answers};
    
    let answersArray = Object.keys(answersDict).map((key) => ({q: key, a: answersDict[key]}));

    const submissionData = {
      vacancyId: vacancyId,
      fullname: fullname,
      email: email,
      phone: phone,
      resume: resume,
      answers: JSON.stringify(answersArray)
    };
    pureApolloClient.mutate({
      mutation: MUTATIONS.CREATE_SUBMISSION,
      variables: submissionData
    })
    .then(result => {
      if (result && result.data && result.data.createSubmission){
        history.push(`/vacancy/${vacancyId}/applied`);
      }
    }).catch(error => {
      const message = error.message;
      if (message === 'The email is invalid'){
        setFormError('*The email is invalid');
      }
      else if (message === 'The phone number is invalid'){
        setFormError('*The phone number is invalid');
      }
      else {
        setFormError('*Please, check all the fields');
      }
    });
  }

  const editData = (key, value) => {
    const answersData = {...answers};
    answersData[key] = value;
    setAnswers(answersData);
  }

  const onResumeFieldUpdated = (value) => {
    setResume(value);
  }
  
  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      {vacancyData && <>
        <Box sx={{py: 4}}>
        <Paper variant='elevation' className={classes.mainCard} >
          <Typography variant='h4' align='center' gutterBottom>{vacancyData.vacancy.position}</Typography>
          {/* Should we use Stepper ? */}
          
          <Grid container>

            <Grid item xs={12}>
              <Typography variant="h5" align={'center'} gutterBottom>
                {vacancyData.vacancy.company}
              </Typography>
            </Grid>


            <Grid item spacing={6} xs={12}>
              <FormControl fullWidth={false} className={classes.formControl} variant='outlined' >
                <TextField
                  onChange={e => setFullname(e.target.value)}
                  label={I18n.t('AnonymousVacancySubmissionPage.fullName')}
                  name='name'
                  id='name'
                  required
                  helperText={I18n.t('AnonymousVacancySubmissionPage.required')}
                  margin='normal'
                  autoComplete='name'
                  fullWidth
                />
                <TextField
                  onChange={e => setEmail(e.target.value)}
                  label={I18n.t('AnonymousVacancySubmissionPage.email')}
                  name='email'
                  id='email'
                  required
                  helperText={I18n.t('AnonymousVacancySubmissionPage.required')}
                  margin='normal'
                  autoComplete='email'
                  fullWidth
                />
                <TextField
                  label={I18n.t('AnonymousVacancySubmissionPage.phone')}
                  name='phone'
                  id='phone'
                  onChange={e => setPhone(e.target.value)}
                  margin='normal'
                  autoComplete='phone'
                  fullWidth
                />
                <FileUploadField
                  fieldRequired={true}
                  callBack={onResumeFieldUpdated}
                  vacancy={vacancyData.vacancy}
                  fieldText={I18n.t('AnonymousVacancySubmissionPage.resume')}
                />
              </FormControl>
              <FormControl fullWidth={true} className={classes.formControl} variant='outlined' >
                {
                  vacancyFields.map(
                    (field, idx) => <AnonymousVacancySubmissionFieldItem
                    valueUpdateCallback={editData}
                    field={field}
                    vacancy={vacancyData.vacancy}
                  />)
                }
              </FormControl>
            </Grid>
            <Grid item spacing={6} xs={12}>
              <Typography>{formError}</Typography>
            </Grid>
            <Grid item spacing={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={submitAnswers} variant='contained' color='primary'>
                  <Translate value='AnonymousVacancySubmissionPage.submit'/>
                </Button>
              </Box>
            </Grid>

          </Grid>
        </Paper>
        </Box>
      </>
      }
    </>
  )
};


export default AnonymousVacancySubmissionPage;