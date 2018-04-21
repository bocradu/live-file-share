import { NAVIGATE } from "../actions";
const INITIAL_STATE = {
  page: "host"
};

const RouteState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAVIGATE: {
      state.page = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
export { RouteState };
