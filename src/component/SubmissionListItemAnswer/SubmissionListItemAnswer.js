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
      {answerFull.t === 'file' && <>
        <Typography>{answer.q}</Typography>:<Link target="_blank" download href={`${fileUrlBase}/${answer.a}`}>Download</Link>
      </>}
      {answerFull.t === 'line' && <>
        <Typography>{answer.q}</Typography>:<Typography>{answer.a}</Typography>
      </>}
      {answerFull.t === 'text' && <>
        <Typography>{answer.q}</Typography>:<Typography>{answer.a}</Typography>
      </>}
      {answerFull.t === 'number' && <>
        <Typography>{answer.q}</Typography>:<Typography>{answer.a}</Typography>
      </>}
      {answerFull.t === 'date' && <>
        <Typography>{answer.q}</Typography>:<Typography>{answer.a}</Typography>
      </>}
    </>
  );
};

SubmissionListItemAnswer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default SubmissionListItemAnswer;