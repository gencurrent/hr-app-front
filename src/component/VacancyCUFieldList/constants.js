/**
 * Constants for VacancyCUFieldList module
 */

const FIELD_TYPE_VALUE_TO_HELPER_TEXT_MAP = {
  line: "Text up to 100 symbols",
  text: "Text up to 1000 symbols",
  number: "A number with or without point",
  file: "A single file",
  // 'date': 'Date input with calendar'
};

const FIELD_TYPE_VALUE_TO_NAME_MAP = {
  text: "Text",
  number: "Number",
  line: "Short text",
  file: "File",
};

export { FIELD_TYPE_VALUE_TO_HELPER_TEXT_MAP, FIELD_TYPE_VALUE_TO_NAME_MAP };
