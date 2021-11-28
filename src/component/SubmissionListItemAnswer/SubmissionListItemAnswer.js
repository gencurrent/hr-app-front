import { React } from 'react';
import PropTypes from 'prop-types';

import {
  Link,
  Typography
} from '@material-ui/core';

function SubmissionListItemAnswer(props) {
  const {answer, vacancy} = props;
  const answerFull = {...JSON.parse(vacancy.fields).find(el => el.q === answer.q), ...answer};
  const fileUrlBase = process.env.REACT_APP_CLOUD_STORAGE_URL_BASE;
  return (
    <>
      <div className='answer-block'>
        
        <Typography>{answer.q}</Typography>
        {
        answer.a === null ? <Typography component='p' variant='p'>Empty</Typography>
        :
        answerFull.t === 'file' && <>
         <Link target="_blank" download href={`${fileUrlBase}/${answer.a}`}>Download</Link>
        </>}
        {answerFull.t === 'line' && <>
          <p>{answer.a}</p>
        </>}
        {answerFull.t === 'text' && <>
          <p>{answer.a}</p>
        </>}
        {answerFull.t === 'number' && <>
          <p>{answer.a}</p>
        </>}
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