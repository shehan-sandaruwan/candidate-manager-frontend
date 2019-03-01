import React, { Component } from "react";
import { connect } from "react-redux";
import { getMatches, updateState } from "../../actions/preCheck-action";
import { bindActionCreators } from "redux";
import PreCheckTable from "./preCheckTable";
import PreCheckSideBar from "./PreCheckSideBar";
import {Button} from "@trycake/glaze-ui";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import Cookies from 'js-cookie';
class PreCheckPage extends Component {

  getInitialStates = () => {
    var states = {
      transition: {
        //userId: this.props.userId,
        applicationId: this.props.candidate.id,
        stateName: "",
        isActive: 1,
        comment: ""
      },
      sideBarVisible: false
    };
    return Object.assign({}, states);
  };



  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }

  componentDidMount() {
    this.props.getMatches(
      this.props.candidate.firstName,
      this.props.candidate.lastName,
      this.props.candidate.email,
      this.props.candidate.contactNumber,
      this.props.candidate.nic,
      this.props.candidate.id,
      this.props.candidate.comment
    );
    console.log("candidate",this.props.candidate);
  }
  

  render() {
    let user = JSON.parse(Cookies.get('authUser'));
        if (!user.isAdmin) window.location.href = "/";
        else return (
      <Section sectionSpacing={true}>
        <div id="info-box" style={{
          "border-width": "1px",
          "border-style": "solid",
          "width": "70%",
          "border-color": "gainsboro",
          "padding": "20px",
          "border-radius": "5px",
          "font-size": "medium",
          "color": "gray",
          "float": "left", "margin": 0
        }}>
          <div id="pro-pic" style={{ "float": "left", "margin": 0, "width": "100px" }}><img src="https://visualpharm.com/assets/344/Male%20User-595b40b65ba036ed117d4d28.svg" height="80px"></img></div>
          <div id="pro-detail" style={{ "float": "left", "margin": 0, "width": "66%" }}>
            <h3>{this.props.candidate.firstName + " " + this.props.candidate.lastName}</h3>
            <br />
            <p>{this.props.candidate.email}
              &nbsp;&nbsp;&nbsp;{this.props.candidate.contactNumber}
              &nbsp;&nbsp;&nbsp;{this.props.candidate.nic}</p>
          </div>
        </div>
        <div id = "proceed"style={{ "float": "left", "margin": 0, "width": "30%",    "padding": "30px",
    "padding-top": "0",
    "padding-left": "70px" }}>
        <Button
                  type={"primary"}
                  value="Proceed"
                  size={"x-large"}
                  onClick={() => {


                    this.state.transition.stateName = "pre-checked";
                      this.state.transition.comment =
                        this.state.transition.comment.length < 1
                          ? "no comment"
                          : this.state.transition.comment;
                      this.props.updateState(this.state.transition);


                    // this.setState(
                    //   Object.assign({}, this.state, { sideBarVisible: true })
                    // );

                  }}
                />



        <Button
                  type={"negative"}
                  value="Reject"
                  size={"x-large"}
                  onClick={() => {
                    this.setState(
                      Object.assign({}, this.state, { sideBarVisible: true })
                    );
                  }}
                />



        </div>
        <Column size={"full"}>
         <br/>
          <PreCheckTable
            contents={this.props.matches}
            nic={this.props.candidate.nic}
            email={this.props.candidate.email}
          />
          <PreCheckSideBar
            isVisible={this.state.sideBarVisible}
            hideSideBar={() => {
              this.setState(
                Object.assign({}, this.state, { sideBarVisible: false })
              );
            }}
            // userId={1}
            applicationId={this.props.candidate.id}
            savealertVisible={this.props.savealertVisible}
            hideSaveAlert={this.props.hideSaveAlert}
            alertType={this.props.alertType}
            alertMsg={this.props.alertMsg}
            updateState={this.props.updateState}
          />
        </Column>
      </Section>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    matches: state.preCheck.matches,
    savealertVisible: state.preCheck.savealertVisible,
    gettingJobs: state.preCheck.getting,
    alertMsg: state.preCheck.alertMsg,
    alertType: state.preCheck.alertType,
    candidate: state.home.currentEdit
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      getMatches: getMatches,
      updateState: updateState
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PreCheckPage);
