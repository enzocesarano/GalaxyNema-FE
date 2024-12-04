import { NEWS } from "../actions";

const initialState = {
    news: {},
};

const news = (state = initialState, action) => {
    switch (action.type) {
      case NEWS:
        return {
          ...state,
          news: action.payload, 
        };
    
      default:
        return state;
    }
  };

export default news;
