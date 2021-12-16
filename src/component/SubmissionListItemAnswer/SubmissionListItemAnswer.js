import { React } from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Link,
  Typography,
  Box,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  answerContainer: {
    margin: theme.spacing(1, 0, 1, 3)
  }
}));
function SubmissionListItemAnswer(props) {
  const classes = useStyles();
  const {answer, vacancy} = props;
  const answerFull = {...JSON.parse(vacancy.fields).find(el => el.q === answer.q), ...answer};
  const fileUrlBase = process.env.REACT_APP_CLOUD_STORAGE_URL_BASE;
  return (
    <>
      <div className='answer-block'>
        
        <Typography variant='subtitle1' style={{fontWeight: 600}}>{answer.q}</Typography>
        <Box className={classes.answerContainer}>
          {
            answer.a === null ? <Typography component='p'>Empty</Typography>
            :
            answerFull.t === 'file' && <>
            <Link target="_blank" download href={`${fileUrlBase}/${answer.a}`}><Button variant='outlined' color='primary'>Download</Button></Link>
            </>}
            {answerFull.t === 'line' && <>
              <p>{answer.a}</p>
            </>}
            {answerFull.t === 'text' && <>
              <p>{answer.a}</p>
            </>}
            {answerFull.t === 'number' && <>
              <p>{answer.a}</p>
            </>
          }
        </Box>
        {/* {answerFull.t === 'date' && <>
          <p>{answer.a}</p>
        </>} */}
      </div>
    </>
  );
};

SubmissionListItemAnswer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default SubmissionListItemAnswer;