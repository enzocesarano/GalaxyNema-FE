import { LOGIN } from "../actions";


const initialState = {
    loginMe: {},
};

const loginMe = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          loginMe: action.payload, 
        };
        case "LOGOUT":
      return {
        ...state,
        loginMe: {},
      };
      default:
        return state;
    }
  };

export default loginMe;



