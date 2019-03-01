import React, { Component } from "react";
import { Link } from "react-router-component";
import {
  AlertBar,
  ActionPanel,
  Input,
  Button,
  Label
} from "@trycake/glaze-ui";
import {
  Column,
  Section,
  Separator
} from "@trycake/glaze-ui/dist/components/Layout";

export default class ApplicationFlyer extends Component {
  getInitialStates = () => {
    let states = {
      applications: {
        firstName: "",
        lastName: "",
        positionByPositionId: {
          id: "",
          name: ""
        },
        contactNumber: "",
        gender: "",
        email: "",
        institute: "",
        lastCompany: "",
        source: ""
      }
    };
    return Object.assign({}, states);
  };
  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }

  componentWillReceiveProps(nextProps) {
    var stateCopy = this.getInitialStates();
    stateCopy.applications = nextProps.currentEdit;
    this.setState(stateCopy);
  }
  getHref(){
    if (window.location.href == "/")return "candidatemanager/precheckpage";
    if (window.location.href == "")return "/candidatemanager/precheckpage";
    else{
      return "/precheckpage";
    }
  }

  render() {
    const content = (
      <Section>
        <Column size={"full"}>
          <Label text="First Name" />
          <Input
            placeholder={"First Name"}
            // disabled={true}
            // value={this.state.applications.firstName}
          />
        </Column>
        <Column size={"full"}>
          <Label text="Last Name" />
          <Input
            placeholder={"Last Name"}
            // disabled={true}
            value={this.state.applications.lastName}
          />
        </Column>
        <Column size={"full"}>
          <Label text="Gender" />
          <Input
            placeholder={"Gender"}
            // disabled={true}
            value={this.state.applications.gender}
          />
        </Column>
        <Separator size={"thin"} />
        <Column size={"full"}>
          <Label text="Email" />
          <Input
            placeholder={"Email"}
            // disabled={true}
            value={this.state.applications.email}
          />
        </Column>
        <Column size={"full"}>
          <Label text="Contact Number" />
          <Input
            placeholder={"Contact Number"}
            // disabled={true}
            value={this.state.applications.contactNumber}
          />
        </Column>
        <Separator size={"thin"} />
        <Column size={"full"}>
          <Label text="Position" />
          <Input
            placeholder={"Position"}
            // disabled={true}
            value={
              this.state.applications.positionByPositionId
                ? this.state.applications.positionByPositionId.name
                : ""
            }
          />
        </Column>
        <Column size={"full"}>
          <Label text="Institute" />
          <Input
            placeholder={"Institute"}
            // disabled={true}
            value={this.state.applications.institute}
          />
        </Column>
        <Column size={"full"}>
          <Label text="Last Worked Company" />
          <Input
            placeholder={"Not Specified"}
            // disabled={true}
            value={this.state.applications.lastCompany}
          />
        </Column>
        <Separator size={"thin"} />
        <Column size={"full"}>
          <Label text="Source" />
          <Input
            placeholder={"Not Specified"}
            // disabled={true}
            value={this.state.applications.source}
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
          header="View Application Details"
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
              <div style={{ padding: "15px" }}>
                <Link href="/precheckpage" style={{
                  "text-decoration": "none"                  
                }}>
                  <Button value="Proceed for Pre-Check" size="small" />
                </Link>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
