import { React } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";
import { Link, Typography, Box, Card, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  answerContainer: {
    margin: theme.spacing(1, 0, 1, 3),
    padding: theme.spacing(0.5),
  },
  answerBlock: {
    padding: theme.spacing(0.4),
  },
}));
function SubmissionListItemAnswer(props) {
  const classes = useStyles();
  const { answer, vacancy } = props;
  const answerFull = {
    ...JSON.parse(vacancy.fields).find((el) => el.q === answer.q),
    ...answer,
  };
  const fileUrlBase = "https://hr-eco-bucket.s3.eu-central-1.amazonaws.com";
  const fieldRequiredBackground = { background: "#ff572236" };
  return (
    <>
      <Card
        elevation={0}
        style={{ ...(answerFull.r ? fieldRequiredBackground : {}) }}
        className={`answer-block ${classes.answerBlock}`}
      >
        <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
          {answer.q}
        </Typography>
        <Box className={classes.answerContainer}>
          {answer.a === null || answer.a === "" ? (
            <Typography component="p">--- No answer ---</Typography>
          ) : (
            answerFull.t === "file" && (
              <>
                <Link
                  target="_blank"
                  download
                  href={`${fileUrlBase}/${answer.a}`}
                >
                  <Button variant="outlined" color="primary">
                    Download
                  </Button>
                </Link>
              </>
            )
          )}
          {(answerFull.t === "line" ||
            answerFull.t === "text" ||
            answerFull.t === "number") && (
            <>
              <Typography component="p">{answer.a}</Typography>
            </>
          )}
        </Box>
        {/* {answerFull.t === 'date' && <>
          <p>{answer.a}</p>
        </>} */}
      </Card>
    </>
  );
}

SubmissionListItemAnswer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default SubmissionListItemAnswer;
