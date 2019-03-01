import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Column,
  Section,
  LayoutHandler,
  Container
} from "@trycake/glaze-ui/dist/components/Layout";
import { Label, DropDown,Input  } from "@trycake/glaze-ui";
import ApplicationTable from "./ApplicationTable";
import ApplicationFlyer from "./ApplicationFlyer";
import HRShortListFlyer from "./HRShortListFlyer";
import JobAcceptingFlyer from "./JobAcceptingFlyer";
import ScheduleInterviewFlyer from "../scheduleInterview/ScheduleInterviewFlyer";
import Cookies from 'js-cookie';


import {
  showSaveEditNoFlyer,
  hideSaveEdit,
  getApplicationsByState,
  hideSaveAlert,
  showHRShortList,
  hrReject,
  hrShortListed,
  offeraccepted,
  hideHRShortListAlert,
  showScheduleInterview,
  saveSchedule,
  showScheduleEdit,
  offeraccept,
  searchFilterApplications
} from "../../actions/home-actions";
import {
  getJobs
} from "../../actions/job-actions";
import {
  getUsers
} from "../../actions/user-action";
import {
  getSpecificPrivilegedUsers
} from "../../actions/userPriviledge-actions";

import {
  getDepartments
} from "../../actions/department-actions";
import {
  updateState,
  getStates
} from "../../actions/state-actions";

import{
  updateState as rollbackStateUpdate
} from "../../actions/preCheck-action";



let stateEnums = [
  {
    label: "Submitted",
    value: "submitted",
    headerName: "Submitted Candidates - Click Precheck to Proceed"
  },
  {
    label: "Prechecked",
    value: "pre-checked",
    headerName: "Prechecked Candidates - Click a Row to Proceed"
  },
  {
    label: "HR Shortlisted",
    value: "hr-short-listed",
    headerName: "HR Shortlisted Candidates - Click a Row to Proceed"
  },
  {
    label: "Line Shortlisted",
    value: "line-short-listed",
    headerName: "Line Shortlisted Candidates - Click a Row to Proceed"
  },
  {
    label: "Interview Scheduled",
    value: "interview-scheduled",
    headerName: "Interview Scheduled Candidates - Click a Row to Proceed"
  },
  {
    label: "Interviewed",
    value: "interviewed",
    headerName: "Interviewed Candidates - Click a Row to Proceed"
  },
  {
    label: "Selected",
    value: "selected",
    headerName: "Selected Candidates - Click a Row to Proceed"
  },
  {
    label: "Offer Accepted",
    value: "offer-accepted",
    headerName: "Offer Accepted Candidates - Click a Row to Proceed"
  },
  {
    label: "OnHold",
    value: "on-hold",
    headerName: "OnHold Candidates - Click a Row to Proceed"
  },
  {
    label: "Precheck Rejected",
    value: "pre-check-rejected",
    headerName: "Precheck Rejected Candidates - Click a Row to Proceed"
  },
  {
    label: "HR Rejected",
    value: "hr-rejected",
    headerName: "HR Rejected Candidates - Click a Row to Proceed"
  },
  {
    label: "Line Rejected",
    value: "line-rejected",
    headerName: "Line Rejected Candidates - Click a Row to Proceed"
  },
  {
    label: "Interview Rejected",
    value: "interview-rejected",
    headerName: "Interview Rejected Candidates - Click a Row to Proceed"
  },
  {
    label: "Phone Rejected",
    value: "phone-rejected",
    headerName: "Phone Rejected Candidates - Click a Row to Proceed"
  },
  {
    label: "Offer Rejected",
    value: "offer-rejected",
    headerName: "Offer Rejected Candidates - Click a Row to Proceed"
  },
  {
    label: "Withdrawn",
    value: "withdrawn",
    headerName: "Withdrawn Candidates - Click a Row to Proceed"
  },
  {
    label: "No Show",
    value: "no-show",
    headerName: "Candidates Didn't Showup"
  },
  {
    label: "Blacklisted",
    value: "blacklisted",
    headerName: "Blacklisted Candidates"
  }
];

class ApplicationPage extends Component {
  getInitialStates = () => {
    let states = {
      selectedState: "submitted",
      headerName: "Submitted Candidates - Click Precheck to Proceed",
      selectedPosition: "0",
      selectedDepartment: "0",
      searchApplication: ""
    };
    return Object.assign({}, states);
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
    this.searchKeyHandler = this.searchKeyHandler.bind(this)
  
  }

  componentDidMount() {
    this.props.getApplicationsByState(this.state.selectedState);
    this.props.getJobs();
    this.props.getDepartments();
   // console.log(isacceptVisible);

  }

  searchKeyHandler(event) {
    // this.setState({
    //   searchApplication: event.target.value
    // });
    let eventVal = event.target.value;
    let applicationCopy = this.props.applications
    // let sName = toString(this.state.searchApplication);
    // console.log(event.target.value);
    // console.log(this.props.searchApplication);
    if(!eventVal){
      //do not call the action
      this.props.getApplicationsByState(this.state.selectedState);
      console.log('Nothing to search')
    }else{
      //call the action
      this.props.searchFilterApplications(applicationCopy, eventVal)
      // console.log(applicationCopy);

   
    }
  

  }


  generateDepartmentDropDown(state) {
    if (!((state == "submitted") || (state == "pre-checked") || (state == "hr-rejected") || (state == "pre-check-rejected") || (state == "hr-short-listed"))) {
      return (
        
      <Column >
        <Label text="Department" />
        <DropDown
          dropId="department-dropdown"
          value={this.state.selectedDepartment}
          options={this.props.departmentDropDown.concat([{"label":"All","value":"0"}]) }
          placeholder="select department"
          onChange={selection => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.selectedDepartment = selection;
            this.setState(stateCopy);
          }}
        />
      </Column>);
    }
    return
  }

  render() {
    return (
      <div>
        <Section sectionSpacing={true}>
          <Column size="full">
            <LayoutHandler childrenSpaceLevel="one">
              <Container>
                <Section>
                  <Column>
                    <Label text="State" />
                    <DropDown
                      dropId="state-dropdown"
                      options={stateEnums}
                      value={this.state.selectedState}
                      isSearchable={false}
                      placeholder="select state"
                      onChange={selection => {
                        let stateCopy = Object.assign({}, this.state);
                        stateCopy.selectedState = selection;
                        stateCopy.headerName = stateEnums.find(
                          stateName => stateName.value == selection
                        ).headerName;
                        this.props.getApplicationsByState(selection);
                        this.setState(stateCopy);
                      }}
                    />
                  </Column>
                  <Column >
                    <Label text="Position" />
                    <DropDown
                      dropId="position-dropdown"
                      value={this.state.selectedPosition}
                      options={this.props.jobs.concat([{"label":"All","value":"0"}])}
                      placeholder="select position"
                      isSearchable={false}
                      onChange={selection => {
                        let stateCopy = Object.assign({}, this.state);
                        stateCopy.selectedPosition = selection;
                        this.setState(stateCopy);
                      }}
                    />
                  </Column>
                  {this.generateDepartmentDropDown(this.state.selectedState)}
                  <Column>
                      <Label text = "Search"/>
                      <Input placeholder = "Search Application"
                             id = "search"
                            //  value = {this.state.searchApplication}
                             onChange = {this.searchKeyHandler}/>
                  </Column>
                </Section>
              </Container>
            </LayoutHandler>
            <Column size={"full"}>
              <h2>{this.state.headerName}</h2>
            </Column>
          </Column>
        </Section>
        <ApplicationTable
          contents={
            this.state.selectedPosition === "" || this.state.selectedPosition === "0"
              ? this.props.applications.filter(application => {
                if (this.state.selectedDepartment === "" || this.state.selectedDepartment === "0") {
                  return application;
                } else {
                  if ((application.department != null) && (application.department.id === this.state.selectedDepartment)) {
                    return application;
                  }
                }
              })
              : this.props.applications.filter(application => {
                if (application.positionByPositionId.id === this.state.selectedPosition) {
                  if (this.state.selectedDepartment === "" || this.state.selectedDepartment === "0") {
                    return application;
                  } else {
                    if ((application.department != null) && (application.department.id === this.state.selectedDepartment)) {
                      return application;
                    }
                  }
                }
              })
          }
          isEditVisible={this.props.isEditVisible}
          isacceptVisible={this.props.isacceptVisible}
          makeacceptVisible = {this.props.makeacceptVisible}
          makeEditVisible={this.props.makeEditVisible}
          isvisiblecols={true}
          makeHRShortListVisible={this.props.makeHRShortListVisible}
          selectedState={this.state.selectedState}
          getSpecificPrivilegedUsers={this.props.getSpecificPrivilegedUsers}
          makeScheduleInterviewVisible={this.props.showScheduleInterview}
          makeScheduleEditVisible={this.props.makeScheduleEditVisible}
        />
        <ApplicationFlyer
          isEditVisible={this.props.isEditVisible}
          hideSaveEdit={this.props.hideSaveEdit}
          savealertVisible={this.props.savealertVisible}
          currentEdit={this.props.currentEdit}
          hideSaveAlert={this.props.hideSaveAlert}
          alertType={this.props.alertType}
          alertMsg={this.props.alertMsg}
        />
        <JobAcceptingFlyer
         //isEditVisible={this.props.isEditVisible}
         isacceptVisible={this.props.isacceptVisible}

          hideSaveEdit={this.props.hideSaveEdit}
          savealertVisible={this.props.savealertVisible}
          currentEdit={this.props.currentEdit}
          hideSaveAlert={this.props.hideSaveAlert}
          alertType={this.props.alertType}
          alertMsg={this.props.alertMsg}
          offeraccepted = {this.props.offeraccepted}
        />
        <HRShortListFlyer
          isHRShortListVisible={this.props.isHRShortListVisible}
          id={this.props.currentEdit.id}
          application={this.props.currentEdit}
          hideSaveEdit={this.props.hideSaveEdit}
          hrReject={this.props.hrReject}
          hrShortListed={this.props.hrShortListed}
          alertType={this.props.hrShortListAlertType}
          alertMsg={this.props.hrShortListAlertMsg}
          alertVisible={this.props.hrShortListAlertVisible}
          hideAlert={this.props.hideHRShortListAlert}
          currentEdit={this.props.currentEdit}
          shortListers={this.props.privilegedUsers}
          allDepartments={this.props.allDepartments}
          updateState={this.props.updateState}
          rollbackStateUpdate = {this.props.rollbackStateUpdate}
        />

        <ScheduleInterviewFlyer
          getStates = {this.props.getStates}
          hideSideBar={this.props.hideSaveEdit}
          isScheduleInterviewVisible={this.props.isScheduleInterviewVisible}
          application={this.props.currentEdit}
          alertType={this.props.scheduleAlertType}
          alertMsg={this.props.scheduleAlertMsg}
          alertVisible={this.props.scheduleAlertVisible}
          hideAlert={this.props.hideHRShortListAlert}
          currentEdit={this.props.currentEdit}
          interviewers={this.props.privilegedUsers}
          saveSchedule={this.props.saveSchedule}
          updateState={this.props.updateState}
          rollbackStateUpdate = {this.props.rollbackStateUpdate}
          userId={JSON.parse(Cookies.get("authUser")).id}
          isEdit={this.props.isScheduleEdit}
          currentSchedule={this.props.currentSchedule}
          loaderEnable={this.props.loaderEnable}
          isInterviewed={this.props.isInterviewed}
          feedbackProfiles={this.props.profiles.map(profile=>{
            return{ label: profile.name, value: profile.id };
          })
        }
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let modifiedSchedule = state.home.currentSchedule;
  modifiedSchedule.building = state.home.currentSchedule.venue
    ? state.home.currentSchedule.venue.substr(
      0,
      modifiedSchedule.venue.indexOf("-")
    )
    : "";
  modifiedSchedule.floor = state.home.currentSchedule.venue
    ? state.home.currentSchedule.venue.substr(
      state.home.currentSchedule.venue.indexOf("-"),
      state.home.currentSchedule.venue.length - 1
    )
    : "";
    modifiedSchedule.date = state.home.currentSchedule.date
    ? state.home.currentSchedule.date : state.home.currentSchedule.time.substr(0,10);

    modifiedSchedule.time = state.home.currentSchedule.time.length>10
    ? state.home.currentSchedule.time.substr(11,5): state.home.currentSchedule.time;
    modifiedSchedule.panel = state.home.currentSchedule.pannelsById
    ?state.home.currentSchedule.pannelsById.map(panel => {
      return { label: panel.userByUserId.firstName + " " + panel.userByUserId.lastName, 
      value: panel.userByUserId.id };
    })
    :state.home.currentSchedule.panel;
    modifiedSchedule.interviewForm = state.home.currentSchedule.interviewFormsById
    ?state.home.currentSchedule.interviewFormsById.map(profile => {
      return { label: profile.profileByProfileId.name, 
      value: profile.profileByProfileId.id };
    })
    :state.home.currentSchedule.panel;
    modifiedSchedule.comment = state.home.currentSchedule.comment
    ?state.home.currentSchedule.comment:state.home.currentSchedule.finalRating;
  return {
    applications: state.home.allApplications.map(application => {
      application.submittedDate = application.createdTime.substr(0, 10);
      return application;
    }),
    isEditVisible: state.home.isEditVisible,
    isacceptVisible: state.home.isacceptVisible,
    savealertVisible: state.home.savealertVisible,
    hrShortListAlertVisible: state.home.hrShortListAlertVisible,
    currentEdit: state.home.currentEdit,
    gettingJobs: state.home.getting,
    alertMsg: state.home.alertMsg,
    alertType: state.home.alertType,
    hrShortListAlertType: state.home.hrShortListAlertType,
    hrShortListAlertMsg: state.home.hrShortListAlertMsg,
    jobs: state.job.allJobs.map(job => {
      return { label: job.name, value: job.id };
    }),
    isHRShortListVisible: state.home.isHRShortListVisible,
    privilegedUsers: state.privilege.privilegedUsers.map(user => {
      return { label: user.firstName + " " + user.lastName, value: user.id };
    }),
    isScheduleInterviewVisible: state.home.isScheduleInterviewVisible,
    scheduleAlertVisible: state.home.scheduleAlertVisible,
    scheduleAlertType: state.home.scheduleAlertType,
    scheduleAlertMsg: state.home.scheduleAlertMsg,
    isInterviewed:state.home.isInterviewed,
    departmentDropDown:state.department.allDepartments.map(department => {
      return { label: department.name, value: department.id }
    }),
    allDepartments: state.department.allDepartments.map(department => {
      department.isCheckBoxSelect = false;
      department.dropDownValue = "";
      department.shortListerError = false;
      return department;
    }),
    isScheduleEdit: state.home.isScheduleEdit,
    currentSchedule: modifiedSchedule,
    loaderEnable: state.home.getting,
    profiles:state.home.allProfiles
  };
};
const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      getApplicationsByState: getApplicationsByState,
      makeEditVisible: showSaveEditNoFlyer,
      makeacceptVisible: offeraccept,
      hideSaveEdit: hideSaveEdit,
      hideSaveAlert: hideSaveAlert,
      hideHRShortListAlert: hideHRShortListAlert,
      getJobs: getJobs,
      makeHRShortListVisible: showHRShortList,
      getUsers: getUsers,
      getSpecificPrivilegedUsers: getSpecificPrivilegedUsers,
      hrReject: hrReject,
      hrShortListed: hrShortListed,
      offeraccepted:offeraccepted,
      showScheduleInterview: showScheduleInterview,
      saveSchedule: saveSchedule,
      getDepartments: getDepartments,
      makeScheduleEditVisible: showScheduleEdit,
      updateState:updateState,
      rollbackStateUpdate:rollbackStateUpdate,
      searchFilterApplications:searchFilterApplications,
      getStates:getStates
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ApplicationPage);
