import React, { Component } from "react";
import {
  ActionPanel,
  ButtonPanel,
  Input,
  DropDown,
  Label,
  AlertBar,
  Loader
} from "@trycake/glaze-ui";
import {
  Column,
  Section,
  Separator
} from "@trycake/glaze-ui/dist/components/Layout";
import Cookies from 'js-cookie';
export default class ScheduleInterviewFlyer extends Component {
  getInitialStates = () => {
    var states = {
      errors: {
        comment: false,
        panel: false,
        time: false,
        type: false,
        interviewForm: false,
      },
      errorMessages: {
        comment: "",
        panel: "",
        type: "",
        interviewForm: "",
        time: "Invalid time format. must be in HH:MM format"
      },
      state: {
        comment: "",
        panel: "",
        building: "DM",
        floor: "",
        time: "",
        date: "",
        type: "tech-1",
        interviewForm: []
      },
      transition: {
        applicationId: this.props.application.id,
        stateName: "",
        isActive: 1,
        comment: "Eligible",
        departments:[]
      },
      feedbackProfiles: [],
      building: [
        { label: "Dharmapala MW Building", value: "DM" },
        { label: "Iceleand Building", value: "IBC" }
      ],
      dmFloors: [
        { label: "Floor-0: ALBA", value: "-0-ALBA" },
        { label: "Floor-0: CERN", value: "-0-CERN" },
        { label: "Floor-1: ARGONNE", value: "-1-ARGONNE" },
        { label: "Floor-2: AMES", value: "-2-AMES" },
        { label: "Floor-3: BROOKHAVEN", value: "-3-BROOKHAVEN" },
        { label: "Floor-4: AUDITORIUM", value: "-4-AUDITORIUM" },
        { label: "Floor-5: FERMILABS", value: "-5-FERMILABS" },
        { label: "Floor-6: SIMULA", value: "-6-SIMULA" }
      ],
      icbFloors: [
        { label: "Floor-5: CAVENDISH", value: "-5-CAVENDISH" },
        { label: "Floor-5: BELL", value: "-5-BELL" },
        { label: "Floor-5: LIGO", value: "-5-LIGO" },
        { label: "Floor-7: BERKERLY", value: "-7-BERKERLY" },
        { label: "Floor-7: DARPA", value: "-7-DARPA" },
        { label: "Floor-8: SANDIA", value: "-8-SANDIA" }
      ],
      scheduleTypes: [
        { label: "Tech 1", value: "tech-1" },
        { label: "Tech 2", value: "tech-2" },
        { label: "Tech 3", value: "tech-3" },
        { label: "HR", value: "hr" },
        { label: "Management", value: "mgt" },
        { label: "General Manager", value: "gm" },
        { label: "Managing Director", value: "md" },
        { label: "Other", value: "other" }
      ]
    };

    return Object.assign({}, states);
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }
  user = JSON.parse(Cookies.get('authUser'));

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEdit) {
      var stateCopy = this.getInitialStates();
      stateCopy.state = nextProps.currentSchedule;
      this.setState(stateCopy);
    } else {
      stateCopy = this.getInitialStates();
      this.setState(stateCopy);
    }
  }

  createButtonPanel(context) {
    if (context.props.isInterviewed) {
      return (<ButtonPanel
        buttonsList={[
          {
            type: "primary",
            value: "View CV",

            onClick: () => {
              window.open(
                "https://drive.google.com/file/d/0BxYUMbIl_5w-UDNhRk9nTWp6TDg/view?usp=sharing",
                "piuymi"
              );
            }
          },
          {
            type: "primary",
            value: "View JD",
            onClick: () => {
              window.open('http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/viewjd/?positionId=' + this.props.currentEdit.positionByPositionId.id);
            }
          },
          {
            type: "primary",
            value: "Select",
            onClick: () => {
              this.state.transition.stateName = "selected";
              this.props.updateState(this.state.transition);
            }
          }
        ]}
      />    
      );
    } else if(this.props.currentSchedule.panel.length == 0) {
      return (<ButtonPanel
        buttonsList={[
          {
            type: "primary",
            value: "View CV",

            onClick: () => {
              window.open(
                "https://drive.google.com/file/d/0BxYUMbIl_5w-UDNhRk9nTWp6TDg/view?usp=sharing",
                "piuymi"
              );
            }
          },
          {
            type: "primary",
            value: "View JOb Desc",
            onClick: () => {
              window.open('http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/viewjd/?positionId=' + this.props.currentEdit.positionByPositionId.id);
            }
          },
          {
            type: "primary",
            value: "Roll Back",
            onClick: () => {
              var obj = {departmentId: 2, shortLister: "1"};
              this.state.transition.applicationId = this.props.application.id;
              this.state.transition.stateName = "hr-short-listed";
              this.state.transition.comment = "line short listed rollback";
              this.state.transition.departments.push(obj);
              console.log("state",this.state.transition);
              this.props.updateState(this.state.transition);
              this.state = this.getInitialStates();   
            }
          }
        ]}
      />
      );
    }
    else{
      return (<ButtonPanel
        buttonsList={[
          {
            type: "primary",
            value: "View CV",

            onClick: () => {
              window.open(
                "https://drive.google.com/file/d/0BxYUMbIl_5w-UDNhRk9nTWp6TDg/view?usp=sharing",
                "piuymi"
              );
            }
          },
          {
            type: "primary",
            value: "View JOb Desc",
            onClick: () => {
              window.open('http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/viewjd/?positionId=' + this.props.currentEdit.positionByPositionId.id);
            }
          }
        ]}
        />
      );
    }
  }

  render() {
    const content = (
      <Section>
        <Column size={"full"}>
        <Label text={this.props.currentEdit.firstName + " " + this.props.currentEdit.lastName} size = "large"></Label>

          {this.createButtonPanel(this)}
        </Column>

        <Separator size={"thin"} />
        <Column>
          <Label text="Type of the Interview" />
          <DropDown
            dropId="typeDropDown"
            options={this.state.scheduleTypes}
            placeholder={this.state.state.type ? this.state.state.type : "Select Interview Type"}
            isError={this.state.errors.type}
            errorMessage={this.state.errorMessages.type}
            value={this.state.state.type}
            onChange={value => {
              this.state.state.type = value;
              this.setState(this.state);
            }}
          />
        </Column>
        <Column>
          <Label text="Create Feedback Form" />
          <DropDown
            dropId="feedbackProfileDropDown"
            options={this.props.feedbackProfiles}
            isMultiSelect={true}
            isDisabled={this.props.isEdit}
            placeholder="Select Profiles"
            isError={this.state.errors.interviewForm}
            errorMessage={this.state.errorMessages.interviewForm}
            value={this.state.state.interviewForm}
            onChange={value => {
              this.state.state.interviewForm = value;
              this.setState(this.state);
            }}
          />
        </Column>

        <Separator size={"thin"} />
        <Column>
          <Label text="Interview Panel" />
          <DropDown
            dropId="panelDropDown"
            options={this.props.interviewers}
            isDisabled={this.props.isEdit}
            isMultiSelect={true}
            placeholder="Select Interviewers"
            isError={this.state.errors.panel}
            errorMessage={this.state.errorMessages.panel}
            value={this.state.state.panel}
            onChange={value => {
              this.state.state.panel = value;
              this.setState(this.state);
            }}
          />
        </Column>

        <Separator size={"thin"} />

        <Column size={"full"}>
          <Label text="Building" />
          <DropDown
            dropId="venueDropDown"
            options={this.state.building}
            placeholder="Select Interview Building"
            value={this.state.state.building}
            onChange={value => {
              this.state.state.building = value;
              this.setState(this.state);
            }}
          />
        </Column>

        <Column size={"full"}>
          <Label text="Floor" />
          <DropDown
            dropId="floorDropDown"
            options={
              this.state.state.building == "DM"
                ? this.state.dmFloors
                : this.state.icbFloors
            }
            placeholder="Please select a building first"
            value={this.state.state.floor}
            onChange={value => {
              this.state.state.floor = value;
              this.setState(this.state);
            }}
          />
        </Column>

        <Separator size={"thin"} />

        <Column size={"full"}>
          <Label text="Date of Interview" />
          <Input
            type={"date"}
            maxLength={10}
            id={"dob"}
            iconType="icodate"
            value={this.state.state.date}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.state.date = value;
              this.setState(stateCopy);
            }}
          />
        </Column>

        <Column size={"full"}>
          <Label text="Time of Interview" />
          <Input
            placeholder="HH:MM format"
            id={"time"}
            value={this.state.state.time}
            isError={this.state.errors.time}
            errorMessage={this.state.errorMessages.time}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              if (this.validateTime(value)) {
                stateCopy.errors.time = false;
              } else {
                stateCopy.errors.time = true;
              }
              stateCopy.state.time = value;
              this.setState(stateCopy);
            }}
          />
        </Column>

        <Separator size={"thin"} />

        <Column size={"full"}>
          <Label text="Comment" />
          <Input
            placeholder="Comment"
            id={"comment"}
            value={this.state.state.comment}
            isError={this.state.errors.comment}
            errorMessage={this.state.errorMessages.comment}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              if (value.length < 255) {
                stateCopy.errors.comment = false;
              } else {
                stateCopy.errors.comment = true;
                stateCopy.errorMessages.comment =
                  "comment must be lower than 255 characters long";
              }
              stateCopy.state.comment = value;
              this.setState(stateCopy);
            }}
          />
        </Column>
      </Section>
    );

    return (
      <div>
        <ActionPanel
          isVisible={this.props.isScheduleInterviewVisible}
          isActionsBlocked={this.props.loaderEnable}
          onClickOutside={() => {
            this.props.hideSideBar();
            this.state = this.getInitialStates();
          }}
          contents={<div>{content}<Loader isVisible={this.props.loaderEnable}
            isActionsBlocked={this.props.loaderEnable} /></div>}
          header="Interview Scheduling"
          footer={
            <div>
              <ButtonPanel
                buttonsList={[
                  {
                    type: "primary",
                    value: "Proceed",
                    onClick: () => {
                      let schedule = Object.assign({}, this.state.state);
                      schedule.applicationByApplicationId = {
                        id: this.props.currentEdit.id
                      };
                      let pannel = [];
                      console.log("hello",this.state.state.panel);
                      this.state.state.panel.split(",").map(id => {
                        pannel.push({ userByUserId: { id: parseInt(id) } });
                      });
                      schedule.userId = this.props.userId;
                      schedule.pannelsById = pannel;
                      schedule.description =
                        this.state.state.comment == ""
                          ? "no-comments"
                          : this.state.state.comment;
                      schedule.finalRating = "pending";
                      schedule.venue =
                        this.state.state.building + this.state.state.floor;
                      let dateTime =
                        this.state.state.date +
                        " " +
                        this.state.state.time +
                        ":00+0000";
                      schedule.time = new Date(Date.parse(dateTime)).getTime();
                      let selectedProfiles = [];
                      this.state.state.interviewForm.split(",").map(id => {
                        selectedProfiles.push({ profileByProfileId: { id: parseInt(id) } });
                      });
                      schedule.interviewFormsById = selectedProfiles;

                      this.props.saveSchedule(schedule);
                    }
                  }
                ]}
              />
              <AlertBar
                isDismissible={true}
                type={this.props.alertType}
                onDismiss={() => {
                  this.props.hideSideBar();
                  this.state = this.getInitialStates();
                }}
                message={{
                  header: this.props.alertMsg
                }}
                isVisible={this.props.alertVisible}
              />
            </div>
          }
        />
      </div>
    );
  }

  validateTime = time => {
    var re = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return re.test(String(time));
  };
}