import React, { Component } from "react";
import {
  ActionPanel,
  Input,
  Button,
  Label,
  ButtonPanel,
  Icon,
  AlertBar
} from "@trycake/glaze-ui";
import {
  Column,
  Section,
  LayoutHandler,
  Container
} from "@trycake/glaze-ui/dist/components/Layout";

export default class ApplicationFlyer extends Component {
  getInitialStates = () => {
    let states = {
      profile: {
        name: "",
        description: ""
      },
      values: [],
      filedNameErrors: [],
      errors: {
        name: '',
        description: ''
      }
    };
    return Object.assign({}, states);
  };
  constructor(props) {
    super(props);
    this.state = this.getInitialStates();
  }
  componentDidMount() {
    this.addClick()
  }

  createUI() {
    return this.state.values.map((el, i) => {
      if (i > 0) {
        if (this.state.filedNameErrors[i] == undefined) this.state.filedNameErrors[i] = 'cannot be empty';
        return (<div key={i}>
          <LayoutHandler childrenSpaceLevel="one">
            <Container>
              <Section >

                <Column>
                  <Input type="text" value={el || ''}
                    placeholder={"field " + (i + 1)}
                    isError={this.state.filedNameErrors[i] != ''}
                    errorMessage={this.state.filedNameErrors[i]}
                    onChange={this.handleChange.bind(this, i)} />
                </Column>
                <Column>
                  <Button
                    type='secondary'
                    btnIcon={<Icon name='cross'
                      size='xx-small'
                      face='fill-carrot' />}
                    value='remove'
                    onClick={this.removeClick.bind(this, i)} />
                </Column>
              </Section>
            </Container>
          </LayoutHandler>
        </div>
        )
      }
      else {
        if (this.state.filedNameErrors[i] == undefined) this.state.filedNameErrors[i] = '';
        return (<div key={i}>
          <LayoutHandler childrenSpaceLevel="one">
            <Container>
              <Section >
                <Column>
                  <Input type="text" value={el || ''}
                    placeholder={"field " + (i + 1)}
                    isError={this.state.filedNameErrors[i] != ''}
                    errorMessage={this.state.filedNameErrors[i]}
                    onChange={this.handleChange.bind(this, i)} />
                </Column>
              </Section>
            </Container>
          </LayoutHandler>
        </div>
        )
      }

    })
  }

  handleChange(i, event) {
    let stateCopy = Object.assign({}, this.state)
    let values = [...stateCopy.values];
    let value = event.target.value
    if (values.includes(value) && values.indexOf(value) != i && value.length != 0) {
      stateCopy.filedNameErrors[i] = 'cannot be duplicated';
    }
    else if (value.length == 0) {
      stateCopy.filedNameErrors[i] = 'cannot be empty';
    }
    else {
      stateCopy.filedNameErrors[i] = '';

    }
    stateCopy.values[i] = value;
   // let err = stateCopy.filedNameErrors;
    this.setState(stateCopy);

  }

  addClick() {
    this.setState(prevState => ({ values: [...prevState.values, ''] }))
  }

  removeClick(i) {
    let values = [...this.state.values];
    let filedNameErrors = [...this.state.filedNameErrors];

    filedNameErrors.splice(i, 1)
    values.splice(i, 1);

    this.setState({ values, filedNameErrors });
  }

  hasErrors() {
    let hasErrors = false;
    this.state.filedNameErrors.forEach(err => {
      if (err != "") hasErrors = true;
    });
    if (this.state.profile.name.length == 0) {
      return true;
    }
    if (this.state.profile.description.length == 0) {
      return true;
    }
    if (this.state.values[0].length == 0) {
      return true;
    }
    return hasErrors;
  }

  //   componentWillReceiveProps(nextProps) {
  //     var stateCopy = this.getInitialStates();
  //     stateCopy.applications = nextProps.currentEdit;
  //     this.setState(stateCopy);
  //   }
  //   getHref(){
  //     if (window.location.href == "/")return "candidatemanager/precheckpage";
  //     if (window.location.href == "")return "/candidatemanager/precheckpage";
  //     else{
  //       return "/precheckpage";
  //     }
  //   }

  submitClicked() {
    
    let newProfile = this.state.profile;
    newProfile.profileFieldsById = [];

    this.state.values.forEach(fieldName => {
      newProfile.profileFieldsById.push(
        {
          fieldByFieldId:
          {
            name: fieldName,
            description: "default"
          }
        }
      );
      if(this.state.values.indexOf(fieldName)==this.state.values.length-1)this.props.createProfile(newProfile);
    });
  }

  render() {
    const content = (
      <div>
        <Section>
          <Column size={"full"}>
            <Label text="Name" />
            <Input
              placeholder={"Name"}
              value={this.state.profile.name}
              onChange={
                ({ target: { value } }) => {
                  this.state.profile.name = value
                  this.setState(this.state)
                }}
            />
          </Column>
          <Column size={"full"}>
            <Label text="Description" />
            <Input
              placeholder={"Description"}
              value={this.state.profile.description}
              onChange={
                ({ target: { value } }) => {
                  this.state.profile.description = value
                  this.setState(this.state)
                }}
            />
          </Column>
        </Section>
        <Label text="Included Fields" />
        {this.createUI()}
      </div>
    );

    return (
      <div>
        <ActionPanel
          isVisible={this.props.isAddProfileFlyerVisible}
          onClickOutside={() => {
            this.props.hideProfileFlyer();
            this.state = this.getInitialStates();
          }}
          contents={content}
          header="Add New Field"
          footer={
            <div>
               <AlertBar
                isDismissible={true}
                type={this.props.alertType}
                onDismiss={() => {
                  this.props.hideSaveAlert();
                  this.state = this.getInitialStates();
                }}
                message={{
                  header: this.props.alertMsg
                }}
                isVisible={this.props.isSaveAlertVisible}
              /> 
              <ButtonPanel
                buttonsList={[
                  {
                    type: "negative",
                    value: "Add New Field",
                    btnIcon: <Icon name='downwardArrow'
                      size='xx-small'
                      face='fill-carrot' />,
                    //isDisabled: this.state.transition.comment.length < 1,
                    onClick: () => {
                      this.addClick()
                    }
                  },
                  {
                    type: "primary",
                    value: "Submit",
                    isDisabled: this.hasErrors(),
                    //isDisabled: this.state.transition.comment.length < 1,
                    onClick: () => {
                      this.submitClicked();
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