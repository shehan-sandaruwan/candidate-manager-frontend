import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAssigned,
  updateState,
  showSideBar,
  hideSideBar
} from "../../actions/lineShorlist-action";
import{updateState as lineShortlistedRollback} from "../../actions/preCheck-action"
import { bindActionCreators } from "redux";
import LineShortlistTable from "./LineShortlistTable";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import LineShortlistFlyer from "./LineShortlistFlyer";
import Cookies from 'js-cookie';
class LineShortlistPage extends Component {

  
  componentDidMount() {
    this.props.getAssigned(4);
  }

  render() {
    let user = JSON.parse(Cookies.get('authUser'));
    if (!user.canShortList) window.location.href = "/";
    else return (
      <Section sectionSpacing={true}>
        <Column size={"full"}>
          <h1>Assigned Applications to Line Short List</h1>
          <br />
        </Column>
        <Column size={"full"}>
          <LineShortlistTable
            contents={this.props.assigned}
            savealertVisible={this.props.savealertVisible}
            hideSaveAlert={this.props.hideSaveAlert}
            alertType={this.props.alertType}
            alertMsg={this.props.alertMsg}
            updateState={this.props.updateState}
            showSideBar={this.props.showSideBar}
            
          />

          <LineShortlistFlyer
            isVisible={this.props.sideBarVisible}
            hideSideBar={this.props.hideSideBar}
            applicationId={this.props.currentEdit.id}
            savealertVisible={this.props.savealertVisible}
            hideSaveAlert={this.props.hideSaveAlert}
            alertType={this.props.alertType}
            alertMsg={this.props.alertMsg}
            updateState={this.props.updateState}
            currentEdit={this.props.currentEdit}
            lineShortlistedRollback = {this.props.lineShortlistedRollback}
          />
        </Column>
      </Section>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    assigned: state.lineShortlist.assignedApplications.map((application) =>
      Object.assign({}, application, {
        applicationId:application.id,
        name: application.firstName + " " + application.lastName,
        createdTime: application.createdTime.substring(0, 10)
      })
    ),
    savealertVisible: state.lineShortlist.savealertVisible,
    gettingAssigned: state.lineShortlist.getting,
    alertMsg: state.lineShortlist.alertMsg,
    alertType: state.lineShortlist.alertType,
    currentEdit: state.lineShortlist.currentEdit,
    sideBarVisible: state.lineShortlist.sideBarVisible
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      getAssigned: getAssigned,
      updateState: updateState,
      showSideBar: showSideBar,
      hideSideBar: hideSideBar,
      lineShortlistedRollback:lineShortlistedRollback
    },
    dispatch
  );
}; 

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LineShortlistPage);
