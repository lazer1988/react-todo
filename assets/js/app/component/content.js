import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import todoCreate from "../action/creator/create";
import todoEdit from "../action/creator/edit";
import todoDelete from "../action/creator/delete";
import todoFetch from "../action/creator/fetch";

import Todo from "./todo";

class Content extends React.Component {
    constructor(props){
        super(props);

        this.inputRef = null;

        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount(){
        const {todoFetch} = this.props;

        todoFetch();
    }

    handlerSubmit(e){
        e.preventDefault();

        const {todoCreate} = this.props;

        todoCreate({
            title: this.inputRef.value,
            completed: false
        });

        this.inputRef.value = '';
        this.inputRef.focus();
    }

    render() {
        const {todoEdit, todoDelete} = this.props;

        return (
            <main>
                <div className={'loading' + (this.props.loading ? '' : ' hide')}> </div>
                <form className="todo-form" onSubmit={this.handlerSubmit}>
                    <input ref={node => this.inputRef = node} name="name" type="text" placeholder="Todo text" required />

                    <button type="submit">Create Todo</button>
                </form>

                <ul className="todo-list">
                    {this.props.todos.map((todo) => <Todo key={todo.id} todo={todo} edit={todoEdit} delete={todoDelete} />)}
                </ul>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        todos: state.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        todoCreate: bindActionCreators(todoCreate, dispatch),
        todoEdit: bindActionCreators(todoEdit, dispatch),
        todoDelete: bindActionCreators(todoDelete, dispatch),
        todoFetch: bindActionCreators(todoFetch, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
