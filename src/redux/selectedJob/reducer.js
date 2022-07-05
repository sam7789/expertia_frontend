import { actionType } from "./actionType";

const init = {
  jobData: {},
  isError: false,
  isLoading: false,
};

export const jobDetailsReducer = (state = init, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_JOB_DETAIL_SUCCESS:
      return {
        ...state, // keep the old state
        jobData: payload, // payload is the data from the server
        isError: false, // reset error
        isLoading: false, // reset loading
      };
    case actionType.FETCH_JOB_DETAIL_FAILURE:
      return {
        ...state,
        isError: payload, // payload is the error from the server
        isLoading: false, // reset loading
      };
    case actionType.FETCH_JOB_DETAIL_RESET:
      return {
        ...state,
        jobData: {}, // reset jobData
        isError: false, // reset error
        isLoading: false, // reset loading
      };
    case actionType.FETCH_JOB_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true, // set loading to true
      };
    default:
      return state;
  }
};
