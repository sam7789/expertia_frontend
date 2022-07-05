import { actionType } from "./actionType";

const init = {
  jobsData: [],
  isError: false,
  isLoading: false,
};

export const jobsReducer = (state = init, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_JOB_DATA_SUCCESS:
      return {
        ...state, // keep the old state
        jobsData: payload, // payload is the data from the server
        isError: false, // reset error
        isLoading: false, // reset loading
      };
    case actionType.FETCH_JOB_DATA_FAILURE:
      return {
        ...state,
        isError: payload, // payload is the error from the server
        isLoading: false, // reset loading
      };
    case actionType.FETCH_JOB_DATA_RESET:
      return {
        ...state,
        jobsData: [], // reset jobsData
        isError: false, // reset error
        isLoading: false, // reset loading
      };
    case actionType.FETCH_JOB_DATA_LOADING:
      return {
        ...state,
        isLoading: true, // set loading to true
      };

    case actionType.SORT_JOB_DATA:
      return {
        ...state,
        jobsData: [...state.jobsData].sort((a, b) => {
          let response;
          if (payload === "rating") {
            response = b.rating - a.rating; // sort by rating
          }
          return response;
        }),
      };

    case actionType.POST_NEW_JOB_SUCCESS:
      return {
        ...state,
        jobsData: [...state.jobsData, payload], // add new song to jobsData
        isError: false, // reset error
        isLoading: false, // reset loading
      };
    case actionType.POST_NEW_JOB_FAILURE:
      return {
        ...state,
        isError: payload, // payload is the error from the server
        isLoading: false, // reset loading
      };
    case actionType.POST_NEW_JOB_RESET:
      return {
        ...state,
        isError: false, // reset error
        isLoading: false, // reset loading
      };
    case actionType.POST_NEW_JOB_LOADING:
      return {
        ...state,
        isLoading: true, // set loading to true
      };
    default:
      return state; // return the old state
  }
};
