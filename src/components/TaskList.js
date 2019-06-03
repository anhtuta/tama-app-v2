import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';

class TaskList extends Component {

    // Phần filter KHÔNG dùng Redux, vì lưu ở state của component này là đủ rồi
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1   //all: -1, active: 1, done: 0
        };
    }

    onChange = event => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === "filterStatus") {
            value = parseInt(value);
        }

        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks, keyword, sort } = this.props;
        var {filterName, filterStatus} = this.state;
        var elmTasks;
        
        if(tasks && tasks.length > 0) {
            // filter by name
            if(filterName && filterName !== '') {
                tasks = tasks.filter(task => {
                    return task.name.toLowerCase().indexOf(filterName) !== -1;
                });
            }

            // filter by status
            tasks = tasks.filter(task => {
                if(filterStatus === -1) return task;
                else if(filterStatus === 1) return task.status === true;
                else return task.status === false;
            });
            
            // search by name: It's exactly the same as filter by name
            if(keyword) {
                tasks = tasks.filter(task => {
                    return task.name.toLowerCase().indexOf(keyword) !== -1;
                });
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

            elmTasks = tasks.map((task, index) => {
                return (
                    <TaskItem key={task.id} task={task} index={index + 1} />
                )
            });
        }

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover table-striped">
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

// pass state from store to props of this component
// At this point, this component will have a props = tasks:
// this.props.tasks
// @param state: state của store, giá trị nào mà nhiều component
// dùng chung thì nên cho vào state của store thay vì lưu ở state
// của chính component đó.
const mapStateToProps = (state) => {
    // state này là 1 json gồm các key (phần tử) được định nghĩa ở
    // reducer (trong file /reducers/index.js)
    // console.log("Thử in state ra sẽ thấy nó gồm những gì: ", state);
    return {
        tasks: state.tasks,
        keyword: state.search,
        sort: state.sort
    }
}

export default connect(mapStateToProps, null)(TaskList);