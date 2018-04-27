import {TODO_CREATE, TODO_LOADING, TODO_LOADING_DONE} from "../type/actionType";

export default function todoCreate(todo) {
    return dispatch => {
        $.ajax({
            url: '/api/todo',
            method: 'POST',
            data: {title: todo.title},
            beforeSend: function () {
                dispatch({
                    type: TODO_LOADING
                });
            },
            success: function (response) {
                dispatch({
                    type: TODO_CREATE,
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
