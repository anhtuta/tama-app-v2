import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : true
        };
    }

    componentWillMount() {
        this.addOrUpdateTaskFromProps(this.props);
    }

    // componentWillReceiveProps is required if you want to update
    // the state values with new props values, this method will get called
    // whenever any change happens to props values
    componentWillReceiveProps(nextProps) {
        this.addOrUpdateTaskFromProps(nextProps);
    }

    addOrUpdateTaskFromProps = (props) => {
        if(props && props.taskEditing){
            this.setState({
                id : props.taskEditing.id,
                name : props.taskEditing.name,
                status : props.taskEditing.status
            });
        } else{
            this.setState({
                id : '',
                name : '',
                status : true
            });
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if(name === 'status')
            value = value === "true" ? true : false;
        
        this.setState({
            [name] : value
        });
    }

    onSaveTask = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onCloseForm();
    }

    // close form thì component taskform sẽ bị remove, do đó state sẽ bị mất
    // do đó ko cần reset state
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { this.state.id === "" ? 'Add task' : 'Update task' }
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSaveTask} >
                        <div className="form-group">
                            <label>Task's name :</label>
                            <input
                                type="text" className="form-control" name="name" required
                                value={this.state.name} onChange={ this.onHandleChange } />
                        </div>

                        <label>Status :</label>
                        <select className="form-control" name="status"
                                value={this.state.status} onChange={this.onHandleChange}>
                            <option value={true}>Active</option>
                            <option value={false}>Done</option>
                        </select><br/>

                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span> Save
                            </button>&nbsp;
                            <button type="button" onClick={ this.onCloseForm } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;