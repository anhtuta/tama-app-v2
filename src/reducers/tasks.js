import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var generateID = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

var findIndex = (tasks, id) => {
    let res = -1;
    tasks.forEach((task, index) => {
        if(task.id === id) {
            res = index;
        }
    })
    return res;
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
        case types.UPDATE_STATUS_TASK:
            let newState = [...state];
            let index = findIndex(newState, action.id);
            if (index !== -1) {
                newState[index].status = !newState[index].status;
                localStorage.setItem("tasks", JSON.stringify(newState));
            }
            console.log("index = ", index);
            console.log(newState)
            return newState;
        default: return state;
    }
}

export default myReducer;