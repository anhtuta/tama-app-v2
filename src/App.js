import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

class App extends Component {

    // onToggleForm = () => {
    //     var { itemEditing } = this.props;
    //     if(itemEditing && itemEditing.id !== ''){
    //         this.props.onOpenForm();
    //     }else{
    //         console.log(this.props);
    //         this.props.onToggleForm();
    //     }
    //     this.props.onClearTask({
    //         id : '',
    //         name : '',
    //         status : false
    //     });
    // }

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null
        }
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem("tasks")) {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            this.setState({
                tasks: tasks
            })
        }
    }

    generateID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    saveTasksToDb = () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }

    saveTasksToState = (tasks) => {
        this.setState({tasks: tasks});
        this.saveTasksToDb();
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    onOpenForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onSaveTask = (data) => {
        let tasks = this.state.tasks;
        if (data.id === "") {
            // add new task
            let task = data;
            task.id = this.generateID();
            tasks.push(task);
        } else {
            // edit existing task
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }

        // CHÚ Ý: biến tasks ở trên tham chiếu đến this.state.tasks, do đó nếu thay
        // đổi giá trị của nó thì state cũng sẽ thay đổi theo, do đó ko cần gọi hàm
        // setState như sau: this.setState({tasks: tasks}) (?????)
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        this.saveTasksToDb();
    }

    findIndex = (id) => {
        let {tasks} = this.state;
        let res = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                res = index;
            }
        })
        return res;
    }

    onUpdateStatus = (id) => {
        let {tasks} = this.state;
        let index = this.findIndex(id);

        if(index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.saveTasksToState(tasks);
        }
    }

    onDeleteTask = (id) => {
        let {tasks} = this.state;
        let index = this.findIndex(id);

        if(index !== -1) {
            tasks.splice(index, 1);
            this.saveTasksToState(tasks);
        }
    }

    onEditTask = (id) => {
        let {tasks} = this.state;
        let index = this.findIndex(id);

        if(index !== -1) {
            this.setState({
                taskEditing: tasks[index]
            })
        }
        this.onOpenForm();
    }

    render() {
        var { tasks, isDisplayForm, taskEditing } = this.state;
        var elmTaskForm = isDisplayForm ?
            <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                <TaskForm onCloseForm={this.onCloseForm}
                    onSaveTask={this.onSaveTask} taskEditing={taskEditing} />
            </div> :
            <div className=''></div>;

        return (
            <div className="container">
                <div className="text-center">
                    <h3>QLCV</h3><hr/>
                </div>
                <div className="row">
                    {/* form */}
                    {elmTaskForm}

                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onOpenForm} >
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>

                        {/* Search, sort */}
                        {/* <TaskControl /> */}

                        {/* List */}
                        <TaskList tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            onEditTask={this.onEditTask} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;