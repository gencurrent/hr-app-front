import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { makeStyles, styled } from "@mui/styles";
import {
  Box,
  Button,
  Breadcrumbs,
  Card,
  Collapse,
  Grid,
  IconButton,
  InputLabel,
  FormControl,
  Link as MUILink,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";

import { SubmissionListItemAnswer } from "component";
import { datetimeToString } from "utils/date";
import { QUERIES } from "utils/apollo";
import { GoogleCloudStorageClient } from "utils/cloudStorage";
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
    fontWeight: "600 !important",
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  border: "1px solid black",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    },
    {
      field: "email",
    },
    {
      field: "phone",
    },
    {
      field: "resume",
    },
  ];

  function FieldItemsGrid(props) {
    const { submission } = props;
    const cloudStorageClient = new GoogleCloudStorageClient();
    return (
      <Grid container>
        {fieldList.map((field) => (
          <Grid key={field.field} style={{ margin: "0px 0" }} item xs={12}>
            {field.field === "resume" ? (
              <MUILink
                target="_blank"
                download
                href={cloudStorageClient.getFileUrl(submission.resume)}
              >
                <Button variant="outlined" color="primary">
                  Resume
                </Button>
              </MUILink>
            ) : (
              <Typography
                variant="body1"
                component="p"
                className={`${field.field === "fullname" ? classes.bold : ""} ${
                  classes.inline
                }`}
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
          <FieldItemsGrid submission={submission} />
        </Grid>
        <Grid item>{tsString}</Grid>
      </Grid>

      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {JSON.parse(submission.answers).map((answer, idx) => (
          <SubmissionListItemAnswer
            idx={idx}
            key={answer.q}
            answer={answer}
            vacancy={vacancyData}
          />
        ))}
      </Collapse>
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
              {" submissions"}
            </Typography>
          )}
          {!singleVacancySusbmissions && (
            <Typography component="h3" variant="h4">
              <Translate value="submissionListPage.allSubmissions" />
            </Typography>
          )}

          <Breadcrumbs>
            <Link to="/">
              <Translate value="breadcrumbs.dashboard" />
            </Link>
            <Typography>
              <Translate value="breadcrumbs.submissions" />
            </Typography>
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
