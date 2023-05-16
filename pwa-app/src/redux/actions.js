// actions.js

// Action Types
export const SET_URL = "SET_URL";

// Action Creators
export const setUrl = (url) => {
  return {
    type: SET_URL,
    payload: url,
  };
};