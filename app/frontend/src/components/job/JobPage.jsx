import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDepartments
} from "../../actions/department-actions";
import {
  createJob,
  updateJob,
  showSaveEdit,
  hideSaveEdit,
  getJobs,
  hideSaveAlert
} from "../../actions/job-actions";
import { bindActionCreators } from "redux";
import JobTable from "./JobTable";
import AddJobFlyer from "./AddJobFlyer";
import Cookies from 'js-cookie';
class JobPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getJobs();
    console.log("mounted");
    this.props.getDepartments();
    console.log(this.props.departments);
  }

  render() {
    let user = JSON.parse(Cookies.get('authUser'));
    if (!user.isAdmin) window.location.href = "/";
    else return (
      <div>
        <JobTable
          contents={this.props.jobs}
          isEditVisible={this.props.isEditVisible}
          makeEditVisible={this.props.makeEditVisible}
        />
        <AddJobFlyer
          isEditVisible={this.props.isEditVisible}
          hideSaveEdit={this.props.hideSaveEdit}
          saveJob={this.props.createJob}
          savealertVisible={this.props.savealertVisible}
          isEdit={this.props.isEdit}
          currentEdit={this.props.currentEdit}
          updateJob={this.props.updateJob}
          hideSaveAlert={this.props.hideSaveAlert}
          alertType={this.props.alertType}
          alertMsg={this.props.alertMsg}
          departmentList = {this.props.departments}

        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    jobs: state.job.allJobs,
    isEditVisible: state.job.isEditVisible,
    savealertVisible: state.job.savealertVisible,
    isEdit: state.job.isEdit,
    departments: state.department.allDepartments,
    currentEdit: state.job.currentEdit,
    gettingJobs: state.job.getting,
    alertMsg: state.job.alertMsg,
    alertType: state.job.alertType
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      getJobs: getJobs,
      makeEditVisible: showSaveEdit,
      hideSaveEdit: hideSaveEdit,
      createJob: createJob,
      updateJob: updateJob,
      getDepartments: getDepartments,
      hideSaveAlert: hideSaveAlert
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(JobPage);
