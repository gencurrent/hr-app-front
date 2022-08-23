/**
 * A single submission answer react component
 */
import { React } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";
import { Link, Typography, Box, Card, Button } from "@mui/material";
import FieldRequiredLabel from "component/FieldRequiredLabel";

const useStyles = makeStyles((theme) => ({
  answerContainer: {
    margin: theme.spacing(0, 0, 0, 2),
    padding: theme.spacing(0.5),
  },
  answerBlock: {
    padding: theme.spacing(0.4),
  },
  redLineBox: {
    marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
  answerTextBox: {
    padding: theme.spacing(0, 1),
    borderRadius: "4px",
    background: theme.palette.secondary.secondary,
  },
}));
function SubmissionListItemAnswer(props) {
  const classes = useStyles();
  const { idx, answer, vacancy } = props;
  const answerFull = {
    ...JSON.parse(vacancy.fields).find((el) => el.q === answer.q),
    ...answer,
  };
  const fileUrlBase = "https://hr-eco-bucket.s3.eu-central-1.amazonaws.com";
  return (
    <>
      <Card elevation={0} className={`answer-block ${classes.answerBlock}`}>
        <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
          # {idx} {answerFull.r ? <FieldRequiredLabel /> : <></>} {answer.q}
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
            // <Box className={classes.redLineBox}>
            <Box className={classes.answerTextBox}>
              <Typography component="p">{answer.a}</Typography>
            </Box>
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
