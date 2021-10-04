import React from "react";
import { connect } from "react-redux";
import { TodoActionTypes } from "../store/todo/todo-actions-types";

class TodoSearch extends React.Component {
  state = {
    searchKeyword: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchText(this.state.searchKeyword);
    this.setState({
      searchKeyword: "",
    });
  };
  handleChange = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <label>Input Description : </label>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.searchKeyword}
        />
        <br />
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
        <ul>
          {this.props.suggestions.map((suggestion) => {
            return <li key ={suggestion}>{suggestion}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions ? state.suggestions : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchText: (searchKeyword) => {
      dispatch({
        type: TodoActionTypes.TODO_SEARCH,
        payload: { searchKeyword: searchKeyword },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoSearch);
