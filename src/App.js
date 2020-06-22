import React, { Component } from "react";
import { ListTodo } from "./components/ListTodo";
import { CreateTodo } from "./components/CreateTodo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListTodo />
      </div>
    );
  }
}

export default App;
