 // frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  modifyDate = () => {
    // conssole.log(this.state.activeItem.due_date)
    if (this.props.activeItem.due_date) {
      let date = new Date(this.state.activeItem.due_date)

      let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`

      return formattedDate
    } else {
      let date = new Date()

      let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
      return formattedDate
    }
  }

  

  render() {
    console.log(this.state.activeItem)
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="priority">
                <select
                  name="priority"
                  value={this.state.activeItem.priority}
                  onChange={this.handleChange}
                  >
                  <option value="low" >
                    Low
                  </option>
                  <option value="med">
                    Med
                  </option>
                  <option value="high">
                    High
                  </option>
                </select>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="deadline">
                <input
                  type="date"
                  name="due_date"
                  value={this.modifyDate()}
                  onChange={this.handleChange}
                />
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
