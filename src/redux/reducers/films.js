import { FILMS, PROIEZIONI, SENZA_PROIEZIONI } from "../actions";

const initialState = {
  films: [],
  proiezioni: [],
  senzaproiezioni: []
}

const films = (state = initialState, action) => {
  switch (action.type) {
    case FILMS:
        return {
          ...state,
          films: action.payload,
        };
        case PROIEZIONI:
        return {
          ...state,
          proiezioni: action.payload,
        };
        case SENZA_PROIEZIONI:
        return {
          ...state,
          senzaproiezioni: action.payload,
        };
    default:
      return state;
  }
};

export default films