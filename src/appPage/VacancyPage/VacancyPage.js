import { React } from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Paper,
  Card
} from '@material-ui/core';

import { authApolloClient, QUERIES } from 'utils/apollo';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  questionItem: {
    margin: theme.spacing(.2, 0),
    padding: theme.spacing(.5)
  },
  questionCard: {
    padding: theme.spacing(1)
  },
  vacancyQuestion: {
    fontWeight: 700
  }
}));

/**
 * The Vacancy Page hook
 * @param {} props
 * @returns 
 */
function VacancyPage(props) {
  const params = useParams();
  const {id: vacancyId } = params;
  const classes = useStyles();
  const { loading, error, data } = useQuery(
    QUERIES.VACANCY,
    {
      variables: {
        id: vacancyId
      }
    }
  );
  return (<>
    {loading && <>
      <Typography>Loading</Typography>
    </>}
    {error && <>
      <Typography>Error</Typography>
    </>}
    {data &&
      <Box sp={{py: 4}}>
        <Paper variant='elevation'>
          <Typography
            variant='h4' component='h1'
            gutterBottom
          >Vacancy {data.vacancy.position}</Typography>
          <Typography>Created: {(new Date(data.vacancy.ts)).toISOString().substring(0, 10)}</Typography>
          <Grid container>
            {JSON.parse(data.vacancy.fields).map((field, idx) => {
              return(
                <Grid
                  item sm={12}
                  className={classes.questionItem}
                >
                  <Card variant='outlined' className={classes.questionCard}>
                    <Typography className={classes.vacancyQuestion} component='span'>{idx + 1}. </Typography>
                    <Typography className={classes.vacancyQuestion} component='span' >{field.r ? '[Required] ' : ''}</Typography>
                    <Typography className={classes.vacancyQuestion} component='span'>{field.q}</Typography>
                    <Typography>{field.t.replace(/./, c => c.toUpperCase())}</Typography>
                    
                  </Card>
                </Grid>
              )

            })}
          </Grid>
          
          
        </Paper>
      </Box>
    }
  </>);
};



export default VacancyPage;