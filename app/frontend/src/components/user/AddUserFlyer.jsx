import React, { Component } from "react";
import {
  AlertBar,
  ActionPanel,
  ButtonPanel,
  Input,
  Label
} from "@trycake/glaze-ui";
import {
  Column,
  Section,
  Separator
} from "@trycake/glaze-ui/dist/components/Layout";

export default class AddUserFlyer extends Component {
  getInitialStates = () => {
    var states = {
      user: {
        firstName: "",
        lastName: "",
        email: ""
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false
      },
      errorMessages: {
        firstName: null,
        lastName: null,
        email: null
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
      stateCopy.user = nextProps.currentEdit;
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
          <Label text="First Name" />
          <Input
            placeholder={"First Name"}
            value={this.state.user.firstName}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.user.firstName = value;
              if (value.length > 1) {
                stateCopy.errors.firstName = false;
              } else {
                stateCopy.errors.firstName = true;
                stateCopy.errorMessages.firstName =
                  "Length of the first name should be atleast 2 charactors";
              }
              this.setState(stateCopy);
            }}
            isError={this.state.errors.firstName}
            errorMessage={this.state.errorMessages.firstName}
          />
        </Column>

        <Column size={"full"}>
          <Label text="Last Name" />
          <Input
            placeholder={"Last Name"}
            value={this.state.user.lastName}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.user.lastName = value;
              if (value.length > 1) {
                stateCopy.errors.lastName = false;
              } else {
                stateCopy.errors.lastName = true;
                stateCopy.errorMessages.lastName =
                  "Length of the last name should atleast 2 charactors";
              }
              this.setState(stateCopy);
            }}
            isError={this.state.errors.lastName}
            errorMessage={this.state.errorMessages.lastName}
          />
        </Column>

        <Separator size={"thin"} />

        <Column size={"full"}>
          <Label text="Email" />
          <Input
            placeholder={"E-mail"}
            value={this.state.user.email}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.user.email = value;
              if (this.validateEmail(value)) {
                stateCopy.errors.email = false;
              } else {
                stateCopy.errors.email = true;
                stateCopy.errorMessages.email = "Please insert a valid email";
              }
              this.setState(stateCopy);
            }}
            isError={this.state.errors.email}
            errorMessage={this.state.errorMessages.email}
          />
        </Column>
      </Section>
    );

    return (
      <div>
        <ActionPanel
          isVisible={this.props.isEditVisible}
          onClickOutside={() => {
            this.props.hideSaveEdit();
          }}
          contents={content}
          header="Add or Change User Details"
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
                    isDisabled:
                      this.state.user.lastName.length < 2 ||
                      this.state.user.firstName.length < 2 ||
                      this.state.user.email.length === 0 ||
                      this.state.errors.email,
                    onClick: () => {
                      if (this.props.isEdit) {
                        this.props.updateUser(this.state.user);
                      } else {
                        this.props.saveUser(this.state.user);
                      }
                    }
                  },
                  {
                    type: "negative",
                    value: "Cancel",
                    isDisabled: !this.props.isEdit,
                    onClick: () => {
                      this.props.hideSaveEdit();
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

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}
