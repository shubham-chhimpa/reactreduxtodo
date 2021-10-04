import React from "react";
import { connect } from "react-redux";
import { TodoActionTypes } from "../store/todo/todo-actions-types";

class AddTodo extends React.Component {
  state = {
    description: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.description);
    this.setState({
        description: "",
    });
  };
  handleChange = (e) => {
    this.setState({
      description: e.target.value,
    });

  };

  render() {
    return (
      <div>
        <label>Input Description : </label>
        <input
          type="text"
          onChange={this.handleChange}
          value= {this.state.description}
        />
        <br />
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (description) => {
      dispatch({
        type: TodoActionTypes.TODO_ADD,
        payload: { description: description },
      });
    }
  };
};


export default connect(null,mapDispatchToProps)(AddTodo);
