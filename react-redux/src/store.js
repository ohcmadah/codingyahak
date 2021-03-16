import { createStore } from "redux";

const reducer = (state = { number: 0 }, action) => {
  if (action.type === "INCREMENT") {
    state = { ...state, number: state.number + action.size };
  }
  return state;
};

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
