import React from "react";

export class TodoList extends React.Component {
  render() {
    return <ul>{this.props.children}</ul>;
  }
}
