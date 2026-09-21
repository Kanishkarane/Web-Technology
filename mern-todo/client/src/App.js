import React, { Component } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

class App extends Component {
  state = {
    todos: [],
    newTodo: '',
  };

  // Step 3 & 4: fetch existing tasks and store them in state
  componentDidMount() {
    axios
      .get('/api/todos')
      .then((res) => this.setState({ todos: res.data }))
      .catch((err) => console.error(err));
  }

  // Step 6: update newTodo as the user types
  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  // Steps 7-10: validate, POST to server, update state, reset input
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTodo.trim() === '') return;

    const task = { task: this.state.newTodo, completed: false };

    axios
      .post('/api/todos', task)
      .then((res) =>
        this.setState({ todos: [...this.state.todos, res.data], newTodo: '' })
      )
      .catch((err) => console.error(err));
  };

  handleToggle = (todo) => {
    axios
      .put(`/api/todos/${todo._id}`, { completed: !todo.completed })
      .then((res) =>
        this.setState({
          todos: this.state.todos.map((t) => (t._id === todo._id ? res.data : t)),
        })
      )
      .catch((err) => console.error(err));
  };

  handleEdit = (id, task) => {
    axios
      .put(`/api/todos/${id}`, { task })
      .then((res) =>
        this.setState({
          todos: this.state.todos.map((t) => (t._id === id ? res.data : t)),
        })
      )
      .catch((err) => console.error(err));
  };

  handleDelete = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() =>
        this.setState({ todos: this.state.todos.filter((t) => t._id !== id) })
      )
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="app">
        <h1>Todo App</h1>
        <TaskForm
          value={this.state.newTodo}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <TaskList
          todos={this.state.todos}
          onToggle={this.handleToggle}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
