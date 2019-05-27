import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id);
        // this.props.onCloseForm();
    }

    onEditTask = () => {
        // this.props.onOpenForm();
        this.props.onEditTask(this.props.task.id);
    }

    showStatusElement(){
        return (
            <span className={this.props.task.status ? 'btn label label-danger' : 'btn label label-info'}
                onClick={this.onUpdateStatus}>
                { this.props.task.status === true ? 'Active' : 'Done' }
            </span>
        );
    }

    render() {
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.task.name }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ this.onEditTask }>
                        <span className="fa fa-pencil mr-5"></span> Edit
                    </button>
                    &nbsp;
                    <button
                        type="button" className="btn btn-danger"
                        onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash mr-5"></span> Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    console.log("state: ", state);
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);