import React, { Component } from 'react';
import './App.css';
import { ListTodo } from './components/ListTodo';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ListTodo/>
      </div>
    );
  }
}

export default App;
