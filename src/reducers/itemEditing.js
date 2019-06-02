import * as types from '../constants/ActionTypes';

var initialState = {};

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.EDIT_TASK:
            return action.task;
        case types.CLEAR_ITEM_EDITING:
            return initialState;
        default: return state;
    }
}

export default myReducer;