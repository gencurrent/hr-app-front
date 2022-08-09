/**
 * A label component to return a standalone label Required
 */

import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";

const useStyles = makeStyles((theme) => ({
  label: {
    dd: console.log(theme),
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.2),
    border: `2px solid ${theme.palette.success.main}`,
    borderRadius: "4px",
    display: "inline",
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.success.main,
  },
}));

const FIELD_TYPE_VALUE_TO_NAME_MAP = {
  line: "Line",
  text: "Text",
  number: "Number",
  file: "File",
  // 'date': 'Date'
};

function FieldTypeLabel(props) {
  const { type } = props;
  const fieldTypeFull = FIELD_TYPE_VALUE_TO_NAME_MAP[type];
  const classes = useStyles();

  return <div className={classes.label}>{fieldTypeFull}</div>;
}

FieldTypeLabel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FieldTypeLabel;
