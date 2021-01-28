// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        priority: '',
        due_date: ''
      },
      todoList: [],
      viewAll: false
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true, viewAll: false });
    }
    return this.setState({ viewCompleted: false, viewAll: false });
  };

  displayAll = () => {
    this.setState({
      viewAll: true
    })
  }

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted && !this.state.viewAll ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={!this.state.viewCompleted && !this.state.viewAll ? "active" : ""}
        >
          Incomplete
        </span>
        <span
          onClick={() => this.displayAll()}
          className={this.state.viewAll ? "active" : ""}
        >
          All
        </span>
      </div>
    );
  };

  renderHeaders = () => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          Task
        </span>
        <span>
          Date
        </span>
        <span>
          Priority
        </span>
        <span>
          Options
        </span>
      </li>
    )
  }

  renderItems = () => {
    const { viewCompleted } = this.state;
    let newItems = []

    if (!this.state.viewAll) {
      newItems = this.state.todoList.filter(
        item => item.completed === viewCompleted
      )
    } else {
      newItems = this.state.todoList
    }

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          {item.due_date ? new Date(item.due_date).toDateString() : !item.completed && "No Due Date"}
        </span>
        <span>
          {!item.completed && item.priority}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    // console.log(item.due_date)
    let date = new Date(item.due_date)

    item = {
      ...item,
      due_date: date
    }
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, priority: '', dueDate: '' };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              {/* {this.renderHeaders()} */}
              <div>
                <ul className="list-group list-group-flush">
                  {this.renderHeaders()}  
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
