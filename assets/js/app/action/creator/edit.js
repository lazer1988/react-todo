import {TODO_EDIT, TODO_LOADING, TODO_LOADING_DONE} from "../type/actionType";

export default function todoEdit(todo) {
    return dispatch => {
        $.ajax({
            url: '/api/todo/'+todo.id,
            method: "PUT",
            data: {title: todo.title, completed: todo.completed},
            beforeSend: function () {
                dispatch({
                    type: TODO_LOADING
                });
            },
            success: function (response) {
                dispatch({
                    type: TODO_EDIT,
                    payload: response
                });
            },
            complete: function () {
                dispatch({
                    type: TODO_LOADING_DONE
                });
            }
        });
    };
}
