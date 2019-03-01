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
  ButtonPanel,
  Button,
  AlertBar,
  Icon
} from "@trycake/glaze-ui";
import Cookies from 'js-cookie';
import { PDFExport } from '@progress/kendo-react-pdf';
import syscolabs_logo from "../generateReports/syscolabs_logo.png";

 
import {
    showSaveEditNoFlyer,
    hideSaveEdit,
    getApplicationsByState,
    getApplications,
    hideSaveAlert,
    showHRShortList,
    hrReject,
    hrShortListed,
    offeraccepted,
    hideHRShortListAlert,
    showScheduleInterview,
    saveSchedule,
    showScheduleEdit,
    offeraccept,
    searchFilterApplications
  } from "../../actions/home-actions";



let stateEnums = [
    {
      label: "Submitted",
      value: "submitted",
      headerName: "Submitted Candidates - Click Precheck to Proceed"
    },
    {
      label: "Prechecked",
      value: "pre-checked",
      headerName: "Prechecked Candidates - Click a Row to Proceed"
    },
    {
      label: "HR Shortlisted",
      value: "hr-short-listed",
      headerName: "HR Shortlisted Candidates - Click a Row to Proceed"
    },
    {
      label: "Line Shortlisted",
      value: "line-short-listed",
      headerName: "Line Shortlisted Candidates - Click a Row to Proceed"
    },
    {
      label: "Interview Scheduled",
      value: "interview-scheduled",
      headerName: "Interview Scheduled Candidates - Click a Row to Proceed"
    },
    {
      label: "Interviewed",
      value: "interviewed",
      headerName: "Interviewed Candidates - Click a Row to Proceed"
    },
    {
      label: "Selected",
      value: "selected",
      headerName: "Selected Candidates - Click a Row to Proceed"
    },
    {
      label: "Offer Accepted",
      value: "offer-accepted",
      headerName: "Offer Accepted Candidates - Click a Row to Proceed"
    },
    {
      label: "OnHold",
      value: "on-hold",
      headerName: "OnHold Candidates - Click a Row to Proceed"
    },
    {
      label: "Precheck Rejected",
      value: "pre-check-rejected",
      headerName: "Precheck Rejected Candidates - Click a Row to Proceed"
    },
    {
      label: "HR Rejected",
      value: "hr-rejected",
      headerName: "HR Rejected Candidates - Click a Row to Proceed"
    },
    {
      label: "Line Rejected",
      value: "line-rejected",
      headerName: "Line Rejected Candidates - Click a Row to Proceed"
    },
    {
      label: "Interview Rejected",
      value: "interview-rejected",
      headerName: "Interview Rejected Candidates - Click a Row to Proceed"
    },
    {
      label: "Phone Rejected",
      value: "phone-rejected",
      headerName: "Phone Rejected Candidates - Click a Row to Proceed"
    },
    {
      label: "Offer Rejected",
      value: "offer-rejected",
      headerName: "Offer Rejected Candidates - Click a Row to Proceed"
    },
    {
      label: "Withdrawn",
      value: "withdrawn",
      headerName: "Withdrawn Candidates - Click a Row to Proceed"
    },
    {
      label: "No Show",
      value: "no-show",
      headerName: "Candidates Didn't Showup"
    },
    {
      label: "Blacklisted",
      value: "blacklisted",
      headerName: "Blacklisted Candidates"
    }
  ];
  

class reportPage extends React.Component {
  getInitialStates = () => {
    let states = {
        selectedState : "submitted",
        // count: 0
    
    };
    return Object.assign({}, states);
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }

  componentDidMount() {
    // this.props.getJobs();
    
    this.props.getApplicationsByState(this.state.selectedState);
    
  }

  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
}

  render() {
    return (
      <Layout>   
        

        <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
        <img src={syscolabs_logo} height="80" width="300"/>

        <Section sectionSpacing={true}>
        

          <Column size={"full"}>
            <h1>Report Generation</h1>
          </Column>

          <Column>
            <div>
              <LayoutHandler childrenSpaceLevel="one">
                <Container>
                  <Section sectionSpacing={true}>


              <Column>
                    <Label text="State" />
                    <DropDown
                      dropId="state-dropdown"
                      options={stateEnums}
                      value={this.state.selectedState}
                      isSearchable={false}
                      placeholder="select state"
                      onChange={selection => {
                        let stateCopy = Object.assign({}, this.state);
                        stateCopy.selectedState = selection;
                        stateCopy.headerName = stateEnums.find(
                          stateName => stateName.value == selection
                        ).headerName;
                        this.props.getApplicationsByState(selection);
                        this.setState(stateCopy);
                      }}
                    />
                  </Column>

                    <Column>
                      <Label text="Total Applications" />
                      <Input
                        placeholder="Total"
                        id={"totalapps"}
                        disabled={true}
                        // value={this.state.newApplication.firstName}
                        value={Object.keys(this.props.applications).length}             
                      
                     
                    />
                    
                    </Column>
                  
                  </Section>
                  
                 

                </Container>
              </LayoutHandler>

          
            </div>
          </Column>
        </Section>
        </PDFExport>


         <ButtonPanel
                buttonsList={[
                  {
                    type: "primary",
                    value: "Download",                    
                    onClick: () => {
                      {console.log("this is work")}
                      this.exportPDFWithComponent()
                    }
                  }
                ]}
              />
       

      </Layout>
    );
  }

}

const mapStateToProps = (state, props) => {
  return {
    applications: state.home.allApplications.map(application => {
        application.submittedDate = application.createdTime.substr(0, 10);
        return application;
    }
    )}}
  


const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
        getApplicationsByState: getApplicationsByState
          //   createApplication: createApplication,
    //   hideAlert: hideAlert,
    //   getJobs: getJobs
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(reportPage);
