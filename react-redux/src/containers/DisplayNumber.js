import DisplayNumber from "../components/DisplayNumber";
import { connect } from "react-redux";
export default connect()(DisplayNumber);

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
