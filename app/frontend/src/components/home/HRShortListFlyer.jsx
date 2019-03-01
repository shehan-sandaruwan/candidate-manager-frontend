import React, { Component } from "react";
import {
    AlertBar,
    ActionPanel,
    ButtonPanel,
    Checkbox,
    Input,
    DropDown,
    Label,
} from "@trycake/glaze-ui";
import {
    Column,
    Section,
    Separator

} from "@trycake/glaze-ui/dist/components/Layout";
import Cookies from 'js-cookie'; 
export default class HRShortListFlyer extends Component {
    getInitialStates = () => {
        var states = {
            errors: {
                comment: false,
                hasErrorInPage:true
            },
            errorMessages: {
                comment: "",
                shortLister: "",
            },
            state: {
                stateName: "pre-checked",
                isActive: 1,
                comment: "",
                applicationId: "",
                departments: []
            },
            departments: []

        }

        return Object.assign({}, states);
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialStates();
    }

    componentDidMount() {
        this.state = this.getInitialStates();
        var stateCopy = this.getInitialStates();
        stateCopy.departments = this.props.allDepartments;
        this.setState(stateCopy);
    }

    componentWillReceiveProps(nextProps) {
        var stateCopy = this.getInitialStates();
        stateCopy.departments = this.props.allDepartments;
        this.setState(stateCopy);
    }

    user = JSON.parse(Cookies.get('authUser'));
    createDepartmentCheckboxes(state) {
        return state.departments.map(department => {
            var departmentIndex = state.departments.indexOf(department);
            console.log(state.departments[department.id -1]);
            return (
                <Column>
                    <Checkbox
                        id={department.name}
                        label={department.name}
                        isChecked={this.state.departments[departmentIndex].isCheckBoxSelect}
                        onClick={({ target: { checked } }) => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.errors.hasErrorInPage = false;
                            if (checked) {
                                stateCopy.departments[departmentIndex].isCheckBoxSelect = true;
                            } else {
                                stateCopy.departments[departmentIndex].dropDownValue = "";
                                stateCopy.departments[departmentIndex].isCheckBoxSelect = false;
                            }
                            this.setState(stateCopy);
                        }}
                    />
                    <DropDown
                        dropId={department.name}
                        options={this.props.shortListers}
                        isDisabled={!(this.state.departments[departmentIndex].isCheckBoxSelect)}
                        placeholder="Select line shortlisters"
                        isError={this.state.departments[departmentIndex].shortListerError}
                        errorMessage={this.state.errorMessages.shortLister}
                        value={
                            this.state.departments[departmentIndex].isCheckBoxSelect ?
                                this.state.departments[departmentIndex].dropDownValue : ""
                        }
                        onChange={selection => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.departments[departmentIndex].dropDownValue = selection.toString();
                            stateCopy.departments[departmentIndex].shortListerError = false;
                            stateCopy.errorMessages.shortLister = "";
                            stateCopy.errors.hasErrorInPage = false;
                            this.setState(stateCopy);
                        }}
                    />
                </Column>
            );
        });
    }

    render() {
        const content = (
            <Section>
                <Label text={this.props.currentEdit.firstName + " " + this.props.currentEdit.lastName} size = "large"></Label>
                <Column size={"full"}>

                    <ButtonPanel
                        buttonsList={[
                            {
                                type: "primary",
                                value: "View CV",

                                onClick: () => {
                                    window.open('https://s3.amazonaws.com/devtest-cvmanager-bucket/cv' + this.props.currentEdit.nic, "piuymi");
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
                                value: "Roll Back",
                                //isDisabled: (this.state.errors.comment) || (this.state.state.comment == ""),
                                onClick: () => {
                                    console.log("hey");
                                    let stateCopy = Object.assign({}, this.state);
                                    console.log("hey",stateCopy);
                                    stateCopy.state.stateName = "pre-checked"; // look at the whole process if you want change this part . 
                                    stateCopy.state.applicationId = this.props.id;
                                    stateCopy.state.isActive = 2;
                                    stateCopy.state.comment = "roll backed from Hr-shortlisted"
                                    console.log("state",stateCopy)
                                    //this.props.rollbackStateUpdate(stateCopy.state);
                    }
                            }
                        ]}
                    />
                </Column>
                <Separator size={"thin"} />
                <Column>
                    <Label text="Departments" />
                    {this.createDepartmentCheckboxes(this.state)}
                </Column>
                <Separator size={"thin"} />
                <Column size={"full"}>
                    <Label text="Comment" />
                    <Input
                        placeholder="This is mandatory if you are rejecting"
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
                                stateCopy.errorMessages.comment = "comment must be lower than 255 characters long";
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
                    isVisible={this.props.isHRShortListVisible}
                    onClickOutside={() => {
                        this.props.hideSaveEdit();
                        this.state = this.getInitialStates();

                    }}
                    contents={content}
                    header="HR Short Listing" 
                    footer={
                        <div>
                            <AlertBar
                                isDismissible={true}
                                type={this.props.alertType}
                                onDismiss={() => {
                                    this.props.hideAlert();
                                    this.state = this.getInitialStates();
                                }}
                                message={{
                                    header: this.props.alertMsg
                                }}
                                isVisible={this.props.alertVisible}
                            />
                            <ButtonPanel
                                buttonsList={[
                                    {
                                        type: "primary",
                                        value: "Proceed",
                                        isDisabled: (this.state.errors.hasErrorInPage),
                                        onClick: () => {
                                            let stateCopy = Object.assign({}, this.state);
                                            stateCopy.state.applicationId = this.props.id;
                                            stateCopy.state.stateName = "hr-short-listed";
                                            for (var count = 0; count < this.state.departments.length; count++) {
                                                if (stateCopy.departments[count].isCheckBoxSelect == true) {
                                                    if (stateCopy.departments[count].dropDownValue == "") {
                                                        stateCopy.departments[count].shortListerError = true;
                                                        stateCopy.errors.hasErrorInPage = true;
                                                        stateCopy.errorMessages.shortLister = "Please select a shortlister";
                                                    } else {
                                                        let selectedDepartment = new Object();
                                                        stateCopy.errors.hasErrorInPage = false;
                                                        selectedDepartment.departmentId = stateCopy.departments[count].id;
                                                        selectedDepartment.shortLister = stateCopy.departments[count].dropDownValue;
                                                        stateCopy.state.departments.push(selectedDepartment);
                                                    }
                                                }   
                                            }
                                            if (stateCopy.state.comment == "" && (!stateCopy.errors.hasErrorInPage)) {
                                                stateCopy.state.comment = "HR Shortlisted";
                                            }
                                            this.setState(stateCopy);
                                            if (!stateCopy.errors.hasErrorInPage) {
                                                this.props.hrShortListed(stateCopy.state);
                                            }
                                        }
                                    },
                                    {
                                        type: "negative",
                                        value: "Reject",
                                        isDisabled: (this.state.errors.comment) || (this.state.state.comment == ""),
                                        onClick: () => {
                                            let stateCopy = Object.assign({}, this.state);
                                            stateCopy.state.applicationId = this.props.id
                                            stateCopy.state.stateName = "hr-rejected"
                                            this.setState(stateCopy);
                                            this.props.hrReject(stateCopy.state);
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
