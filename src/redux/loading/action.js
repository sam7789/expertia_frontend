import { actionType } from "./actionType";

const loadingStart = () => {
  return {
    type: actionType.LOADING_START,
  };
};

const loadingEnd = () => {
  return {
    type: actionType.LOADING_END,
  };
};

export { loadingStart, loadingEnd };
