import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import search from './search';
import sort from './sort';

// tham số của hàm combineReducers chính là giá trị state của store,
// tham số này là 1 JSON, mỗi 1 phần tử trong JSON chính là 1 reducer.
// Mỗi 1 reducer phải return 1 Object, đó là 1 phần của state của store
const myReducer = combineReducers({
    tasks,  // tasks: tasks,
    isDisplayForm,
    itemEditing,
    search,
    sort
})

export default myReducer;