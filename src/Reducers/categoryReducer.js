import {
  ACTIONS
} from '../Actions/categoryActions';

const initialState = {
  categorys: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
      case ACTIONS.GET_ALL:
          return {
              ...state,
              categorys: action.payload,
          };
      case ACTIONS.CLEAR:
          return {
              ...state,
              ...initialState
          };
      default:
          return state;
  }
};

export default categoryReducer;