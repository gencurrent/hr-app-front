import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';
import {
  FileCopy,
  Delete
} from '@material-ui/icons';
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
        <Typography sx={{ fontSize: 14 }}>
          {vacancy.position}
        </Typography>
        <Box>
          <Typography component='h6' variant='h6'>
            {vacancy.company}
          </Typography>
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
        <Link to={`/vacancy/${vacancy.id}/apply`}>
          <Button variant='outlined' size='small'>Apply</Button>
        </Link>
        <Link to={`/vacancy/create`}>
          <Button variant='outlined' size='small' >Duplicate</Button>
        </Link>
        <Button variant='outlined' size='small' onClick={onCopyLink}><FileCopy/>URL</Button>
        <Button variant='outlined' onClick={onDelete} size='small' ><Delete/>Delete</Button>
      </CardActions>

    </Card>
  )
};

VacancyListItem.propTypes = {
  vacancy: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default VacancyListItem;