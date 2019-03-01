import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Column,
  Section,
  LayoutHandler,
  Container,
  Layout
} from "@trycake/glaze-ui/dist/components/Layout";
import {
  Label,
  Input,
  DropDown,
  Button,
  AlertBar,
  Icon
} from "@trycake/glaze-ui";
import { createApplication, hideAlert } from "../actions/application-actions";
import { getJobs } from "../actions/job-actions";
import Cookies from 'js-cookie';
import axios from 'axios';
const applicationValidator = require("../validator/ApplicationValidator");

class SubmitPage extends React.Component {
  getInitialStates = () => {
    let states = {
      newApplication: {
        firstName: "",
        lastName: "",
        nic: "",
        gender: "",
        institute: "",
        source: "",
        email: "",
        lastCompany: "",
        contactNumber: "",
        jobId: "",
        cv: "",
        // currentPosition: "",
        // experience: "",
        source: ""
      },
      errors: {
        hasError: true,
        firstName: false,
        lastName: false,
        gender: false,
        nic: false,
        email: false,
        position: false,
        lastCompany: false,
        institute: false,
        contactNumber: false,
        // currentPosi:false
      },
      errorMessages: {
        firstName: false,
        lastName: false,
        nic: false,
        email: false,
        lastCompany: false,
        contactNumber: false
      },
      selectedFile: "No file is choosen",
      predictions:[],
      predOptions: [{label:"Software ", value:"software architect"}]
    };
    return Object.assign({}, states);
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }

  submitClicked = () => {
    this.state.newApplication.cv = this.refs.cvInput.files[0];
    this.state.newApplication.source = "ref:" + JSON.parse(Cookies.get("authUser")).email;
    this.props.createApplication(this.state.newApplication);
  };

  getPredictions(value){

    return axios.get("http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=" + value).
    then((response) => {
      this.state.predictions = response.data;
      // console.log(response.data);
    })
  }

  uploadFile = () => {
    this.refs.cvInput.click();
    console.log("upload__1");
  };

  uploadFileName = () => {
    this.state.selectedFile = this.refs.cvInput.files[0].name;
    this.setState(this.state);
  };

  checkMandatory = applicationFields => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.errors.hasError = applicationValidator.validate(
      this.state.newApplication
    );
    Object.keys(stateCopy.errors).forEach(field => {
      if (stateCopy.errors[field]) {
        stateCopy.errors.hasError = true;
      }
      this.setState(stateCopy);
    });
  };

  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    return (
      <Layout
        footer={
          <AlertBar
            type={this.props.alertType}
            isDismissible={true}
            onDismiss={() => {
              this.props.hideAlert();
              this.state = this.getInitialStates();
              this.setState(Object.assign({}, this.state));
            }}
            message={{ header: this.props.alertMsg }}
            isVisible={this.props.alertVisible}
            isSingleLine={false}
          />
        }
      >
        <Section sectionSpacing={true}>
          <Column size={"full"}>
            <h1>Submit Application</h1>
          </Column>
          <Column>
            <div>
              <LayoutHandler childrenSpaceLevel="one">
                <Container>
                  <Section sectionSpacing={true}>
                    <Column>
                      <Label text="BIO" />
                      <Input
                        placeholder="First Name"
                        id={"firstName"}
                        value={this.state.newApplication.firstName}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          if (value.length > 2 && value.length < 20) {
                            stateCopy.errors.firstName = false;
                          } else {
                            stateCopy.errors.firstName = true;
                            stateCopy.errorMessages.firstName =
                              "Length of the first name must be between 2 to 20 characters";
                          }
                          stateCopy.newApplication.firstName = value;
                          this.setState(stateCopy);
                        }}
                        isError={this.state.errors.firstName}
                        errorMessage={this.state.errorMessages.firstName}
                      />
                      <Input
                        placeholder="Last Name"
                        id={"lastName"}
                        value={this.state.newApplication.lastName}
                        isError={this.state.errors.lastName}
                        errorMessage={this.state.errorMessages.lastName}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          if (value.length > 2 && value.length < 20) {
                            stateCopy.errors.lastName = false;
                          } else {
                            stateCopy.errors.lastName = true;
                            stateCopy.errorMessages.lastName =
                              "Length of the last name must be between 2 to 20 characters";
                          }
                          stateCopy.newApplication.lastName = value;
                          this.setState(stateCopy);
                        }}
                      />
                      <Input
                        placeholder="NIC"
                        id={"nic"}
                        value={this.state.newApplication.nic}
                        isError={this.state.errors.nic}
                        errorMessage={this.state.errorMessages.nic}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          console.log('on change triggered')
                          console.log(value)
                          if (
                            value.length === 10 &&
                            (value.charAt(9) === "v" ||value.charAt(9) === "V") &&
                            !value.startsWith('0') &&
                            !isNaN(value.slice(0, 9))
                          ) {
                            stateCopy.errors.nic = false;
                          } else {
                            stateCopy.errors.nic = true;
                            stateCopy.errorMessages.nic = "Invalid NIC";
                          }

                      
                          stateCopy.newApplication.nic = value;
                          this.setState(stateCopy);
                        }}
                      />
                      <DropDown
                        dropId="gender-dropdown"
                        placeholder={"Gender"}
                        value={this.state.newApplication.gender}
                        isError={this.state.errors.gender}
                        onBlurResetsInput={true}
                        options={[
                          { label: "Male", value: "male" },
                          { label: "Female", value: "female" }
                        ]}
                        onChange={selection => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          stateCopy.newApplication.gender = selection;
                          stateCopy.errors.gender = false;
                          this.setState(stateCopy);
                        }}
                      />
                    </Column>
                    <Column>
                      <Label text="CONTACT DETAILS" />
                      <Input
                        placeholder="Email"
                        id={"email"}
                        value={this.state.newApplication.email}
                        isError={this.state.errors.email}
                        errorMessage={this.state.errorMessages.email}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          if (!this.validateEmail(value)) {
                            stateCopy.errorMessages.email = "Invalid email";
                            stateCopy.errors.email = true;
                          } else {
                            stateCopy.errors.email = false;
                          }
                          stateCopy.newApplication.email = value;
                          this.setState(stateCopy);
                        }}
                      />
                      <Input
                        placeholder="Mobile Number"
                        id={"contactNumber"}
                        value={this.state.newApplication.contactNumber}
                        isError={this.state.errors.contactNumber}
                        errorMessage={this.state.errorMessages.contactNumber}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          if (
                            value.match(/^[0-9]+$/) == null ||
                            value.length !== 10
                          ) {
                            stateCopy.errorMessages.contactNumber =
                              "Enter a valid mobile number";
                            stateCopy.errors.contactNumber = true;
                          } else {
                            stateCopy.errors.contactNumber = false;
                          }
                         stateCopy.newApplication.contactNumber = value;
                          this.setState(stateCopy);
                        }}
                      />
                    </Column>
                  </Section>
                </Container>
              </LayoutHandler>
              <LayoutHandler childrenSpaceLevel="one">
                <Container>
                  <Section sectionSpacing={true}>
                    <Column>
                      <Label text="ADDITIONAL" />
                      <Input
                        placeholder="Institute"
                        id={"institute"}
                        value={this.state.newApplication.institute}
                        isError={this.state.errors.institute}
                        errorMessage={this.state.errorMessages.institute}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          if (value.length > 1 && value.length < 20) {
                            stateCopy.errors.institute = false;
                          } else {
                            stateCopy.errors.institute = true;
                            stateCopy.errorMessages.institute =
                              "Institute name must be 2 to 20 characters long";
                          }
                          stateCopy.newApplication.institute = value;
                          this.setState(stateCopy);
                        }}
                      />
                      <Input
                        placeholder="Last Worked Company"
                        id={"lastCompany"}
                        value={this.state.newApplication.lastCompany}
                        isError={this.state.errors.lastCompany}
                        errorMessage={this.state.errorMessages.lastCompany}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          if (value.length > 1 && value.length < 20) {
                            stateCopy.errors.lastCompany = false;
                          } else {
                            stateCopy.errors.lastCompany = true;
                            stateCopy.errorMessages.lastCompany =
                              "Company name must be 2 to 20 characters long";
                          }
                          stateCopy.newApplication.lastCompany = value;
                          this.setState(stateCopy);
                        }}
                      />

                      {/* <DropDown
                        dropId="currentPos-dropdown"
                        isSearchable = {true}

                        placeholder="current Position"
                        // id={"currnetPosition"}
                        value={this.state.newApplication.currentPosition}
                        // isError={}
                        // errorMessage={this.state.errorMessages.lastCompany}
                        onChange={({ target: { value } }) => {

                          let stateCopy = Object.assign({}, this.state);
                          clearTimeout(this.timeout);
                          
                          stateCopy.newApplication.currentPosition = value;
                          this.setState(stateCopy);

                          let stateCopy2 = Object.assign({}, this.state);

                          if(value.length > 0) {
                            this.timeout = setTimeout(() => {
                              const pred = this.getPredictions(value);
                              stateCopy2.predictions = pred;
                              this.setState(stateCopy2);
                            }, 250)
                          }else {
                            const pred = [];
                            stateCopy2.predictions = pred;
                            this.setState(stateCopy2);

                          }

                          // let optArray = [];
                          console.log(this.state.predictions)
                          this.state.predictions.map((value) => {
                            this.state.predOptions.push({
                              label: value.suggestion,
                              value: value.normalized_job_title
                            })
                          })
                          console.log(this.state.predOptions);

                          


                        }}
                        options={this.state.predOptions}
                      /> */}

                       {/* <Input
                        placeholder="Current Position"
                        id={"currentPosition"}
                        value={this.state.newApplication.currentPosition}
                        isError={this.state.errors.currentPosi}
                        // errorMessage={this.state.errorMessages.lastCompany}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          if (value.length > 1 && value.length < 30) {
                            stateCopy.errors.lastCompany = false;
                          } else {
                            stateCopy.errors.lastCompany = true;
                         
                          }
                          stateCopy.newApplication.currentPosition = value;
                          this.setState(stateCopy);
                        }}
                      />

                      <Input
                        placeholder="Years of Experience"
                        id={"experience"}
                        value={this.state.newApplication.experience}
                        // isError={this.state.errors.currentPosi}
                        // errorMessage={this.state.errorMessages.lastCompany}
                        onChange={({ target: { value } }) => {
                          let stateCopy = Object.assign({}, this.state);
                          if (value.length > 1 && value.length < 3) {
                            stateCopy.errors.lastCompany = false;
                          } else {
                            stateCopy.errors.lastCompany = true;
                         
                          }
                          stateCopy.newApplication.experience = value;
                          this.setState(stateCopy);
                        }}
                      /> */}
                      
                      
                    </Column>
                    <Column>
                      <Label text="POSITION APPLIED" />
                      <DropDown
                        dropId="position-drop"
                        placeholder="Select Position"
                        options={this.props.jobs}
                        value={this.state.newApplication.jobId}
                        isError={this.state.errors.position}
                        onBlurResetsInput={true}
                        onChange={selection => {
                          let stateCopy = Object.assign({}, this.state);
                          this.checkMandatory();
                          stateCopy.newApplication.jobId = selection;
                          stateCopy.errors.position = false;
                          this.setState(stateCopy);
                        }}
                      />
                      <Button
                        value="Upload CV"
                        onClick={this.uploadFile}
                        type="secondary"
                        btnIcon={
                          <Icon
                            name="document"
                            size="small"
                            face="fill-carrot"
                          />
                        }
                      />
                      <Label
                        text={this.state.selectedFile}
                        labelFor="inputID"
                        type="secondary"
                      />
                      <input
                        style={{ display: "none" }}
                        //className="file-upload"
                        type="file"
                        ref="cvInput"
                        onChange={this.uploadFileName}
                      />
                    </Column>
                  </Section>
                </Container>
              </LayoutHandler>
              <Section sectionSpacing={true}>
                <Column>
                  <Button
                    type="primary"
                    value="Submit"
                    onClick={this.submitClicked}
                    size="large"
                    isDisabled={this.state.errors.hasError}
                  />
                </Column>
              </Section>
            </div>
          </Column>
        </Section>
      </Layout>
    );
  }
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}

const mapStateToProps = (state, props) => {
  return {
    alertMsg: state.application.alertMsg,
    alertVisible: state.application.alertVisible,
    alertType: state.application.alertType,
    jobs: state.job.allJobs
      .filter(job => {
        if (!job.isOpen) {
          return false;
        }
        return true;
      })
      .map(job => {
        return { label: job.name, value: job.id };
      })
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      createApplication: createApplication,
      hideAlert: hideAlert,
      getJobs: getJobs
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SubmitPage);
