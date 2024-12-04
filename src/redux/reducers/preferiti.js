import {
  AGGIUNGI_PREFERITO,
  RIMUOVI_PREFERITO,
  SET_PREFERITI,
} from "../actions";

const initialState = {
  preferiti: [],
};

const preferiti = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREFERITI:
      return {
        ...state,
        preferiti: action.payload,
      };

    case AGGIUNGI_PREFERITO:
      return {
        ...state,
        preferiti: [...state.preferiti, action.payload],
      };

    case RIMUOVI_PREFERITO:
      return {
        ...state,
        preferiti: state.preferiti.filter((id) => id !== action.payload),
      };

    default:
      return state;
  }
};

export default preferiti;
