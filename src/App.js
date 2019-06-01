import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
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

    onAddTask =  () => {
        this.props.onOpenForm();
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
        // var { taskEditing, filter, keyword, sort } = this.state;
        var {isDisplayForm} = this.props;

        // if(filter) {
        //     // filter by name
        //     if(filter.name) {
        //         tasks = tasks.filter(task => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //    
        //     // filter by status
        //     tasks = tasks.filter(task => {
        //         if(filter.status === -1) return task;
        //         else if(filter.status === 1) return task.status === true;
        //         else return task.status === false;
        //     });
        //    
        //     // search by name: It's exactly the same as filter by name
        //     if(keyword) {
        //         tasks = tasks.filter(task => {
        //             return task.name.toLowerCase().indexOf(keyword) !== -1;
        //         });
        //     }
        // }
        //
        // if(sort) {
        //     if(sort.by === 'name') {
        //         tasks.sort((a, b) => {
        //             if(a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
        //             else if(a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value;
        //             else return 0;
        //         });
        //     } else if(sort.by === 'status') {
        //         tasks.sort((a, b) => {
        //             if(a.status > b.status) return -sort.value;
        //             else if(a.status < b.status) return sort.value;
        //             else return 0;
        //         });
        //     }
        // }

        var elmTaskForm = isDisplayForm ?
            <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                <TaskForm />
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
                        <TaskList
                            onFilter={this.onFilter} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        }
        // Dùng cái dưới ở bên TaskForm.js
        // ,onCloseForm: () => {
        //     dispatch(actions.closeForm());
        // }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);