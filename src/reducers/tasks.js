import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var generateID = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            console.log("add task: ", action);
            var newTask = {
                id: generateID(),
                name: action.task.name,
                status: action.task.status
            }

            // làm như này là thay đổi state cũ: KHÔNG NÊN DÙNG
            // Dùng cách khác như nào???
            state.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        default: return state;
    }
}

export default myReducer;