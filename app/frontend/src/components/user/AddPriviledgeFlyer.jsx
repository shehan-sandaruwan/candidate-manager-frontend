import React, { Component } from "react";
import {
    AlertBar,
    ActionPanel,
    ButtonPanel,
    DropDown,
    Checkbox,
    Label
} from "@trycake/glaze-ui";
import {
    Column,
    Section,
    Separator
} from "@trycake/glaze-ui/dist/components/Layout";

export default class AddPriviledgeFlyer extends Component {
    getInitialStates = () => {
        var states = {
            privilege: {
                id: "",
                name: "",
                position: "",
                positionByPositionId: {},
                canShortList: false,
                canInterview: false,
                isAdmin: false,
                isSuperAdmin: false,
                userByUserId: {}
            },
            errors: {
                name: false,
                position: false
            },
            errorMessages: {
                name: null,
                position: null
            }
        };
        return Object.assign({}, states);
    };
    constructor(props) {
        super(props);
        this.state = this.getInitialStates();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isEdit) {
            var stateCopy = this.getInitialStates();
            stateCopy.privilege.name = nextProps.currentEdit.name;
            stateCopy.privilege.id = nextProps.currentEdit.id;
            stateCopy.privilege.position = nextProps.currentEdit.position;
            stateCopy.privilege.canShortList = nextProps.currentEdit.canShortList === "Yes" ? true
                : false;
            stateCopy.privilege.canInterview = nextProps.currentEdit.canInterview === "Yes" ? true
                : false;
            stateCopy.privilege.userByUserId.id = nextProps.currentEdit.userId ?
                nextProps.currentEdit.userId : 0;
            stateCopy.privilege.positionByPositionId.id = nextProps.currentEdit.positionId ?
                nextProps.currentEdit.positionId : 0;
            this.setState(stateCopy);
        } else {
            stateCopy = this.getInitialStates();
            this.setState(stateCopy);
        }
    }

    render() {
        const content = (
            <Section>
                <Column size={"full"}>
                    <Label text="Name" />
                    <DropDown
                        dropId="name-drop"
                        placeholder={this.state.privilege.name ? this.state.privilege.name : "Select User"}
                        options={this.props.users.map((user) => { return { label: user.firstName + " " + user.lastName, value: user.id } })}
                        value={this.state.privilege.userByUserId.id}
                        isDisabled={this.props.isEdit}
                        isError={this.state.errors.name}
                        onBlurResetsInput={true}
                        onChange={selection => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.privilege.userByUserId.id = selection;
                            stateCopy.privilege.userByUserId.firstName = this.props.users.find((user) => user.id == selection).firstName
                            stateCopy.privilege.userByUserId.lastName = this.props.users.find((user) => user.id == selection).lastName
                            stateCopy.errors.position = false;
                            this.setState(stateCopy);
                        }}
                    />
                </Column>
                <Separator size={"thin"} />
                <Column size={"full"}>
                    <Label text="Position" />
                    <DropDown
                        dropId="position-drop"
                        placeholder={this.state.privilege.position ? this.state.privilege.position : "Select Position"}
                        options={this.props.positions.map((job) => { return { label: job.name, value: job.id } })}
                        value={this.state.privilege.positionByPositionId.id}
                        isError={this.state.errors.position}
                        isDisabled={this.props.isEdit}
                        onBlurResetsInput={true}
                        onChange={selection => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.privilege.positionByPositionId.id = selection;
                            stateCopy.privilege.positionByPositionId.name = this.props.positions.find((position) => position.id == selection).name;
                            stateCopy.errors.position = false;
                            this.setState(stateCopy);
                        }}
                    />
                </Column>
                <Column size={"full"}>
                    <Label text="Priviledges" />
                    <Checkbox
                        id={"canShortList"}
                        label={"Shortlist"}
                        isChecked={this.state.privilege.canShortList}
                        onClick={({ target: { checked } }) => {
                            let stateCopy = Object.assign({}, this.state);
                            if (checked) {
                                stateCopy.privilege.canShortList = true;
                            } else {
                                stateCopy.privilege.canShortList = false;
                            }
                            this.setState(stateCopy);
                        }}
                    />
                    <Checkbox
                        id={"canInterview"}
                        label={"Interview"}
                        isChecked={this.state.privilege.canInterview}
                        onClick={({ target: { checked } }) => {
                            let stateCopy = Object.assign({}, this.state);
                            if (checked) {
                                stateCopy.privilege.canInterview = true;
                            } else {
                                stateCopy.privilege.canInterview = false;
                            }
                            this.setState(stateCopy);
                        }}
                    />
                </Column>
            </Section>
        );
        return (
            <div>
                <ActionPanel
                    isVisible={this.props.isPrivilegeEditVisible}
                    onClickOutside={() => {
                        this.props.hidePrivilegeEdit();
                    }}
                    contents={content}
                    header="Add or Change User Priviledges"
                    footer={
                        <div>
                            <AlertBar
                                isDismissible={true}
                                type={this.props.alertType}
                                onDismiss={() => {
                                    this.props.hideSaveAlert();
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
                                        value: "Save",
                                        isDisabled: this.props.isEdit ? false : ((this.state.privilege.userByUserId.id ? false : true) || (this.state.privilege.positionByPositionId.id ? false : true) || (!this.state.privilege.canInterview && !this.state.privilege.canShortList)),
                                        onClick: () => {
                                            if (this.props.isEdit) {
                                                this.props.updatePriviledge(this.state.privilege);
                                            } else {
                                                this.props.savePriviledge(this.state.privilege);
                                            }
                                        }
                                    },
                                    {
                                        type: "negative",
                                        value: "Cancel",
                                        onClick: () => {
                                            this.props.hidePrivilegeEdit();
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
