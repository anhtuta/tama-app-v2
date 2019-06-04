import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskSortControl extends Component {

    constructor(props) {
        super(props);
        var sortObj = JSON.parse(localStorage.getItem("sortTasks"));
        if(sortObj) {
            this.state = {
                sort: sortObj
            }
        } else {
            this.state = {
                sort: {
                    by: 'name',
                    value: 1
                }
            }
        }
    }

    onClick = (sortBy, sortValue) => {
        let sortObj = {
            by: sortBy,
            value: sortValue
        }

        this.setState({
            sort: sortObj
        });

        this.props.onSort(sortObj);

        localStorage.setItem("sortTasks", JSON.stringify(sortObj));
    }

    render() {
        var {sort} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button" id="dropdownMenu1" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true" >
                        Sort &nbsp;<span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li className="btn_sort" onClick={() => this.onClick('name', 1)}>
                            <div className={(sort.by==='name' && sort.value===1) ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-asc pr-5"></span> Name A-Z
                            </div>
                        </li>
                        <li className="btn_sort" onClick={() => this.onClick('name', -1)}>
                            <div className={(sort.by==='name' && sort.value===-1) ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-desc pr-5"></span> Name Z-A
                            </div>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li className="btn_sort" onClick={() => this.onClick('status', 1)}>
                            <div className={(sort.by==='status' && sort.value===1) ? 'sort_selected' : ''}>
                                Status active
                            </div>
                        </li>
                        <li className="btn_sort" onClick={() => this.onClick('status', -1)}>
                            <div className={(sort.by==='status' && sort.value===-1) ? 'sort_selected' : ''}>
                                Status done
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort))
        },
    };
}

export default connect(null, mapDispatchToProps)(TaskSortControl);