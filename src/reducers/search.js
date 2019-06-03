import * as types from '../constants/ActionTypes';

// state của reducer chỉ là 1 String, là keyword cần search
var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SEARCH:
            console.log(action)
            return action.keyword;
        default: return state;
    }
}

export default myReducer;