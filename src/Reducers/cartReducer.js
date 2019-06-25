import { ACTIONS } from "../Actions/cartActions";

const initialState = {
  myCart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        myCart: action.payload
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

export default cartReducer;