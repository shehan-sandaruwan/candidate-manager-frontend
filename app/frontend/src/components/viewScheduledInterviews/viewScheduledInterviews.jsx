import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getScheduledInterviews,
    hideSaveAlert,
    hideSaveEdit,
    createFeedback,
    showSaveEdit,
    showAlert
} from "../../actions/scheduled-actions";
import { bindActionCreators } from "redux";
import { Column, Section} from "@trycake/glaze-ui/dist/components/Layout";
import Cookies from 'js-cookie';
import ScheduledInterviewTable from "./scheduledInterviewsTable";
import InterviewFeedbackFlyer from "./InterviewFeedbackFlyer"
import{
    updateState as rollbackStateUpdate
  } from "../../actions/preCheck-action";
  
class ViewScheduledInterviews extends Component {

    componentDidMount() {
        let user = JSON.parse(Cookies.get('authUser'));
        this.props.getScheduledInterviews(user.id);
    }

    render() {
        let user = JSON.parse(Cookies.get('authUser'));
        if (!user.canInterview) window.location.href = "/";
        else return (
            <Section sectionSpacing={true}>
                <Column size={"full"}>
                    <h1>Scheduled Interviews</h1>
                    <br />
                    <ScheduledInterviewTable
                        contents={this.props.interviews}
                        makeEditVisible={this.props.makeEditVisible}
                    />
                    <InterviewFeedbackFlyer
                        isEditVisible={this.props.isEditVisible}
                        hideSaveEdit={this.props.hideSaveEdit}
                        saveFeedback={this.props.createFeedback}
                        savealertVisible={this.props.savealertVisible}
                        isEdit={this.props.isEdit}              //only post method is there
                        currentEdit={this.props.currentEdit}    //doubted - HR's work??
                        hideAlert={this.props.hideSaveAlert}
                        alertType={this.props.alertType}
                        alertMsg={this.props.alertMsg}
                        getScheduledInterviews={this.props.getScheduledInterviews}
                        interviews={this.props.interviews}
                        showAlert={this.props.showAlert}
                        rollbackStateUpdate = {this.props.rollbackStateUpdate}

                    />
                </Column>
            </Section>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {

        interviews: state.scheduledInterviews.interviews.map(interview => {
            interview.date = interview.time.substr(0, 10);
            interview.proposedTime = interview.time.substr(11, 5);
            interview.candidateName = interview.applicationByApplicationId.firstName + " " + interview.applicationByApplicationId.lastName;
            interview.panel = [];
            for (var count = 0; count < (interview.pannelsById.length); count++) {
                if (JSON.parse(Cookies.get('authUser')).id != interview.pannelsById[count].userByUserId.id) {
                    interview.panel.push(interview.pannelsById[count].userByUserId.firstName + " " + interview.pannelsById[count].userByUserId.lastName);
                }
            }
            return interview;
        }),

        isEditVisible: state.scheduledInterviews.isEditVisible,
        currentEdit: state.scheduledInterviews.currentEdit,
        isEdit: state.scheduledInterviews.isEdit,
        savealertVisible: state.scheduledInterviews.savealertVisible,
        alertType: state.scheduledInterviews.alertType,
        alertMsg: state.scheduledInterviews.alertMsg
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators(
        {
            getScheduledInterviews: getScheduledInterviews,
            hideSaveEdit: hideSaveEdit,
            createFeedback: createFeedback,
            hideSaveAlert: hideSaveAlert,
            makeEditVisible: showSaveEdit,
            showAlert:showAlert,
            rollbackStateUpdate:rollbackStateUpdate
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ViewScheduledInterviews);
