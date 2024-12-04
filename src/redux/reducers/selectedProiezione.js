import { SELECT_PROIEZIONE } from "../actions";

const initialState = {
  selectedProiezione: [],
};


export const selectedProiezione = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PROIEZIONE:
      return {
        ...state,
        selectedProiezione: action.payload, 
      };
    default:
      return state;
  }
};
