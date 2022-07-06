import { actionType } from "./actionType";
import { loadingStart, loadingEnd } from "../loading/action";

const fetchJobsDataSucess = (jobsData) => {
  return {
    type: actionType.FETCH_JOB_DATA_SUCCESS,
    payload: jobsData, // data from the server
  };
};

const fetchJobsDataFailure = (error) => {
  // set error to true
  return {
    type: actionType.FETCH_JOB_DATA_FAILURE,
    payload: error,
  };
};

const fetchJobsDataReset = () => {
  // reset data
  return {
    type: actionType.FETCH_JOB_DATA_RESET,
  };
};

const fetchJobsDataLoading = () => {
  // set loading to true
  return {
    type: actionType.FETCH_JOB_DATA_LOADING,
  };
};

const sortJobsData = (sortBy) => {
  // sort data
  return {
    type: actionType.SORT_JOB_DATA,
    payload: sortBy,
  };
};

const postNewJobSuccess = (jobsData) => {
  return {
    type: actionType.POST_NEW_JOB_SUCCESS,
    payload: jobsData, // data from the server
  };
};

const postNewJobFailure = (error) => {
  // set error to true
  return {
    type: actionType.POST_NEW_JOB_FAILURE,
    payload: error,
  };
};

const postNewJobLoading = () => {
  // set loading to true
  return {
    type: actionType.POST_NEW_JOB_LOADING,
  };
};

const postNewJob = (jobData) => async (dispatch) => {
  // set loading to true
  dispatch(postNewJobLoading());
  dispatch(loadingStart());
  try {
    const response = await fetch(
      "https://jJob-backend.herokuapp.com/api/Jobs/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      }
    );
    const data = await response.json();
    if (data.message) {
      dispatch(postNewJobFailure(data.message));
      dispatch(loadingEnd());
    } else {
      dispatch(postNewJobSuccess(data));
      dispatch(loadingEnd());
    }
  } catch (error) {
    dispatch(postNewJobFailure(error));
    dispatch(loadingEnd());
  }
};

const fetchJobs = (query, page) => async (dispatch) => {
  dispatch(fetchJobsDataLoading()); // set loading to true
  dispatch(loadingStart());
  try {
    const res = await fetch(
      `https://expertiaapi.herokuapp.com/api/jobs/?q=${query}&page=${page}`
    ); // fetching data from the server
    const data = await res.json();
    if (data.message) {
      dispatch(fetchJobsDataFailure(data.message));
      dispatch(loadingEnd());
    } else {
      dispatch(fetchJobsDataSucess(data));
      dispatch(loadingEnd());
    }
  } catch (error) {
    dispatch(fetchJobsDataFailure(error)); // set error to true
    dispatch(loadingEnd());
  }
};

export {
  fetchJobsDataSucess,
  fetchJobsDataFailure,
  fetchJobsDataReset,
  fetchJobsDataLoading,
  sortJobsData,
  postNewJobSuccess,
  postNewJobFailure,
  postNewJobLoading,
  postNewJob,
  fetchJobs,
};
