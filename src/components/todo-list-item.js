import React from "react";

export class TodoListItem extends React.Component {
handleClick = ()=>{
    this.props.deleteTodo(this.props.todo.id);
}
  render() {
    return <li key={this.props.todo.id}> {this.props.todo.body} <button onClick={this.handleClick}> delete </button></li>;
  }
}
