/**
 * Page with main statistics and navigation through Staffence.
 * For authorized users only.
 */
import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Breadcrumbs,
  Grid,
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import { Translate } from "react-redux-i18n";

import { DashboardSubmissionStatisticsChart } from "component";
import { QUERIES } from "utils/apollo";

const useStyles = makeStyles((theme) => ({
  pageGridStyle: {
    marginTop: theme.spacing(2),
  },
  cardStyle: {
    // margin: theme.spacing(3, 0, 2)
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(QUERIES.USER_MAIN_STATS, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <div> Loading...</div>;
  }
  if (error) {
    return <div> Error...</div>;
  }
  const { userMainStatistics } = data;
  const { submissionCountTotal, submissionCountNew, vacancyStatsList } =
    userMainStatistics;
  vacancyStatsList.sort(
    (a, b) => b.submissionCountTotal - a.submissionCountTotal
  );
  return (
    <>
      <Typography component="h4" variant="h4">
        <Translate value="mainStatistics.title" />
      </Typography>
      <Breadcrumbs>
        <Typography>
          <Translate value="breadcrumbs.dashboard" />
        </Typography>
      </Breadcrumbs>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.pageGridStyle}
      >
        <Grid item>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Typography component="h5" variant="h5">
                <Translate value="mainStatistics.submissions" />
              </Typography>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <DashboardSubmissionStatisticsChart />
                </Grid>
                <Grid item>
                  <Link to="/submission?status=new">
                    <Button variant="contained" color="secondary">
                      <Translate value="mainStatistics.newSubmissions" />: +
                      {submissionCountNew}
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/submission">
                    <Button>
                      <Translate value="mainStatistics.totalSubmissions" />:{" "}
                      {submissionCountTotal}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Typography component="h5" variant="h5">
                <Translate value="mainStatistics.topVacancies" />
              </Typography>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Link to="/vacancy">
                    <Button variant="contained" color="secondary" >
                      <Translate value="mainStatistics.allVacancies" />
                    </Button>
                  </Link>
                </Grid>
                {vacancyStatsList.map((vacancyStatsItem) => (
                  <Grid item>
                    <Link
                      className="link-undecorated"
                      to={`/vacancy/${vacancyStatsItem.id}`}
                    >
                      <Typography variant="h6" component="h5">
                        {vacancyStatsItem.position}
                      </Typography>
                    </Link>
                    <Link
                      className="link-undecorated"
                      to={`/vacancy/${vacancyStatsItem.id}/submission`}
                    >
                      <Typography variant="body2">
                        Submissions: {vacancyStatsItem.submissionCountTotal} (+
                        {vacancyStatsItem.submissionCountNew})
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
