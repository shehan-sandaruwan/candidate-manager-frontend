import React, { Component } from "react";
import SubmitPage from "./components/SubmitPage";
import JobPage from "./components/job/JobPage";
import UserPage from "./components/user/userPage";
import PreCheckPage from "./components/preCheck/preCheckPage";
import { Provider } from "react-redux";
import configStore from "./store/config-store";
import ReactRouter from "react-router-component";
import ApplicationPage from "./components/home/ApplicationPage";
import DepartmentPage from "./components/department/DepartmentPage";
import LineShortListPage from "./components/lineShortlist/LineShortListPage";
import LogingPage from "./components/LogingPage";
import Cookies from 'js-cookie';
import ViewJD from "./components/ViewJD";
import ViewScheduledInterviews from "./components/viewScheduledInterviews/viewScheduledInterviews";
import trackApplication from './components/trackApplication';
import interviewForm from './components/interviewForm/interviewForm'
import profile from "./components/profile/profilePage";
import viewFeedback from "./components/interviewForm/viewFeedback";
import reportPage from "./components/generateReports/reportPage";

let Locations = ReactRouter.Locations;
let Location = ReactRouter.Location;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      
    };
    this.store = configStore();

  }
  getHandler() {

  }
  render() {
    return (
      <Provider store={this.store}>
        <div style={{ overflowX: "hidden", overflowY: "auto" }}>
          <Locations contextual>
            <Location path="/" handler={rootRedirector} />
            <Location path="/applicationpage" handler={ApplicationPage} />
            <Location path="/submitpage" handler={SubmitPage} />
            <Location path="/jobpage" handler={JobPage} />
            <Location path="/userpage" handler={UserPage} />
            <Location path="/precheckpage" handler={PreCheckPage} />
            <Location path="/departmentpage" handler={DepartmentPage} />
            <Location path="/lineshortlist" handler={LineShortListPage} />
            <Location path="/authenticate" handler={LogingPage} />
            <Location path="/scheduledinterviews" handler={ViewScheduledInterviews}/>
            <Location path="/viewjd/" handler={ViewJD} />
            <Location path="/track" handler={trackApplication} />
            <Location path="/interviewForm" handler={interviewForm}/>
            <Location path="/profile" handler={profile} />
            <Location path="/viewfeedback" handler={viewFeedback} />
            <Location path="/reportPage" handler={reportPage} />


          </Locations>
        </div>
      </Provider>
    );
  }
}
let rootURLS = [
  '/candidatemanager/submitpage',
  '/candidatemanager/applicationpage', 
  '/candidatemanager/lineshortlist', 
  '/candidatemanager/userpage',
  '/candidatemanager/reportPage'

];
class rootRedirector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      root: Cookies.get('root')

    };
  }
  render() {
    return (
        window.location.href = rootURLS[this.state.root || 0]
      )
  }
}

export default App;
