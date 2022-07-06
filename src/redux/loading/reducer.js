import { actionType } from "./actionType";

const init = {
  isLoading: false,
};

export const loadingReducer = (state = init, { type }) => {
  switch (type) {
    case actionType.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.LOADING_END:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
