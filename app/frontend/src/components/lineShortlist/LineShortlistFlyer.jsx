import React, { Component } from "react";
import {
  AlertBar,
  ActionPanel,
  ButtonPanel,
  Input,
  Label
} from "@trycake/glaze-ui";
import {
  Column,
  Section,
  Separator
} from "@trycake/glaze-ui/dist/components/Layout";

export default class LineShortlistFlyer extends Component {
  getInitialStates = () => {
    var states = {
      transition: {
        applicationId: this.props.applicationId,
        stateName: "",
        comment: "",
        isActive: 1
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
        <Column>
          <ButtonPanel
            buttonsList={[
              {
                type: "primary",
                value: "View CV",

                onClick: () => {
                  window.open(
                    "https://drive.google.com/file/d/0BxYUMbIl_5w-UDNhRk9nTWp6TDg/view?usp=sharing",
                    "piuymi"
                  );
                }
              },
              {
                type: "primary",
                value: "View JD",
                onClick: () => {
                  window.open('http://ec2-34-229-119-225.compute-1.amazonaws.com/candidatemanager/viewjd/?positionId=' + this.props.currentEdit.positionByPositionId.id)
                }
              },
              {
                type: "primary",
                value: "Roll Back",
                onClick: () =>{
                  console.log("hii");
                  this.state.transition.applicationId = this.props.applicationId;
                  this.state.transition.stateName = "pre-checked"
                  this.state.transition.comment = "hr-shortlist-rollback"
                  this.props.lineShortlistedRollback(this.state.transition);
                }
              }
            ]} 
          />
        </Column>

        <Separator size={"thin"} />

        <Column size={"full"}>
          <Label text="Comment" />
          <Input
            placeholder={"This is mandatory"}
            value={this.state.transition.comment}
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
          header="Line Shortlist"
          footer={
            <div>
              <AlertBar
                isDismissible={true}
                type={this.props.alertType}
                message={{
                  header: this.props.alertMsg
                }}
                isVisible={this.props.savealertVisible}
                onDismiss={() => {
                  this.props.hideSideBar();
                }}
              />
              <ButtonPanel
                buttonsList={[
                  {
                    type: "primary",
                    value: "Pass",
                    isDisabled: this.state.transition.comment.length < 1,
                    onClick: () => {
                      this.state.transition.applicationId = this.props.applicationId;
                      this.state.transition.stateName = "line-short-listed";
                      this.props.updateState(this.state.transition);
                      this.state = this.getInitialStates();
                    }
                  },
                  {
                    type: "negative",
                    value: "Reject",
                    isDisabled: this.state.transition.comment.length < 1,
                    onClick: () => {
                      this.state.transition.applicationId = this.props.applicationId;
                      this.state.transition.stateName = "line-rejected";
                      this.props.updateState(this.state.transition);
                      this.state = this.getInitialStates();
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
