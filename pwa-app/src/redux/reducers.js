// reducers.js

import { SET_URL } from "./actions";

// Initial State
const initialState = {
  url: "",
};

// URL Reducer
const urlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

export default urlReducer;