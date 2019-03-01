import React, { Component } from "react";
import ReactDOM from "react-dom";

import { MainLayout, Layout } from "@trycake/glaze-ui";
import ReactRouter from "react-router-component";
import "../node_modules/@trycake/glaze-ui/dist/css/glaze-ui-global.css";
import "./glazeComponentCss.jsx";
import Cookies from 'js-cookie';
import MyApp from "../app/frontend/src/App";

let Locations = ReactRouter.Locations;
let Location = ReactRouter.Location;

// Add the application link prefix here
const appRoot = "candidatemanager";
const applicationData = getApplicationData();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token : Cookies.get('token'),
    email : Cookies.get('email')};

    this.currentlySelectedAccount = null;
  }

  onAccountChanged(newAccount) {
    let mountedApplication = this.mountedApp;

    if (newAccount === null) {
      mountedApplication.setState({
        account: null,
        accountStatus: null
      });
      return;
    }
    this.currentlySelectedAccount = newAccount;
    if (mountedApplication) {
      let accnt = null;
      if (newAccount) {
        accnt = newAccount.value;
      }

      mountedApplication.setState({
        account: accnt
      });
    }
  }

  appRefRegister(appRef) {
    if (appRef) {
      this.mountedApp = appRef;
      this.onAccountChanged(this.currentlySelectedAccount);
    }
  }

  onSignOutClicked() {
    window.location.href = "/auth/signout/";
  }

  navigate(path) {
    if (this.router) {
      //Has to programmatically navigate due to RNG-3899
      this.router.navigate(path);
    }
  }
  render() {
    let childProps = {
      approot: appRoot,
      defaultAccountID: applicationData.defaultAccount,
      user: applicationData.user,
      appClient: applicationData.appClient
    };

    return (
      <MainLayout
        isNavigationVisible = {this.state.token!=undefined}
        accountApi={applicationData.accountListApi}
        //navApi={applicationData.navApi}
        navApi = "http://ec2-34-229-119-225.compute-1.amazonaws.com/user/nav"
        user={{email:this.state.email,username:this.state.email}}
        isHeaderVisible = {this.state.token!=undefined}
        isNavigationVisible = {!['http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/interviewForm','http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/authenticate'].includes(window.location.href)}
        onAccountChanged={this.onAccountChanged.bind(this)}
        userItemList={[
          { userItemName: "Sign Out", onClick: this.onSignOutClicked }
        ]}
        onNavigationLinkClicked={this.navigate.bind(this)}
        appClient={applicationData.appClient}
        isOperatorDisabled
      >
        <Locations
          childProps={childProps}
          ref={router => (this.router = router)}
          component={null}
        >
          <Location
            path="/"
            handler={MyApp}
            conf={applicationData.subApp}
            ref={this.appRefRegister.bind(this)}
          />
          <Location
            path={`/${appRoot}(/*)`}
            handler={MyApp}
            ref={this.appRefRegister.bind(this)}
            conf={applicationData.subApp}
            user={applicationData.user}
          />
        </Locations>
      </MainLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
