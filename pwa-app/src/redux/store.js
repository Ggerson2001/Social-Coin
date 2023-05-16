
import { createStore, combineReducers } from "redux";
import urlReducer from "./reducers";

// Combine Reducers
const rootReducer = combineReducers({
  url: urlReducer,
});

// Create Store
const store = createStore(rootReducer);

export default store;