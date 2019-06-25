import {
  combineReducers
} from 'redux';
import {
  reducer as form
} from 'redux-form';
import productFormReducer from './productFormReducer';
import modalReducer from './modalReducer';
import productReducer from './productReducer';
import snackBarReducer from './snackBarReducer';
import projectReducer from './projectReducer';
import teamReducer from './teamReducer';
import projectFormReducer from './projectFormReducer';
import teamFormReducer from './teamFormReducer';
import userReducer from './userReducer';
import userFormReducer from './userFormReducer';
import backlogReducer from './backlogReducer';
import backlogFormReducer from './backlogFormReducer';
import sprintReducer from './sprintReducer';
import sprintFormReducer from './sprintFormReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  modalReducer,
  form,
  productFormReducer,
  productReducer,
  snackBarReducer,
  projectReducer,
  projectFormReducer,
  teamReducer,
  teamFormReducer,
  userReducer,
  userFormReducer,
  backlogReducer,
  backlogFormReducer,
  sprintReducer,
  sprintFormReducer,
  categoryReducer,
  cartReducer,
});

export default rootReducer;