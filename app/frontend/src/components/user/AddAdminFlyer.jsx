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

export default class AddAdminFlyer extends Component {
    getInitialStates = () => {
        var states = {
            admin: {
                id: "",
                name: "",
                isAdmin: false,
                isSuperAdmin: false,
                userByUserId: {}
            },
            errors: {
                name: false,
            },
            errorMessages: {
                name: null

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
            stateCopy.admin.name = nextProps.currentEdit.name;
            stateCopy.admin.id = nextProps.currentEdit.id;
            stateCopy.admin.isAdmin = (nextProps.currentEdit.isAdmin === "Yes"||nextProps.currentEdit.isAdmin ===1) ? true
                : false;
            stateCopy.admin.isSuperAdmin = (nextProps.currentEdit.isSuperAdmin === "Yes"||nextProps.currentEdit.isSuperAdmin ===1) ? true
                : false;
            stateCopy.admin.userByUserId.id = nextProps.currentEdit.userId ?
                nextProps.currentEdit.userId : 0;
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
                        placeholder={this.state.admin.name ? this.state.admin.name : "Select User"}
                        options={this.props.users.map((user) => { return { label: user.firstName + " " + user.lastName, value: user.id } })}
                        value={toString(this.state.admin.userByUserId.id)}
                        isDisabled={this.props.isEdit}
                        onBlurResetsInput={true}
                        onChange={selection => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.admin.userByUserId.id = selection;
                            stateCopy.admin.userByUserId.firstName = this.props.users.find((user) => user.id == selection).firstName
                            stateCopy.admin.userByUserId.lastName = this.props.users.find((user) => user.id == selection).lastName
                            this.setState(stateCopy);
                        }}
                    />
                </Column>
                <Separator size={"thin"} />
                <Column size={"full"}>
                    <Label text="Priviledges" />

                    <Checkbox
                        id={"isAdmin"}
                        label={"Admin"}
                        isChecked={this.state.admin.isAdmin}
                        onClick={({ target: { checked } }) => {
                            let stateCopy = Object.assign({}, this.state);
                            if (checked) {
                                stateCopy.admin.isAdmin = true;
                            } else {
                                stateCopy.admin.isAdmin = false;
                            }
                            this.setState(stateCopy);
                        }}
                    />
                    <Checkbox
                        id={"isSuperAdmin"}
                        label={"Super Admin"}
                        isChecked={this.state.admin.isSuperAdmin}
                        onClick={({ target: { checked } }) => {
                            let stateCopy = Object.assign({}, this.state);
                            if (checked) {
                                stateCopy.admin.isSuperAdmin = true;
                            } else {
                                stateCopy.admin.isSuperAdmin = false;
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
                    isVisible={this.props.isAdminEditVisible}
                    onClickOutside={() => {
                        this.props.hideAdminEdit();
                    }}
                    contents={content}
                    header="Add System Administrators"
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
                                        isDisabled:this.props.isEdit?false:((this.state.admin.userByUserId.id?false:true)||
                                        (!this.state.admin.isAdmin && !this.state.admin.isSuperAdmin)),
                                        onClick: () => {
                                            if (this.props.isEdit) {
                                                let stateCopy = Object.assign({}, this.state);
                                                let selection = stateCopy.admin.userByUserId.id;
                                                stateCopy.admin.userByUserId.firstName = this.props.users.find((user) => user.id == selection).firstName
                                                stateCopy.admin.userByUserId.lastName = this.props.users.find((user) => user.id == selection).lastName
                                                //stateCopy.admin.currentEdit = this.state.admin;
                                                this.setState(stateCopy);
                                                this.props.updateAdmin(this.state.admin);
                                            } else {
                                                this.props.saveAdmin(this.state.admin);
                                            }
                                        }
                                    },
                                    {
                                        type: "negative",
                                        value: "Cancel",
                                        onClick: () => {
                                            this.props.hideAdminEdit();
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
