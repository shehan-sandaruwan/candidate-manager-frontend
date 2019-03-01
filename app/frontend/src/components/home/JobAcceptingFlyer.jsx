
import React, { Component } from "react";
import { Link } from "react-router-component";
import {
  AlertBar,
  ActionPanel,
  ButtonPanel,
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
      state: {
        stateName: "offer-accepted",
        isActive: 1,
        comment: "Job Offer Accepted By Candidate",
        applicationId: "",
        newvacancies:"",
        departments: []
    },
      applications: {
        id: "",
        firstName: "",
        lastName: "",
        positionByPositionId: {
          id: "",
          name: "",
          isOpen:"",
          availablestate:"",
          availability:""
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

  // componentWillReceiveProps(nextProps) {
  //   var stateCopy = this.getInitialStates();
  //   stateCopy.applications = nextProps.currentEdit;
  //   if(stateCopy.applications.positionByPositionId.isOpen >= 1){
  //     stateCopy.applications.positionByPositionId.availability ="Yes "+ stateCopy.applications.positionByPositionId.isOpen +" vacancies available" ;
  //     stateCopy.applications.positionByPositionId.availablestate = true;
  //   }
  //   else{
  //     stateCopy.applications.positionByPositionId.availability ="No";
  //     stateCopy.applications.positionByPositionId.availablestate = false;
  //   }
  //   this.setState(stateCopy);
  // }
  // getHref(){
  //   if (window.location.href == "/")return "candidatemanager/precheckpage";
  //   if (window.location.href == "")return "/candidatemanager/precheckpage";
  //   else{
  //     return "/precheckpage";
  //   }
  // }

  render() {
    const content = (
      <Section>
        <Column size={"full"}>
          <Label text="Name" />
          <Input
            placeholder={"Name"}
            disabled={true}
            value={this.state.applications.firstName + " "+this.state.applications.lastName}
          />
        </Column>
        {/* <Column size={"full"}>
          <Label text="Last Name" />
          <Input
            placeholder={"Last Name"}
            disabled={true}
            value={this.state.applications.lastName}
          />
        </Column> */}
       
        
        <Column size={"full"}>
          <Label text="Email" />
          <Input
            placeholder={"Email"}
            disabled={true}
            value={this.state.applications.email}
          />
        </Column>
        <Column size={"full"}>
          <Label text="Contact Number" />
          <Input
            placeholder={"Contact Number"}
            disabled={true}
            value={this.state.applications.contactNumber}
          />
        </Column>
        
        <Column size={"full"}>
          <Label text="Position" />
          <Input
            placeholder={"Position"}
            disabled={true}
            value={
              this.state.applications.positionByPositionId
                ? this.state.applications.positionByPositionId.name
                : ""
            }
          />
        </Column>
        <Column size={"full"}>
          <Label text="Availability" />
          <Input
            placeholder={"Availability"}
            disabled={true}
            value={
              this.state.applications.positionByPositionId
                ? this.state.applications.positionByPositionId.availability
                : ""
            }
          />
        </Column>
        
       
       
        
      </Section>
    );

    return (
      <div>
        <ActionPanel
          isVisible={this.props.isacceptVisible}
          onClickOutside={() => {
            this.props.hideSaveEdit();
          }}
          contents={content}
          header="Selected Candidate's Details"
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
                                        value: "Accept the Job Offer",
                                        
                                       isDisabled:(!this.state.applications.positionByPositionId.availablestate),
                                         onClick:() => {
                                          let stateCopy = Object.assign({},this.state);
                                          stateCopy.state.applicationId = this.props.currentEdit.id;
                                          stateCopy.state.newvacancies = this.props.currentEdit.positionByPositionId.isOpen
                                          console.log(this.props.currentEdit);
                                          this.setState(stateCopy);
                                          this.props.offeraccepted(stateCopy.state);
                                          console.log(this.props.offeraccepted);
                                        }
                                    }

                                ]}
                            />
              {/* <div style={{ padding: "15px" }}>
                <Link href="/precheckpage" style={{
                  "text-decoration": "none"                  
                }}>
                  <Button value="Accept the Offer" size="small" />
                </Link>
              </div> */}
              
            </div>
          }
        />
      </div>
    );
  }
}
