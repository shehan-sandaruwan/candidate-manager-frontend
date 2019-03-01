import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    showSaveEdit,
    hideSaveEdit,
    hideSaveAlert,
    getDepartments,
    updateDepartment,
    createDepartment
} from "../../actions/department-actions";
import DepartmentTable from './DepartmentTable';
import DepartmentFlyer from './DepartmentFlyer';

import Cookies from 'js-cookie';


class DepartmentPage extends Component {


    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("mounted");
        this.props.getDepartments();
    }

    render() {
        let user = JSON.parse(Cookies.get('authUser'));
        if (!user.isAdmin) window.location.href = "/";
        else return (

            <div>
                <DepartmentTable
                    contents={this.props.departments}
                    isEditVisible={this.props.isEditVisible}
                    makeEditVisible={this.props.makeEditVisible}
                />
                <DepartmentFlyer
                    isEditVisible={this.props.isEditVisible}
                    hideSaveEdit={this.props.hideSaveEdit}
                    saveDepartment={this.props.createDepartment}
                    savealertVisible={this.props.savealertVisible}
                    isEdit={this.props.isEdit}
                    currentEdit={this.props.currentEdit}
                    updateDepartment={this.props.updateDepartment}
                    hideSaveAlert={this.props.hideSaveAlert}
                    alertType={this.props.alertType}
                    alertMsg={this.props.alertMsg}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, props) => {
    return {
        departments: state.department.allDepartments,
        isEditVisible: state.department.isEditVisible,
        savealertVisible: state.department.savealertVisible,
        alertMsg: state.department.alertMsg,
        alertType: state.department.alertType
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators(
        {
            getDepartments: getDepartments,
            makeEditVisible: showSaveEdit,
            hideSaveEdit: hideSaveEdit,
            createDepartment: createDepartment,
            updateDepartment: updateDepartment,
            hideSaveAlert: hideSaveAlert
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(DepartmentPage);