import { createStore } from "redux";
import todoReducer from './todo-reducer';

const todoStore = createStore(todoReducer);

export default todoStore;