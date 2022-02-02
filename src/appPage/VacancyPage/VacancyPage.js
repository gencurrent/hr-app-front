import { React } from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Paper,
  Card
} from '@material-ui/core';

import { datetimeToString } from 'utils/date';
import { authApolloClient, QUERIES } from 'utils/apollo';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  questionItem: {
    margin: theme.spacing(.1, 0),
    padding: theme.spacing(.5)
  },
  questionCard: {
    padding: theme.spacing(1)
  },
  textBold: {
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
      <Box>
        <Typography
          variant='h4' component='h1'
          gutterBottom
        >{data.vacancy.position}</Typography>
        <Typography
          variant='h5' component='span'
          gutterBottom
        >{data.vacancy.company}</Typography>
          <Typography>Created: {datetimeToString(new Date(data.vacancy.ts))}</Typography>
          <Typography>Fields</Typography>
          <Grid container>
            {JSON.parse(data.vacancy.fields).map((field, idx) => {
              return(
                <Grid
                  item sm={12}
                  className={classes.questionItem}
                >
                  <Card variant='outlined' className={classes.questionCard}>
                    <Typography className={classes.textBold} component='span'>{idx + 1}. </Typography>
                    <Typography className={classes.textBold} component='span' >{field.r ? '[Required] ' : ''}</Typography>
                    <Typography className={classes.textBold} component='span'>{field.q}</Typography>
                    <div>
                      <Typography component="span">Type:</Typography><Typography component="span" className={classes.textBold}>{field.t.replace(/./, c => c.toUpperCase())}</Typography>
                      
                    </div>
                    
                  </Card>
                </Grid>
              )

            })}
          </Grid>
          
          
      </Box>
    }
  </>);
};



export default VacancyPage;