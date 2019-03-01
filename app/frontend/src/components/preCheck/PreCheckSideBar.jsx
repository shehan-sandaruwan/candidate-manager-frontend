import React, { Component } from "react";
import {
  AlertBar,
  ActionPanel,
  ButtonPanel,
  Input,
  Label
} from "@trycake/glaze-ui";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import Cookies from 'js-cookie';
export default class PreCheckSideBar extends Component {
  getInitialStates = () => {
    var states = {
      transition: {
        //userId: this.props.userId,
        applicationId: this.props.applicationId,
        stateName: "",
        isActive: 1,
        comment: ""
      }
    };
    return Object.assign({}, states);
  };
  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }
  
 
  render() {
    const content = (
      <Section>
        <Column size={"full"}>
          <Label text="Comment" />
          <Input
            placeholder={"This is mandatory"}
            value={this.state.transitioncomment}
            onChange={({ target: { value } }) => {
              let stateCopy = Object.assign({}, this.state);
              stateCopy.transition.comment = value;
              this.setState(stateCopy);
            }}
          />
        </Column>
      </Section>
    );

    return (
      <div>
        <ActionPanel
          isVisible={this.props.isVisible}
          onClickOutside={() => {
            this.props.hideSideBar();
          }}
          contents={content}
          header="Pre-Check"
          footer={
            <div>
              <AlertBar
                type={this.props.alertType}
                message={{
                  header: this.props.alertMsg
                }}
                isVisible={this.props.savealertVisible}
              />
              <ButtonPanel
                buttonsList={[
                  // {
                  //   type: "primary",
                  //   value: "Pass",
                  //   onClick: () => {
                  //     this.state.transition.stateName = "pre-checked";
                  //     this.state.transition.comment =
                  //       this.state.transition.comment.length < 1
                  //         ? "no comment"
                  //         : this.state.transition.comment;
                  //     this.props.updateState(this.state.transition);
                  //   }
                  // },
                  {
                    type: "negative",
                    value: "Reject",
                    isDisabled: this.state.transition.comment.length < 1,
                    onClick: () => {
                      this.state.transition.stateName = "pre-check-rejected";
                      this.props.updateState(this.state.transition);
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
