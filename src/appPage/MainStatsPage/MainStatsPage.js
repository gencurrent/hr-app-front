/**
 * Page with main statistics and navigation through HR-Eco.
 * For authorized users only.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Grid,
  Card,
  Typography,
  CardContent
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardStyle: {
    // margin: theme.spacing(3, 0, 2)
  }  
}));

const MainStatsPage = () =>  {
  const classes = useStyles();
  return (
    <>
     <Typography component='h4' variant='h4'>Main statistics</Typography>
     <Grid container direction='column' spacing={2}>
       <Grid item>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Typography component='h6' variant='h6'>Recent Submissions</Typography>
              <Link to='/submissions'>
                <Button>All Submissions</Button>
              </Link>
            </CardContent>
          </Card>
       </Grid>
       <Grid item>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Typography component='h6' variant='h6'>Your vacancies</Typography>
              <Link to='/vacancy'>
                <Button>Vacancy List</Button>
              </Link>
            </CardContent>
          </Card>
       </Grid>
     </Grid>
    </>
  )
};

export default MainStatsPage;
