import React from "react";
import "./App.css";
import AddNumberRoot from "./components/AddNumberRoot";
import DisplayNumberRoot from "./components/DisplayNumberRoot";

class App extends React.Component {
  state = {
    number: 0,
  };
  render() {
    return (
      <div className="App">
        <h1>Root</h1>
        <AddNumberRoot
          onClick={(size) => {
            this.setState({
              number: this.state.number + size,
            });
          }}
        />
        <DisplayNumberRoot number={this.state.number} />
      </div>
    );
  }
}

export default App;
