import React, { Component } from "react";
import {
    AlertBar,
    ActionPanel,
    ButtonPanel,
    DropDown,
    TextArea,
    Label
} from "@trycake/glaze-ui";
import {
    Column,
    Section,
    Separator

} from "@trycake/glaze-ui/dist/components/Layout";
import Cookies from 'js-cookie';


let stateEnums = [
    {
        label: "Interviewed",
        value: "interviewed",
        headerName: "Interviewed Candidates - Click a Row to Proceed"
    },
    {
        label: "OnHold",
        value: "on-hold",
        headerName: "OnHold Candidates - Click a Row to Proceed"
    },
    {
        label: "No Show",
        value: "no-show",
        headerName: "Candidates Didn't Showup"
    },
    {
        label: "Blacklist",
        value: "blacklisted",
        headerName: "Blacklisted Candidates"
    }
];


export default class InterviewFeedbackFlyer extends Component {
    getInitialStates = () => {
        var states = {
            errors: {
                finalRating: false,
            },
            errorMessages: {
                finalRating: "",
            },
            schedule: {
                nextState: "interviewed",
                finalRating: ""
            },
            transition: {
                applicationId:"",
                stateName: "",
                isActive: 1,
                comment: "Eligible",
                departments:[]
              }
        }
        return Object.assign({}, states);
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialStates();
    }

    componentWillReceiveProps(nextProps) {
        var stateCopy = Object.assign({}, this.state);
        stateCopy.schedule = nextProps.currentEdit;
        this.setState(stateCopy);
    }
    
    feedBackNotGiven(){
        if(this.state.schedule.nextState == "no-show" || this.state.schedule.nextState == "blacklisted"){
            return false;
        }
        else{
            return Cookies.get('feed-back-given' )!= 'done'
        }
    }

    render() {
        let user = JSON.parse(Cookies.get('authUser'));
        const content = (
            <Section>
                <Column size={"full"}>
                    <ButtonPanel
                        buttonsList={[

                            {
                                type: "primary",
                                value: "View CV",

                                onClick: () => {
                                    window.open('https://drive.google.com/file/d/0BxYUMbIl_5w-UDNhRk9nTWp6TDg/view?usp=sharing', "piuymi");
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
                                value: "Open Feedback",
                                onClick: () => {
                                    Cookies.set('schedule',JSON.stringify(this.state.schedule));
                                    window.open('http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/interviewForm');
                                }
                            }
                        ]}
                    />
                </Column>
                <Separator size={"thin"} />
                <Column>
                    <Label text="Comment" />
                    <Column>
                        <TextArea
                            id={"finalRating"}

                            onBlurResetsInput={true}
                            isError={this.state.errors.finalRating}
                            errorMessage={this.state.errorMessages.finalRating}
                            onChange={({ target: { value } }) => {
                                let stateCopy = Object.assign({}, this.state);
                                stateCopy.schedule.finalRating = value;
                                if (value.length > 1 && value.length < 255) {
                                    stateCopy.errors.finalRating = false;
                                } else {
                                    stateCopy.errors.finalRating = true;
                                    stateCopy.errorMessages.finalRating =
                                        "Comment should be between 2 to 255 charactors long";
                                }
                                this.setState(stateCopy);
                            }}
                        />
                    </Column>
                </Column>
                <Separator size={"thin"} />
                <Column size={"full"}>
                    <Label text="Proceed with Further Actions" />
                    <DropDown
                        dropId="stateSelect-drop"
                        options={stateEnums}
                        placeholder={this.state.schedule.nextState ? this.state.schedule.nextState : "No states available"}
                        value={this.state.schedule.nextState ? this.state.schedule.nextState : "interviewed"}
                        onBlurResetsInput={true}
                        onChange={selection => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.schedule.nextState = selection;
                            this.setState(stateCopy);
                        }}
                    />
                    <Label isVisible={this.state.schedule.nextState != "no-show" && this.state.schedule.nextState != "blacklisted"} text= "you should submit feedback form to reject, pass, on-hold" />
                </Column>
            </Section>
        );
        function findElement(arr, propName, propValue) {
            console.log("function")
            let scheduleAvailable = false
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][propName] === propValue) {
                    scheduleAvailable = true;
                }
            }
            return scheduleAvailable
        }
        async function checkAndSave(context) {
            if (!context.state.schedule.nextState) {
                let stateCopy = Object.assign({}, context.state);
                stateCopy.schedule.nextState = "interviewed"
                context.setState(stateCopy);
            }
      
            await context.props.getScheduledInterviews(user.id);
            
            if (findElement(context.props.interviews, 'id', context.state.schedule.id)) {
                context.props.saveFeedback(context.state.schedule);
            } else {
                context.props.showAlert("error","Not Available");
            }
        }
        return (
            <div>
                <ActionPanel
                    isVisible={this.props.isEditVisible}
                    onClickOutside={() => {
                        this.state = this.getInitialStates();
                        this.props.hideSaveEdit();
                    }}
                    contents={content}
                    header="Interview Feedback"
                    footer={
                        <div>
                            <AlertBar
                                isDismissible={true}
                                type={this.props.alertType}
                                onDismiss={() => {
                                    this.props.hideAlert();
                                }}
                                message={{
                                    header: this.props.alertMsg
                                }}
                                isVisible={this.props.savealertVisible}
                            />
                            <ButtonPanel
                                buttonsList={[
                                    {
                                        type: "primary",
                                        value: "Proceed",
                                        isDisabled: ((this.state.schedule.finalRating === "pending") || this.state.schedule.finalRating === ""
                                            || this.state.errors.finalRating || this.feedBackNotGiven()),
                                        onClick: () => {
                                            if(this.state.schedule.nextState === "on-hold"){
                                                console.log("id",this.props);
                                                this.state.transition.applicationId = this.props.currentEdit.applicationByApplicationId.id;
                                                this.state.transition.stateName = "pre-checked";
                                                this.state.transition.isActive =1;
                                                this.state.transition.comment = "on hold candidate"
                                                this.props.rollbackStateUpdate(this.state.transition);

                                            }
                                            else{
                                                checkAndSave(this);
                                                Cookies.set('feed-back-given','');
                                            }
                                            
                                        }
                                    },
                                    {
                                        type: "negative",
                                        value: "Reject",
                                        isDisabled: ((this.state.errors.finalRating) ||
                                            (this.state.schedule.finalRating === 'pending') || (this.state.schedule.finalRating === '') || Cookies.get('feed-back-given')!='done'),
                                        onClick: () => {
                                            let stateCopy = Object.assign({}, this.state);
                                            stateCopy.schedule.nextState = "interview-rejected"
                                            this.setState(stateCopy);
                                            this.props.saveFeedback(this.state.schedule);
                                            Cookies.set('feed-back-given','');
                                        }
                                    }

                                ]}
                            />
                        </div>
                    }
                />
            </div>
        );
    }
}
