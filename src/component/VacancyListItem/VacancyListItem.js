import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  FileCopy,
  Delete
} from '@mui/icons-material';
import copy from 'copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  vacancyListItem: {
    margin: theme.spacing(3, 0, 2)
  }
}));



const VacancyListItem = (props) => {
  const classes = useStyles();

  const { vacancy } = props;


  const onDelete = e => {
    props.onDelete && props.onDelete(vacancy.id);
  };
  function onCopyLink(e) {
    const loc = window.location;
    const url = `${loc.protocol}//${loc.host}/vacancy/${vacancy.id}/apply`;
    copy(url);

  }
  
  return (
    <Card className={classes.vacancyListItem} variant='outlined'>

      <CardContent>
        <Typography component='h4' variant='h5'>
          <Link
            className='link-undecorated'
            to={{
              pathname: `/vacancy/${vacancy.id}`,
              vacancy: vacancy
            }}
          >
          {vacancy.position}
          </Link>
        </Typography>
        <Box>
          <Typography component='span' variant='body'>Company: </Typography>
          <Typography component='span' variant='body'>{vacancy.company}</Typography>
        </Box>
        <Box>
          <Typography component='h5' variant='h5'>
          </Typography>
          <Link to={{
            pathname: `/vacancy/${vacancy.id}/submission`,
            vacancy: vacancy
          }}>
            <div>Submissions: {vacancy.submissionCountTotal}</div>
          </Link>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          variant='outlined'
          size='small'
          onClick={onCopyLink}
          color='secondary'
        ><FileCopy/>URL</Button>
        <Link to={`/vacancy/${vacancy.id}/apply`}>
          <Button
            variant='outlined'
            size='small'
            color='secondary'
          >Apply</Button>
        </Link>
        {/* <Link to={`/vacancy/create`}>
          <Button
            variant='outlined'
            size='small'
          >Duplicate</Button>
        </Link> */}
        <Button
          variant='outlined'
          onClick={onDelete}
          size='small'
        ><Delete/>Delete</Button>
      </CardActions>

    </Card>
  )
};

VacancyListItem.propTypes = {
  vacancy: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default VacancyListItem;