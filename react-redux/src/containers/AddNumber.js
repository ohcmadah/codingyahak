import AddNumber from "../components/AddNumber";
import { connect } from "react-redux";
function mapReduxStateToReactProps(state) {
  return {
    number: state.number,
  };
}
function mapReduxDispatchToReactProps() {
  return {};
}
export default connect(
  mapReduxStateToReactProps,
  mapReduxDispatchToReactProps
)(AddNumber);

/*
import React, { Component } from "react";
import store from "../store";

export default class _ extends Component {
  render() {
    return (
      <AddNumber
        onClick={(size) => {
          store.dispatch({ type: "INCREMENT", size });
        }}
      />
    );
  }
}
*/
