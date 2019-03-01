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
  Section
} from "@trycake/glaze-ui/dist/components/Layout";

export default class DepartmentFlyer extends Component {
  getInitialStates = () => {
    var states = {
      department:{
        name:""
      },
      errors:{
        name:false
      },
      errorMessages:{
        name:""
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
      stateCopy.department= nextProps.currentEdit;
      this.setState(stateCopy);
    } else {
      let stateCopy = this.getInitialStates();
      this.setState(stateCopy);
    }
  }

  render() {
    const content = (
      <Section>
        <Column size={"full"}>
          <Label text="Name" />
          <Input
            placeholder={"Department Name"}
            value={this.state.department.name}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.department.name = value;
              if (value.length > 2 && value.length < 255) {
                stateCopy.errors.name = false;
              } else {
                stateCopy.errors.name = true;
                stateCopy.errorMessages.name =
                  "Length of the name should be between 2 and 255 charactors";
              }
              this.setState(stateCopy);
            }}
            isError={this.state.errors.name}
            errorMessage={this.state.errorMessages.name}
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
            this.state = this.getInitialStates();
          }}
          contents={content}
          header="Edit Department Details"
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
                    isDisabled:this.state.department.name.length < 1,
                    onClick: () => {
                      if (this.props.isEdit) {
                        this.props.updateDepartment(this.state.department);
                      } else {
                        this.props.saveDepartment(this.state.department);
                      }
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
