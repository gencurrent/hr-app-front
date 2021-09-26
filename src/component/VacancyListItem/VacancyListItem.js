import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  Dialog,
  
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

const useStyles = makeStyles((theme) => ({
  vacancyListItem: {
    // border: '1px solid black',
    // borderRadius: '4px',
    margin: theme.spacing(3, 0, 2)
  }
}));

const VacancyListItem = (props) => {
  const classes = useStyles();

  const { vacancy } = props;


  const onDelete = e => {
    props.onDelete && props.onDelete(vacancy.id);
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
          <div>Link shared: {vacancy.linkSharesNumber}</div>
          <div>Submissions: {vacancy.linkSubmissionsNumber}</div>
        </Box>
      </CardContent>

      <CardActions>
        <Link to={`/vacancy/${vacancy.id}/submit`}>
          <Button variant='outlined' size='small'>Submit</Button>
        </Link>
        <Link to={`/vacancy/create`}>
          <Button variant='outlined' size='small' >Duplicate</Button>
        </Link>
        <Button variant='outlined' size='small'><FileCopy/>URL</Button>
        <Button variant='outlined' color='error' onClick={onDelete} size='small' ><Delete/>Delete</Button>
      </CardActions>

    </Card>
  )
};

VacancyListItem.propTypes = {
  vacancy: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default VacancyListItem;