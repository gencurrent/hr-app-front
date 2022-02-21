/**
 * Reducers
 */
import translactionObject from 'translations';


function i18nInitialize() {
  let locale = localStorage.getItem('locale');
  locale = locale ? locale : navigator.language.slice(0, 2);
  const translationFound = translactionObject[locale];
  locale = translationFound ? locale : 'en';
  return {
    type: '@@i18n/SET_LOCALE',
    locale: locale
  }
};

const initialState = {};
function additionalI18nReducer(state = initialState, action) {
  console.log('additionalI18nReducer state = ', state);
  console.log('additionalI18nReducer action = ',  action);
  if (action === undefined) {
    return state;
  }
  if (action.type === '@@i18n/SET_LOCALE'){
    const locale = action.locale;
    console.log(locale);
    localStorage.setItem('locale', locale);
    return {
      ...state,
      // locale: state.i18n.locale 
    }
  }
  return state;
};


export { additionalI18nReducer, i18nInitialize };