import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileTable from "./ProfileTable";
import AddNewProfileFlyer from "./AddNewProfileFlyer";
import EditProfileFlyer from "./EditProfileFlyer";

import {
    showAddFieldFlyer,
    showAddProfileFlyer,
    hideProfileFlyer,
    getProfiles,
    createProfile,
    hideSaveAlert,
    makeEditVisible,
    hideSaveEdit
} from "../../actions/profile-action"

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        return (
            <div>
                <ProfileTable
                    showAddProfileFlyer={this.props.showAddProfileFlyer}
                    showAddFieldFlyer={this.props.showAddFieldFlyer}
                    allProfiles={this.props.allProfiles}
                    makeEditVisible = {this.props.makeEditVisible}
                />
                <AddNewProfileFlyer
                    isAddProfileFlyerVisible={this.props.isAddProfileFlyerVisible}
                    hideProfileFlyer={this.props.hideProfileFlyer}
                    createProfile={this.props.createProfile}
                    alertMsg={this.props.alertMsg}
                    alertType={this.props.alertType}
                    isSaveAlertVisible={this.props.isSaveAlertVisible}
                    hideSaveAlert={this.props.hideSaveAlert}
                    makeEdidVisible={this.props.makeEdidVisible}
                />
                <EditProfileFlyer
                    profile={this.props.profile}
                    isSaveEditVisible={this.props.isSaveEditVisible}
                    hideSaveEdit = {this.props.hideSaveEdit}
                />
            </div>
        );

    }
}

const mapStateToProps = (state, props) => {
    return {
        profile:state.profile.profile,
        isSaveEditVisible: state.profile.isSaveEditVisible,
        isAddProfileFlyerVisible: state.profile.isAddProfileFlyerVisible,
        alertType: state.profile.alertType,
        alertMsg: state.profile.alertMsg,
        isSaveAlertVisible: state.profile.isSaveAlertVisible,
        allProfiles: state.profile.allProfiles
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        showAddFieldFlyer: showAddFieldFlyer,
        showAddProfileFlyer: showAddProfileFlyer,
        hideProfileFlyer: hideProfileFlyer,
        getProfiles: getProfiles,
        createProfile: createProfile,
        hideSaveAlert: hideSaveAlert,
        hideSaveEdit:hideSaveEdit,
        makeEditVisible:makeEditVisible
    },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ProfilePage);