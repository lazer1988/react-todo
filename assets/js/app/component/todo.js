import React from "react";

export default class Todo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            clicked: false,
            todo: this.props.todo
        };

        this.handlerEdit = this.handlerEdit.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handlerTitleClick = this.handlerTitleClick.bind(this);
        this.handlerTodoTextEdit = this.handlerTodoTextEdit.bind(this);
    }

    itemClass(){
        let className = 'todo-item';
        if (this.state.todo.completed) {
            className += ' completed';
        }

        return className;
    }

    handlerEdit(){
        const {edit} = this.props;

        let todo = Object.assign({}, this.state.todo, {completed: !this.state.todo.completed});

        this.setState({
            todo: todo
        });

        edit(todo);
    }

    handlerDelete(){
        const deleteTodo = this.props.delete;

        deleteTodo(this.state.todo);
    }

    handlerTitleClick(){
        if (!this.state.todo.completed) {
            this.setState({
                clicked: true
            });
        }
    }

    handlerTodoTextEdit(){
        const {edit} = this.props;

        this.setState({
            clicked: false
        });

        edit(this.state.todo);
    }

    handlerChange(e){
        this.setState({
            todo: Object.assign({}, this.state.todo, {title: e.target.value})
        });
    }

    renderTitle(){
        if (this.state.clicked) {
            return <input value={this.state.todo.title} onChange={this.handlerChange} onBlur={this.handlerTodoTextEdit} />;
        }

        return this.state.todo.title;
    }

    render () {
        return (
            <li className={this.itemClass()}>
                <button className="checkbox icon" onClick={this.handlerEdit}>
                    <i className="material-icons">
                        {this.state.todo.completed ? 'check_box' : 'check_box_outline_blank'}
                    </i>
                </button>

                <span className="title" onClick={this.handlerTitleClick}>
                    {this.renderTitle()}
                </span>

                <div className="actions">
                    <button className="delete icon" onClick={this.handlerDelete}>
                        <i className="material-icons">delete</i>
                    </button>
                </div>
            </li>
        );
    }
}
