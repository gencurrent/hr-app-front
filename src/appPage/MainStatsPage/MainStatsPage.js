/**
 * Page with main statistics and navigation through HR-Eco.
 * For authorized users only.
 */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Grid,
  Card,
  Typography,
  CardContent
} from '@material-ui/core';
import { authApolloClient } from 'utils/apollo';
import { QUERIES } from 'utils/apollo';

const useStyles = makeStyles(theme => ({
  cardStyle: {
    // margin: theme.spacing(3, 0, 2)
  }  
}));

const MainStatsPage = () =>  {
  const classes = useStyles();
  const { data, loading, error } = useQuery(QUERIES.USER_MAIN_STATS, {fetchPolicy: 'no-cache'});
  
  if (loading){
    return (<div> Loading...</div>)
  }
  if (error){
    return (<div> Error...</div>)
  }
  console.log(data);
  const { userMainStats } = data;
  const {
    submissionCountTotal,
    submissionCountNew,
    vacancyStatsList
  } = userMainStats;
  return (
    <>
     <Typography component='h4' variant='h4'>Main statistics</Typography>
     <Grid container direction='column' spacing={2}>
       <Grid item>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Typography component='h6' variant='h6'>All submissions</Typography>
              <Grid container direction='column' spacing={1}>
                <Grid item>
                  <Link to='/submissions'>
                    <Button variant='contained' color='primary'>New submissions: +{submissionCountNew}</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/submissions'>
                    <Button >Total submissions: {submissionCountTotal}</Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
       </Grid>
       <Grid item>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Typography component='h6' variant='h6'>Top vacancies submissions</Typography>
              <Grid container direction='column' spacing={1}>
                <Grid item>
                  <Link to='/vacancy'>
                    <Button variant='contained' color='primary'>All vacancies</Button>
                  </Link>
                </Grid>
                {vacancyStatsList.map(vacancyStatsItem => (
                  
                <Grid item>
                  <Link className='link-undecorated' to={`/vacancy/${vacancyStatsItem.id}/submission`}>
                    <Typography variant='h5' component='h4'>{vacancyStatsItem.position}</Typography>
                    <Typography>New: +{vacancyStatsItem.submissionCountNew}</Typography>
                    <Typography variant='body1'>Total: {vacancyStatsItem.submissionCountTotal}</Typography>
                  </Link>
                </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
       </Grid>
     </Grid>
    </>
  )
};

export default MainStatsPage;
