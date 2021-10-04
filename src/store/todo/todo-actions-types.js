const TODO_ADD = "TODO_ADDED";
const TODO_REMOVE = "TODO_REMOVED";
const TODO_FETCH = "TODO_FETCH";
const TODO_SEARCH = "TODO_SEARCH";

export class TodoActionTypes {
  static get TODO_ADD() {
    return TODO_ADD;
  }

  static get TODO_REMOVE() {
    return TODO_REMOVE;
  }
  static get TODO_FETCH() {
    return TODO_FETCH;
  }

  static get TODO_SEARCH() {
    return TODO_SEARCH;
  }
}
