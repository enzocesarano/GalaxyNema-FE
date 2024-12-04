import { SELECT_TICKET } from "../actions";


const initialState = {
    selectedTickets: [],
  };
  
  export const selectedTickets = (state = initialState, action) => {
    switch (action.type) {
      case SELECT_TICKET:
        return {
          ...state,
          selectedTickets: action.payload,
        };
      default:
        return state;
    }
  };