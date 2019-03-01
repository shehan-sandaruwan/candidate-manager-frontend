import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDepartments
} from "../../actions/department-actions";

import {
  DropDown,
  AlertBar,
  ActionPanel,
  ButtonPanel,
  Checkbox,
  Input,
  Label,
  TextArea
} from "@trycake/glaze-ui";
import {
  Column,
  Section

} from "@trycake/glaze-ui/dist/components/Layout";

class AddJobFlyer extends Component {
  
 

  getInitialStates = () => {
    var states = {
      
      job: {
        name: "",
        isOpen: true,
        description: "",
        department: [],
        isOpenstate :1
      },
      errors: {
        name: false,
        isOpen: false,
        description: false
      },
      errorMessages: {
        name: null,
        isOpen: null,
        description: null
      },
     
    };

    // [{label:"CAKE Core",value:"CAKE Core"}
    //               ,{label:"BT Studio",value:"BT Studio"}]
    return Object.assign({}, states);
  };
  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
    
  }

  
  componentDidMount() {
    this.props.getDepartments();
    var newdeplist = this.props.departments.map((department)=> {
      var depObject = {
        "label": department.name, 
        "value": department.name
      }
      return depObject;
    })
    console.log("flyer mounted");
    console.log(this.props.departments);
    console.log(newdeplist);
    console.log("Converting");
    this.state.departments = newdeplist;
    console.log("De[ loaded");
    console.log(this.state.departments);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEdit) {
      var stateCopy = this.getInitialStates();
      stateCopy.job = nextProps.currentEdit;
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
          <Label text="Position" />
          <Input
            placeholder={"Job Position"}
          
            value={this.state.job.name}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.job.name = value;
              if (value.length > 2 && value.length < 255) {
                stateCopy.errors.name = false;
              } else {
                stateCopy.errors.name = true;
                stateCopy.errorMessages.name =
                  "Length of the name should be between 3 and 255 charactors";
              }
              this.setState(stateCopy);
            }}
            onBlur={() => {
              //this.props.checkName(this.state.job.name);
            }}
            isError={this.state.errors.name}
            errorMessage={this.state.errorMessages.name}
          />
        </Column>

        <Column size={"full"}>
          <Label text="Job Description" />
          <TextArea
            placeholder={"Job Description"}
            value={this.state.job.description}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.job.description = value;
              if (value.length > 2) {
                stateCopy.errors.description = false;
              } else {
                stateCopy.errors.description = true;
                stateCopy.errorMessages.description =
                  "Length of the name should atleast 3 charactors";
              }
              this.setState(stateCopy);
            }}
            isError={this.state.errors.description}
            errorMessage={this.state.errorMessages.description}
          />
        </Column>
        <Column >
        <Label text="Department" />
        <DropDown
          dropId="department-dropdown"
          value={this.state.job.department}
          options={this.state.departments }
          placeholder="select department"
          onChange={selection => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.job.department = selection;
            // if (value.length > 2 ) {
            //   stateCopy.errors.department = false;
            // } else {
            //   stateCopy.errors.department = true;
            //   stateCopy.errorMessages.department =
            //     "Select The Department for the Job ";
            // }
            this.setState(stateCopy);
          }}
        />
      </Column>
        {/* <Column >
        <Label text="Department" />
      
          <Input
            dropId="department-dropdown"
            value={this.state.job.department}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.job.department = value;
              if (value.length > 2) {
                stateCopy.errors.department = false;
              } else {
                stateCopy.errors.department = true;
                stateCopy.errorMessages.department =
                  "Length of the department should atleast 3 charactors";
              }
              this.setState(stateCopy);
            }}
            onBlur={() => {
              //this.props.checkName(this.state.job.name);
            }}
            isError={this.state.errors.department}
            errorMessage={this.state.errorMessages.department}
            
         
        />
        
      </Column> */}
        <Column size={"full"}>
          <Label text="Remaining Vacancies" />
          <Input
            placeholder={"Remaining Vacancies"}
            value={this.state.job.isOpenstate}
            type="number"
            id="vacancies"
            
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.job.isOpenstate = value;
              if (value.length == 0 && !isNan(value)) {
                stateCopy.errors.vacant = true;
              } else {
                stateCopy.errors.vacant = false;
                stateCopy.errorMessages.vacant =
                  "Enter Valid Number of Vacancies";
              }
              this.setState(stateCopy);
            }}
            onBlur={() => {
              //this.props.checkName(this.state.job.name);
            }}
            isError={this.state.errors.vacant}
            errorMessage={this.state.errorMessages.vacant}
          />
        </Column>
        <Column size={"full"}>
          <Checkbox
            id={"active-checkbox"}
            label={"Position Opened?"}
            isChecked={this.state.job.isOpen}
            onClick={({ target: { checked } }) => {
              let stateCopy = Object.assign({}, this.state);
              if (checked) {
                stateCopy.job.isOpen = true;
               
              
              } else {
                stateCopy.job.isOpen = false;
                stateCopy.job.isOpenstate = 0;
               
               

              }
            }}
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
          header="Add or Change Job Details"
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
                      this.state.job.name.length < 3 ||
                      this.state.job.description.length < 3 || this.state.job.department.length < 1  ,
                    onClick: () => {
                      if (this.props.isEdit) {
                        this.props.updateJob(this.state.job);
                      } else {
                        this.props.saveJob(this.state.job);
                      }
                    }
                  },
                  {
                    type: "negative",
                    value: "Delete",
                    isDisabled: !this.props.isEdit,
                    onClick: () => {
                      alert("Functionality Not yet decided");
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

const mapStateToProps = (state, props) => {
  return {
   
    departments: state.department.allDepartments
  
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      
      getDepartments: getDepartments
     
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddJobFlyer);