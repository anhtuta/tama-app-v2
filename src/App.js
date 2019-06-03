import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

    onAddTask = () => {
        this.props.onOpenForm();
        this.props.onClearItemEditing();
    }

    render() {
        // var { taskEditing, filter, keyword, sort } = this.state;
        var {isDisplayForm} = this.props;

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
                        <TaskControl onSort={this.onSort} />

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
        },
        // Dùng cái dưới ở bên TaskForm.js
        // onCloseForm: () => {
        //     dispatch(actions.closeForm());
        // }
        onClearItemEditing: () => {
            dispatch(actions.clearItemEditing());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);