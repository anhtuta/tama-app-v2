import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

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
    // onToggleForm = () => {
    //     this.setState({
    //         isDisplayForm: !this.state.isDisplayForm
    //     })
    // }

    componentWillMount() {
        if(localStorage && localStorage.getItem("tasks")) {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            this.setState({
                tasks: tasks
            })
        }
    }

    generateID() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    saveTasksToDb = () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }

    saveTasksToState = (tasks) => {
        this.setState({tasks: tasks});
        this.saveTasksToDb();
    }

    onOpenForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false,
            taskEditing: null
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

    onAddTask =  () => {
        this.setState({
            taskEditing: null
        })
        this.onOpenForm();
    }

    onEditTask = (id) => {
        console.log(id);
        let {tasks} = this.state;
        let index = this.findIndex(id);

        if(index !== -1) {
            this.setState({
                taskEditing: tasks[index]
            })
        }
        this.onOpenForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    onSort = sort => {
        this.setState({
            sort: sort
        })
    }

    render() {
        var { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state;

        if(filter) {
            // filter by name
            if(filter.name) {
                tasks = tasks.filter(task => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            
            // filter by status
            tasks = tasks.filter(task => {
                if(filter.status === -1) return task;
                else if(filter.status === 1) return task.status === true;
                else return task.status === false;
            });
            
            // search by name: It's exactly the same as filter by name
            if(keyword) {
                tasks = tasks.filter(task => {
                    return task.name.toLowerCase().indexOf(keyword) !== -1;
                });
            }
        }

        if(sort) {
            if(sort.by === 'name') {
                tasks.sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
                    else if(a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value;
                    else return 0;
                });
            } else if(sort.by === 'status') {
                tasks.sort((a, b) => {
                    if(a.status > b.status) return -sort.value;
                    else if(a.status < b.status) return sort.value;
                    else return 0;
                });
            }
        }

        var elmTaskForm = isDisplayForm ?
            <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                <TaskForm onCloseForm={this.onCloseForm}
                    onSaveTask={this.onSaveTask} taskEditing={taskEditing} />
            </div> :
            <div className=''></div>;

        return (
            <div className="container">
                <div className="text-center">
                    <h3>Task management</h3><hr/>
                </div>
                <div className="row">
                    {/* form */}
                    {elmTaskForm}

                    <div className={ isDisplayForm === true ?
                            'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
                            'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onAddTask}>
                            <span className="fa fa-plus mr-5"></span>&nbsp;
                            Add task
                        </button>

                        {/* Search, sort */}
                        <TaskControl onSearch={this.onSearch} onSort={this.onSort} />

                        {/* List */}
                        <TaskList tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            onEditTask={this.onEditTask}
                            onFilter={this.onFilter} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;