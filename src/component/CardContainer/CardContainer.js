/**
 * The standard UI container using the Card component
 */
import { makeStyles } from "@mui/styles";
import {
  Card
} from '@mui/material';

const useStyles = makeStyles(theme => ({
  cardStyleDefault: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2)
  },
}));

function CardContainer(props) {
  const classes = useStyles();
  const className = {props};
  return (
    <Card
      className={className || classes.cardStyleDefault}
    >{props.children}</Card>
  )
};

export default CardContainer;