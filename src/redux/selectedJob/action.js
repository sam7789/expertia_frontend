import { actionType } from "./actionType";
import { loadingStart, loadingEnd } from "../loading/action";

const fetchJobDetailSuccess = (jobDetail) => {
  return {
    type: actionType.FETCH_JOB_DETAIL_SUCCESS,
    payload: jobDetail, // data from the server
  };
};

const fetchJobDetailFailure = (error) => {
  // set error to true
  return {
    type: actionType.FETCH_JOB_DETAIL_FAILURE,
    payload: error,
  };
};
const fetchJobDetailReset = () => {
  // reset data
  return {
    type: actionType.FETCH_JOB_DETAIL_RESET,
  };
};
const fetchJobDetailLoading = () => {
  // set loading to true
  return {
    type: actionType.FETCH_JOB_DETAIL_LOADING,
  };
};

const getJobDetails = (jobId) => async (dispatch) => {
  // set loading to true
  dispatch(fetchJobDetailLoading());
  dispatch(loadingStart());
  try {
    const response = await fetch(
      `https://expertiaapi.herokuapp.com/api/jobs/${jobId}`
    );
    const jobDetail = await response.json();
    dispatch(fetchJobDetailSuccess(jobDetail));
    dispatch(loadingEnd());
  } catch (error) {
    dispatch(fetchJobDetailFailure(error));
    dispatch(loadingEnd());
  }
};

export {
  fetchJobDetailSuccess,
  fetchJobDetailFailure,
  fetchJobDetailReset,
  fetchJobDetailLoading,
  getJobDetails,
};
