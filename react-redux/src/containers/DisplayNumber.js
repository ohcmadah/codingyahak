import DisplayNumber from "../components/DisplayNumber";
import { connect } from "react-redux";
function mapReduxStateToReactProps(state) {
  return {
    number: state.number,
  };
}
export default connect(mapReduxStateToReactProps)(DisplayNumber);

/*
import React, { Component } from "react";

export default class _ extends Component {
  state = {
    number: store.getState().number,
  };

  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setState({ number: store.getState().number });
    });
  }
  render() {
    return <DisplayNumber number={this.state.number} />;
  }
}
*/
