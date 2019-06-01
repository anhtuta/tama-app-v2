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

function getStateAfterUpdateStatus(state, id) {
    let newState = [...state];
    console.log("before: ", JSON.stringify(newState));
    let index = findIndex(state, id);
    if(index !== -1) {
        let cloneTask = newState[index];
        cloneTask.status = !cloneTask.status;
        newState[index] = cloneTask;
        localStorage.setItem("tasks", JSON.stringify(newState));
    }
    console.log("after: ", JSON.stringify(newState));
    return newState;
}

function getStateAfterDeleteTask(state, id) {
    let newState = [...state];
    let index = findIndex(newState, id);
    if(index !== -1) {
        newState.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(newState));
    }
    return newState;
}

// State của reducer này là 1 mảng các task
// Mày nghĩ dùng như này:
// newState = [...state];
// thì nếu thay đổi newState sẽ ko ảnh hưởng tới state?
// Nhầm rồi thằng ngu! newState và state vẫn tham chiếu tới 1 ô nhớ
// Do đó thay đổi 1 thằng thì thằng kia thay đổi theo
// Thế rốt cuộc tạo pure function như nào để ko thay đổi state?
var myReducer = (state = initialState, action) => {
    let id, index, newTask, newState;

    switch(action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            console.log(action)
            newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if(newTask.id && newTask.id !== "") {
                // update task
                index = findIndex(state, newTask.id);
                if(index !== -1) {
                    state[index] = newTask;
                }
            } else{
                // add new task
                newTask.id = generateID();

                // làm như này là thay đổi state cũ: KHÔNG NÊN DÙNG
                // Dùng cách khác như nào???
                state.push(newTask);
            }
            
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            newState = [...state];
            index = findIndex(newState, action.id);
            if (index !== -1) {
                // làm như sau nó update state được nhưng ko render lại trên view
                // newState[index].status = !newState[index].status;

                // phải làm như sau: tạo 1 task mới rồi thay thế task hiện tại trong mảng
                var cloneTask = {...newState[index]};
                cloneTask.status = !cloneTask.status;
                newState[index] = cloneTask;
                localStorage.setItem("tasks", JSON.stringify(newState));
            }
            return newState;

            // TẠI SAO DÙNG function LẠI KO ĐƯỢC???
            // return getStateAfterUpdateStatus(state, action.id);
        case types.DELETE_TASK:
            return getStateAfterDeleteTask(state, action.id);
        default: return state;
    }
}

export default myReducer;