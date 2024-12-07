import { UPDATE_USER } from "../actions";

const initialState = {
    userUpdate: null,
  };
  
  const userUpdate = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return {
          ...state,
          userUpdate: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userUpdate;