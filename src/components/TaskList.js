import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1   //all: -1, active: 1, done: 0
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(id);
    }

    onDeleteTask = (id) => {
        this.props.onDeleteTask(id);
    }

    onEditTask = (id) => {
        this.props.onEditTask(id);
    }

    onChange = event => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        }, function() {
            this.props.onFilter(this.state.filterName, this.state.filterStatus);
        });
    }

    render() {
        var { tasks } = this.props;
        var {filterName, filterStatus} = this.state;
        var elmTasks;
        
        if(tasks && tasks.length > 0) {
            elmTasks = tasks.map((task, index) => {
                return (
                    <TaskItem
                        key={task.id} task={task} index={index + 1}
                        onUpdateStatus={this.onUpdateStatus}
                        onDeleteTask={this.onDeleteTask} onEditTask={this.onEditTask} />
                )
            });
        }

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control"
                                        placeholder="Filter by name"
                                        name="filterName" value={filterName}
                                        onChange={this.onChange} />
                                </td>
                                <td>
                                    <select className="form-control" name="filterStatus"
                                            value={filterStatus} onChange={this.onChange}>
                                        <option value={-1}>All</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>Done</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { elmTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// convert state from store to props of this component
const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, null)(TaskList);