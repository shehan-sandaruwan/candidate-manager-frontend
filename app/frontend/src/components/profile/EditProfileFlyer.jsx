import React, { Component } from "react";
import {
  ActionPanel,
  Input,
  Label
} from "@trycake/glaze-ui";
import {
  Column,
  Section,
  Separator
} from "@trycake/glaze-ui/dist/components/Layout";

export default class EditProfileFlyer extends Component {
  getInitialStates = () => {
    let states = {
      profile: {
        name: "",
        description: "",
        profileFields:[]
      }
    };
    return Object.assign({}, states);
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }

  componentDidMount() {
    this.state = this.getInitialStates();
  }

  componentWillReceiveProps(nextProps) {
    var stateCopy = this.getInitialStates();
    stateCopy.profile = nextProps.profile;
    this.setState(stateCopy);
  }

  createUI(state) {
    return state.profile.profileFields.map(field => {
      return (
        <Input
          value={field.fieldByFieldId.name}
          disabled={true}
        />);
    });
  }

  render() {
    const content = (
      <Section>
        <Column size={"full"}>
          <Label text="Profile Name" />
          <Input
            placeholder={"Name"}
            disabled={true}
            value={this.state.profile.name}
          />
        </Column>
        <Column size={"full"}>
          <Label text="Description" />
          <Input
            placeholder={"Description"}
            value={this.props.profile.description}
            disabled={true}
          />
        </Column>
        <Separator size={"thin"} />
        <Column size={"full"}>
          <Label text="Profile Fields" />
          {this.createUI(this.state)}
        </Column>
      </Section>
    );

    return (
      <div>
        <ActionPanel
          isVisible={this.props.isSaveEditVisible}
          onClickOutside={() => {
            this.props.hideSaveEdit();
          }}
          contents={content}
          header="Profile"
        />
      </div>
    );
  }
}
