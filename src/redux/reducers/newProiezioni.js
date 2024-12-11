import { NEW_PROIEZIONI, UPDATE_PROIEZIONI } from "../actions";

const initialState = {
  newProiezioni: [],
};

export const newProiezioni = (state = initialState, action) => {
  switch (action.type) {
    case NEW_PROIEZIONI:
      return {
        newProiezioni: action.payload,
      };

    case UPDATE_PROIEZIONI:
      return {
        newProiezioni: action.payload,
      };

    default:
      return state;
  }
};
