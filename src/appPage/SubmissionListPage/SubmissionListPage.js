import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Breadcrumbs,
  Card,
  Grid,
  InputLabel,
  FormControl,
  Link as MUILink,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import { datetimeToString } from "utils/date";
import { SubmissionListItemAnswer } from "component";
import { QUERIES } from "utils/apollo";
import { DECISION_VALUE_LABEL_MAP } from "./constants";

const useStyles = makeStyles((theme) => ({
  submissionListItem: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
  },
  inline: {
    display: "inline",
  },
  bold: {
    fontWeight: 600,
  },
  new: {
    background: theme.palette.primary.main,
  },
  accepted: {
    background: theme.palette.success.main,
  },
  rejected: {
    background: theme.palette.error.main,
  },
}));

function SubmissionItem(props) {
  const { submission, singleVacancySusbmissions, vacancyId } = props;
  let { vacancyData } = props;
  const classes = useStyles();
  let ts = new Date(submission.ts);
  // const tsString = new RegExp("(?P=<year>\d{4})\-(?P=<month>\d{2})\-(?P=<day>\d{2})");\
  const tsString = datetimeToString(ts);
  let [decision, setDecision] = useState(submission.decision);
  let [decisionClass, setDecisionClass] = useState(
    classes[decision.toLowerCase()]
  );

  /**
   *
   * @param {Event} e
   */
  function onDecisionChange(e) {
    const { value } = e.target;
    setDecision(value);
    setDecisionClass(classes[value.toLowerCase()]);
  }

  const fieldList = [
    {
      field: "fullname",
      title: "Full Name",
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "phone",
      title: "Phone",
    },
    {
      field: "resume",
      title: "Resume",
      type: "field",
    },
  ];

  function FieldItemsGrid(props) {
    const { submission } = props;
    const fileUrlBase = "https://hr-eco-bucket.s3.eu-central-1.amazonaws.com";
    return (
      <Grid container>
        {fieldList.map((field) => (
          <Grid key={field.field} style={{ margin: "8px 0" }} item xs={12}>
            <Typography
              variant="body1"
              component="p"
              className={`${classes.inline}`}
            >
              {field.title}:{" "}
            </Typography>
            {field.type === "field" ? (
              <MUILink
                target="_blank"
                download
                href={`${fileUrlBase}/${submission.resume}`}
              >
                <Button variant="outlined" color="primary">
                  Download
                </Button>
              </MUILink>
            ) : (
              <Typography
                variant="body1"
                component="p"
                className={`${classes.bold} ${classes.inline}`}
              >
                {submission[field.field]}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  vacancyData = submission.vacancy || vacancyData;

  return (
    <Card
      key={submission.uuid}
      variant="outlined"
      className={classes.submissionListItem}
    >
      {!singleVacancySusbmissions && (
        <Typography component="h5" variant="h5">
          <Link className="link-undecorated" to={`/vacancy/${vacancyId}`}>
            {vacancyData.position} | {vacancyData.company}
          </Link>
        </Typography>
      )}

      <Grid container justifyContent="space-between">
        <Grid item>
          <FormControl style={{ m: 1, minWidth: 200 }}>
            <InputLabel id={`decision-${submission.uuid}`}>Decision</InputLabel>
            <Select
              labelId={`decision-${submission.uuid}`}
              value={decision}
              variant="filled"
              label="Decision"
              className={decisionClass}
              onChange={onDecisionChange}
            >
              {Object.keys(DECISION_VALUE_LABEL_MAP).map((key) => (
                <MenuItem value={key} key={key}>
                  {DECISION_VALUE_LABEL_MAP[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>{tsString}</Grid>
      </Grid>
      <FieldItemsGrid submission={submission} />
      {JSON.parse(submission.answers).map((answer) => (
        <SubmissionListItemAnswer
          key={answer.q}
          answer={answer}
          vacancy={vacancyData}
        />
      ))}
    </Card>
  );
}

function SubmissionListPage(props) {
  const { singleVacancySusbmissions } = props;
  let { vacancyId } = useParams();

  let query = undefined;
  let variables = {};
  if (singleVacancySusbmissions) {
    query = QUERIES.VACANCY_WITH_SUBMISSION_LIST;
    variables = {
      id: vacancyId,
    };
  } else {
    query = query = QUERIES.SUBMISSION_LIST;
  }

  let { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: variables,
  });
  const submissionList =
    data &&
    ((data.vacancy && data.vacancy.submissionList) || data.submissionList);
  return (
    <Box>
      {loading && <div>Loading...</div>}

      {error && <div>Error loading submissions</div>}
      {data && (
        <>
          {singleVacancySusbmissions && (
            <Typography component="h3" variant="h4">
              <Link className="link-undecorated" to={`/vacancy/${vacancyId}`}>
                {data.vacancy.position}
              </Link>
              submissions
            </Typography>
          )}
          {!singleVacancySusbmissions && (
            <Typography component="h3" variant="h4">
              All submissions
            </Typography>
          )}

          <Breadcrumbs>
            <Link to="/">Dashboard</Link>
            <Typography>Submissions</Typography>
          </Breadcrumbs>

          {submissionList.map((submission) => {
            vacancyId = singleVacancySusbmissions
              ? vacancyId
              : submission.vacancy.id;
            let vacancyData = singleVacancySusbmissions
              ? data.vacancy
              : submission.vacancy;
            return (
              <SubmissionItem
                key={submission.uuid}
                submission={submission}
                vacancyId={vacancyId}
                vacancyData={vacancyData}
                singleVacancySusbmissions={singleVacancySusbmissions}
              />
            );
          })}
        </>
      )}
    </Box>
  );
}

SubmissionListPage.propTypes = {
  singleVacancySusbmissions: PropTypes.bool,
};

export default SubmissionListPage;
