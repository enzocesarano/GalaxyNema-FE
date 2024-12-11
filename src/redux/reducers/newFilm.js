import { NEW_FILM, UPDATE_FILM } from "../actions";

const initialState = {
  newFilm: [],
};

export const newFilm = (state = initialState, action) => {
  switch (action.type) {
    case NEW_FILM:
      return {
        newFilm: action.payload,
      };

    case UPDATE_FILM:
      return {
        newFilm: action.payload,
      };

    default:
      return state;
  }
};
