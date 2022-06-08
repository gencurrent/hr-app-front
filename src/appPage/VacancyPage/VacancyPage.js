/**
 * The created Vacancy page
 * Functions:
 * + shows all the main info about the Vacancy
 * + contains all the Vacancy actions
 */
import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import copy from "copy-to-clipboard";

import { DeleteConfirmationDialog } from "component";
import { datetimeToString } from "utils/date";
import { authApolloClient, QUERIES, MUTATIONS } from "utils/apollo";

const useStyles = makeStyles((theme) => ({
  questionItem: {
    margin: theme.spacing(0.1, 0),
    padding: theme.spacing(0.5),
  },
  questionCard: {
    padding: theme.spacing(1),
  },
  textBold: {
    fontWeight: 700,
  },
}));

/**
 * The Vacancy Page hook
 * @param {} props
 * @returns
 */
function VacancyPage(props) {
  const params = useParams();
  const { id: vacancyId } = params;
  const history = useHistory();
  const classes = useStyles();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { loading, error, data } = useQuery(QUERIES.VACANCY, {
    variables: {
      id: vacancyId,
    },
  });

  function onCopyLink(e) {
    const loc = window.location;
    const url = `${loc.protocol}//${loc.host}/vacancy/${data.vacancy.id}/info`;
    copy(url);
  }

  function onVacandyDeleteDialogConfirmed() {
    authApolloClient
      .mutate({
        mutation: MUTATIONS.DELETE_VACANCY,
        variables: { vacancyId: data.vacancy.id },
      })
      .then((response) => {
        setConfirmDialogOpen(false);
        history.push("/vacancy-list");
      });
  }

  return (
    <>
      {loading && (
        <>
          <Typography>Loading</Typography>
        </>
      )}
      {error && (
        <>
          <Typography>Error</Typography>
        </>
      )}
      {data && (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {data.vacancy.position}
          </Typography>

          <Breadcrumbs>
            <Link to="/">Dashboard</Link>
            <Link to="/vacancy">Vacancies</Link>
            <Typography>{data.vacancy.position}</Typography>
          </Breadcrumbs>
          <Card variant="outlined">
            <CardActions>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onCopyLink}
                    color="info"
                  >
                    <LinkIcon />
                    URL
                  </Button>
                </Grid>
                <Grid item>
                  <Link to={`/vacancy/${data.vacancy.id}/info`}>
                    <Button variant="outlined" size="small" color="success">
                      <CheckCircleOutlineIcon />
                      Apply
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setConfirmDialogOpen(true)}
                    size="small"
                  >
                    <Delete />
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography component="span">Vacancy: </Typography>
                  <Typography className={classes.textBold} component="span">
                    {data.vacancy.position}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="span">Company: </Typography>
                  <Typography className={classes.textBold} component="span">
                    {data.vacancy.company}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="span">Created: </Typography>
                  <Typography className={classes.textBold} component="span">
                    {datetimeToString(new Date(data.vacancy.ts))}
                  </Typography>
                </Grid>
              </Grid>

              <Typography>Fields:</Typography>
              <Grid container>
                {JSON.parse(data.vacancy.fields).map((field, idx) => {
                  return (
                    <Grid item xs={12} className={classes.questionItem}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography
                            className={classes.textBold}
                            component="span"
                          >
                            {idx + 1}.{" "}
                          </Typography>
                          <Typography
                            className={classes.textBold}
                            component="span"
                          >
                            {field.r ? "[Required] " : ""}
                          </Typography>
                          <Typography
                            className={classes.textBold}
                            component="span"
                          >
                            {field.q}
                          </Typography>
                          <div>
                            <Typography component="span">Type:</Typography>
                            <Typography
                              component="span"
                              className={classes.textBold}
                            >
                              {field.t.replace(/./, (c) => c.toUpperCase())}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>

          <DeleteConfirmationDialog
            title={`Delete vacancy "${data.vacancy.position}"`}
            open={confirmDialogOpen}
            vacancyId={data.vacancy.id}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={onVacandyDeleteDialogConfirmed}
          >
            Do you want to delete the vacancy "{data.vacancy.position}" in "
            {data.vacancy.company}"?
          </DeleteConfirmationDialog>
        </>
      )}
    </>
  );
}

export default VacancyPage;
