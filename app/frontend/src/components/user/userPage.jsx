import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createUser,
  updateUser,
  showSaveEdit,
  hideSaveEdit,
  getUsers,
  hideSaveAlert
} from "../../actions/user-action";
import {
  createPriviledge,
  updatePriviledge,
  getPriviledges,
  showPrivilegeEdit,
  hidePrivilegeEdit,
  hidePrivilegeAlert

} from "../../actions/userPriviledge-actions";
import {
  getAdmins,
  createAdmin,
  showAdminEdit,
  hideAdminEdit,
  hideAdminAlert,
  updateAdmin
} from "../../actions/user-admin-actions";
import {
  getJobs
} from '../../actions/job-actions'
import { bindActionCreators } from "redux";
import UserTable from "./UserTable";
import AddUserFlyer from "./AddUserFlyer";
import AddPriviledgeFlyer from "./AddPriviledgeFlyer";
import AddAdminFlyer from "./AddAdminFlyer"
import Cookies from 'js-cookie';
class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getPriviledges();
    this.props.getJobs();
    this.props.getAdmins();
  }

  render() {
    let user = JSON.parse(Cookies.get('authUser'));
    if (!user.isSuperAdmin) window.location.href = "/";
    else return (
      <div>
        <UserTable
          contentUsers={this.props.users}
          contentPrivileges={this.props.privileges}
          contentAdmins={this.props.admins}
          isEditVisible={this.props.isEditVisible}
          makeEditVisible={this.props.makeEditVisible}
          isPrivilegeEditVisible={this.props.isPrivilegeEditVisible}
          makePrivilegeEditVisible={this.props.makePrivilegeEditVisible}
          makeAdminEditVisible={this.props.makeAdminEditVisible}
        />
        {
          <AddUserFlyer
            isEditVisible={this.props.isEditVisible}
            hideSaveEdit={this.props.hideSaveEdit}
            saveUser={this.props.saveUser}
            savealertVisible={this.props.savealertVisible}
            isEdit={this.props.isEdit}
            currentEdit={this.props.currentEdit}
            updateUser={this.props.updateUser}
            hideSaveAlert={this.props.hideSaveAlert}
            alertType={this.props.alertType}
            alertMsg={this.props.alertMsg}
          />
        }
        {
          <AddPriviledgeFlyer
            isPrivilegeEditVisible={this.props.isPrivilegeEditVisible}
            hidePrivilegeEdit={this.props.hidePrivilegeEdit}
            savePriviledge={this.props.savePriviledge}
            savealertVisible={this.props.privilegeAlertVisible}
            isEdit={this.props.isPriviledgeEdit}
            currentEdit={this.props.currentPrivilegeEdit}
            updatePriviledge={this.props.updatePriviledge}
            hideSaveAlert={this.props.hidePrivilegeAlert}
            alertType={this.props.privilegeAlertType}
            alertMsg={this.props.privilegeAlertMsg}
            users={this.props.users}
            positions={this.props.allJobs}
          />
        }
        {
          <AddAdminFlyer
            isAdminEditVisible={this.props.isAdminEditVisible}
            hideAdminEdit={this.props.hideAdminEdit}
            saveAdmin={this.props.saveAdmin}
            savealertVisible={this.props.adminAlertVisible}
            isEdit={this.props.isAdminEdit}
            currentEdit={this.props.currentAdminEdit}
            updateAdmin={this.props.updateAdmin}
            hideSaveAlert={this.props.hideAdminAlert}
            alertType={this.props.adminAlertType}
            alertMsg={this.props.adminAlertMsg}
            users={this.props.users}
          />
        }
      </div>
    );

  }
}

const mapStateToProps = (state, props) => {
  return {
    users: state.user.allUsers,
    privileges: state.privilege.allPrivileges,
    admins: state.admin.allAdmins,
    isEditVisible: state.user.isEditVisible,
    savealertVisible: state.user.savealertVisible,
    isEdit: state.user.isEdit,
    currentEdit: state.user.currentEdit,
    gettingUser: state.user.getting,
    alertMsg: state.user.alertMsg,
    alertType: state.user.alertType,
    isPrivilegeEditVisible: state.privilege.isPrivilegeEditVisible,
    currentPrivilegeEdit: state.privilege.currentEdit,
    isPriviledgeEdit: state.privilege.isPriviledgeEdit,
    privilegeAlertVisible: state.privilege.savealertVisible,
    privilegeAlertMsg: state.privilege.alertMsg,
    privilegeAlertType: state.privilege.alertType,
    allJobs: state.job.allJobs,
    isAdminEditVisible: state.admin.isAdminEditVisible,
    isAdminEdit: state.admin.isEdit,
    currentAdminEdit: state.admin.currentEdit,
    adminAlertVisible: state.admin.savealertVisible,
    adminAlertType: state.admin.alertType,
    adminAlertMsg: state.admin.alertMsg,
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      getUsers: getUsers,
      getAdmins: getAdmins,
      makeEditVisible: showSaveEdit,
      hideSaveEdit: hideSaveEdit,
      createUser: createUser,
      updateUser: updateUser,
      hideSaveAlert: hideSaveAlert,
      saveUser: createUser,
      makePrivilegeEditVisible: showPrivilegeEdit,
      savePriviledge: createPriviledge,
      updatePriviledge: updatePriviledge,
      getPriviledges: getPriviledges,
      hidePrivilegeEdit: hidePrivilegeEdit,
      hidePrivilegeAlert: hidePrivilegeAlert,
      getJobs: getJobs,
      hideAdminEdit: hideAdminEdit,
      makeAdminEditVisible: showAdminEdit,
      saveAdmin: createAdmin,
      hideAdminAlert: hideAdminAlert,
      updateAdmin: updateAdmin
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserPage);
