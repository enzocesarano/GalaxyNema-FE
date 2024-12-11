import { GET_SALE } from "../actions";

const initialState = {
    getSale: [],
};

const getSale = (state = initialState, action) => {
    switch (action.type) {
      case GET_SALE:
        return {
          ...state,
          getSale: action.payload, 
        };
    
      default:
        return state;
    }
  };

export default getSale;
