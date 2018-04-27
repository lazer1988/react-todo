import {TODO_FETCH, TODO_LOADING, TODO_LOADING_DONE} from "../type/actionType";

export default function todoFetch() {
    return dispatch => {
        $.ajax({
            url: '/api/todos',
            beforeSend: function () {
                dispatch({
                    type: TODO_LOADING
                });
            },
            success: function (response) {
                dispatch({
                    type: TODO_FETCH,
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
