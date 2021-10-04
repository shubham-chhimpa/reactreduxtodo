import { TodoActionTypes } from "./todo-actions-types";
import { v4 as uuidv4 } from "uuid";
import Trie from "../../utils/trie";
let initState = {
  todos: [
    {
      id: uuidv4(),
      body: "Mop the floor, wipe the countertop and don't forget to take out the trash!",
    },
    { id: uuidv4(), body: "It's her birthday!" },
    { id: uuidv4(), body: "They need water, or they will die." },
  ],
};

let searchTrie = new Trie();
function filterEnglishAlphaBets(body) {
  let cleanedBody = "";
  for (let i = 0; i < body.length; i++) {
    body = body.toLowerCase();
    if (
      (parseInt(body.charCodeAt(i)) - parseInt("a".charCodeAt(0)) >= 0 &&
      parseInt(body.charCodeAt(i)) - parseInt("a".charCodeAt(0)) <= 26) || body.charAt(i)=== ' '
    ) {
      cleanedBody += body[i];
    }else{
        cleanedBody += " ";
    }
  }
  return cleanedBody;
}
initState.todos.forEach((todo) => {
  const cleanedBody = filterEnglishAlphaBets(todo.body);
  const bodyArray = cleanedBody.split(" ");
  for (let i = 0; i < bodyArray.length; i++) {
    searchTrie.insert(bodyArray[i]);
  }
});

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case TodoActionTypes.TODO_ADD: {
      const newTodos = JSON.parse(JSON.stringify(state.todos));
      const cleanedBody = filterEnglishAlphaBets(action.payload.description);
      const bodyArray = cleanedBody.split(" ");
      for (let i = 0; i < bodyArray.length; i++) {
        searchTrie.insert(bodyArray[i]);
      }
      newTodos.push({
        id: uuidv4(),
        body: action.payload.description,
      });
      return {
        ...state,
        todos: newTodos,
      };
    }
    case TodoActionTypes.TODO_REMOVE: {
      const newTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });

      searchTrie = new Trie();
      newTodos.forEach((todo) => {
        const cleanedBody = filterEnglishAlphaBets(todo.body);
        const bodyArray = cleanedBody.split(" ");
        for (let i = 0; i < bodyArray.length; i++) {
          searchTrie.insert(bodyArray[i]);
        }
      });

      return {
        ...state,
        todos: newTodos,
      };
    }
    case TodoActionTypes.TODO_SEARCH: {
      const searchKeyword = action.payload.searchKeyword;
      const suggestions = searchTrie.search(searchKeyword);

      return {
        ...state,
        suggestions: suggestions,
      };
    }
    default: {
      return state;
    }
  }
}
