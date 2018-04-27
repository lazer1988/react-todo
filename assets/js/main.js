import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from 'redux-thunk'

import App from "./app/component/app";
import rootReducer from "./app/reducer/rootReducer";

const initState = {
    loading: false,
    todos: []
};

const store = createStore(rootReducer, initState, applyMiddleware(thunkMiddleware));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
