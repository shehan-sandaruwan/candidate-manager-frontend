import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {

    Section,
    Layout,
    Column
} from "@trycake/glaze-ui/dist/components/Layout";
import {
    Input,
    Button,
    AlertBar
} from "@trycake/glaze-ui";
import { sendEmail, hideAlert } from "../actions/auth-action";

class LogingPage extends React.Component {
    getInitialStates = () => {
        let states = {
            authUser: {
                email: ""
            },
            errors: {
                hasError: true,
                email: false
            },
            errorMessages: {
                email: false
            }
        };
        return Object.assign({}, states);
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialStates();
    }

    isSysco = function (email) {
        email = email.toLowerCase();
        let sysco = email.length >= "sysco.com".length && email.substr(email.length - "sysco.com".length) == "sysco.com";
        let syscoLabs = email.length >= "syscolabs.com".length && email.substr(email.length - "syscolabs.com".length) == "syscolabs.com";
        return sysco || syscoLabs;
    }

    submitClicked = () => {
        console.log(this.state.authUser);
        this.props.sendEmail(this.state.authUser);
    };

    checkMandatory = () => {

    };

    componentDidMount() {

    }

    render() {
        return (

            <Layout footer={
                <AlertBar
                    type={this.props.alertType}
                    isDismissible={true}
                    onDismiss={() => {
                        this.props.hideAlert();
                        this.state = this.getInitialStates();
                        this.setState(Object.assign({}, this.state));
                    }}
                    message={{ header: this.props.alertMsg }
                    }
                    isVisible={this.props.alertVisible}
                    isSingleLine={false}
                />}
            >
                <div id="logo">
                    <img src="http://s3.amazonaws.com/public-ziprecruiter/uploads/2cd5bdb0.jpeg" alt="SyscoLABS" width="196"
                        height="40" />
                </div>
                <Section sectionSpacing={true}>
                    <Column md={2} align="center">

                        <Section sectionSpacing={true}>

                            <div id="login-form" style={{
                                'margin': 50, 'padding': 20, 'width': '100%', 'margin-left': '10%',
                                'margin-right': '10%',
                                'border-style': 'solid',
                                'border-width': '1px',
                                'border-color': 'orange',
                                'border-radius': '8px'
                            }}>
                                <h1>User Login</h1>
                                <br />
                                <Input
                                    placeholder="Email"
                                    id={"email"}
                                    value={this.state.authUser.email}
                                    isError={this.state.errors.email}
                                    errorMessage={this.state.errorMessages.email}
                                    onChange={({ target: { value } }) => {
                                        let stateCopy = Object.assign({}, this.state);
                                        this.checkMandatory();
                                        if (!this.validateEmail(value)) {
                                            stateCopy.errorMessages.email = "Invalid email";
                                            stateCopy.errors.email = true;
                                            stateCopy.errors.hasError = true;
                                        } else {
                                            stateCopy.errors.email = false;
                                            stateCopy.errors.hasError = false;
                                        }
                                        stateCopy.authUser.email = value;
                                        this.setState(stateCopy);
                                    }}
                                />
                                <Button
                                    type="primary"
                                    value="Submit"
                                    onClick={this.submitClicked}
                                    size="large"
                                    isDisabled={this.state.errors.hasError}
                                    />                           
                            </div>
                            
                        </Section>
                    </Column>

                </Section>
            </Layout >

        );
    }
    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) && this.isSysco(email);
    };
}

const mapStateToProps = (state, props) => {
    console.log(state)
    return {
        alertMsg: state.loging.alertMsg,
        alertVisible: state.loging.alertVisible,
        alertType: state.loging.alertType,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        sendEmail: sendEmail,
        hideAlert: hideAlert

    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LogingPage);
