import { ACTIONS } from "../Actions/productActions";

const initialState = {
  products: [],
  inputField: '',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        products: action.payload
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        ...initialState
      };
    case ACTIONS.SET_INPUT_FIELD:
      return { ...state, inputField: action.payload };
    default:
      return state;
  }
};

export default productReducer;
