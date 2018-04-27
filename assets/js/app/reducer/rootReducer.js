import {TODO_CREATE, TODO_EDIT, TODO_DELETE, TODO_LOADING, TODO_LOADING_DONE, TODO_FETCH} from "../action/type/actionType";

export default function rootReducer (state, action) {
    let todos;

    switch (action.type) {
        case TODO_CREATE:
            todos = state.todos.slice();
            todos.push(action.payload);

            return Object.assign({}, state, {todos:todos});
        case TODO_LOADING:
            return Object.assign({}, state, {loading: true});

        case TODO_LOADING_DONE:
            return Object.assign({}, state, {loading: false});

        case TODO_EDIT:
            todos = state.todos.slice();
            for (let key in todos) {
                if (todos[key].id === action.payload.id) {
                    todos[key] = action.payload;
                    break;
                }
            }

            return Object.assign({}, state, {todos:todos});

        case TODO_DELETE:
            todos = state.todos.filter(el => el.id !== action.payload.id);

            return Object.assign({}, state, {todos: todos});

        case TODO_FETCH:
            return Object.assign({}, state, {todos: action.payload});
    }

    console.log('undefined action type');

    return state;
}
