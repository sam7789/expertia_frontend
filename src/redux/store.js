import {
  legacy_createStore as creatStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./userData/reducer";
import { jobsReducer } from "./jobData/reducer";
import { jobDetailsReducer } from "./selectedJob/reducer";
import { loadingReducer } from "./loading/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobsReducer,
  jobDetails: jobDetailsReducer,
  loading: loadingReducer,
});

export const store = creatStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
