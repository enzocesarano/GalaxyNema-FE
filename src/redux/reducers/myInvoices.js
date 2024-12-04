import { INVOICES } from "../actions";

const initialState = {
  invoices: [],
};

export const invoices = (state = initialState, action) => {
  switch (action.type) {
    case INVOICES:
      return {
        invoices: action.payload,
      };
    case "RESET_STATE":
      return {
        invoices: [],
      };
    default:
      return state;
  }
};
