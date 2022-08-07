/**
 * A label component to return a standalone label Required
 */

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    dd: console.log(theme),
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.2),
    border: `2px solid ${theme.palette.error.main}`,
    borderRadius: "4px",
    display: "inline",
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.error.main,
  },
}));

export default function FieldRequiredLabel() {
  const classes = useStyles();

  return <div className={classes.label}>Required</div>;
}
