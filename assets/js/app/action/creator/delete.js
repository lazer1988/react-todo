import {TODO_DELETE, TODO_LOADING, TODO_LOADING_DONE} from "../type/actionType";

export default function todoDelete(todo) {
    return dispatch => {
        $.ajax({
            url: '/api/todo/'+todo.id,
            method: "DELETE",
            beforeSend: function () {
                dispatch({
                    type: TODO_LOADING
                });
            },
            success: function () {
                dispatch({
                    type: TODO_DELETE,
                    payload: todo
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
