import React, { Component } from 'react';
import './App.css';
import { ListTodo } from './components/ListTodo';
import { CreateTodo } from './components/CreateTodo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListTodo/>
        <CreateTodo/>
      </div>
    );
  }
}

export default App;
