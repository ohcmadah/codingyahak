import AddNumber from "../components/AddNumber";
import { connect } from "react-redux";
function mapDispatchToProps(dispatch) {
  return {
    onClick: function (size) {
      dispatch({ type: "INCREMENT", size });
    },
  };
}
export default connect(null, mapDispatchToProps)(AddNumber);

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
