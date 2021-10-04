import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { TodoListItem } from "./components/todo-list-item";
import { TodoList } from "./components/todo-list";
import { TodoActionTypes } from "./store/todo/todo-actions-types";
import AddTodo from "./components/todo-add";
import { Provider } from "react-redux";
import todoStore from "./store/todo/todo-store";
import TodoSearch from "./components/todo-search";
class App extends React.Component {
  render() {
    const { todos } = this.props;
    const todoItems = todos.map((todo) => (
      <TodoListItem
        key={"tli-" + todo.id}
        todo={todo}
        deleteTodo={this.props.deleteTodo}
      ></TodoListItem>
    ));
    return (
      <div>
        <Provider store={todoStore}>
          <AddTodo></AddTodo>
        </Provider>
        <TodoList>{todoItems}</TodoList>
        <Provider store={todoStore}>
          <TodoSearch></TodoSearch>
        </Provider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => {
      dispatch({ type: TodoActionTypes.TODO_REMOVE, payload: { id: id } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
