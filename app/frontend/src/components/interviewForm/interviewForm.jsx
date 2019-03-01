import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Section,
    Column,
    Container,
    LayoutHandler,
    Layout
} from "@trycake/glaze-ui/dist/components/Layout";
import {
    Label,
    Input,
    DropDown,
    Button,
    AlertBar,
    Icon,
    TextArea
} from "@trycake/glaze-ui";
import { DataGrid } from "@trycake/glaze-ui";
import Cookies from 'js-cookie';
import { saveFeedbacks, hideAlert } from '../../actions/feedback-actions'

class interviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {
                interviewFormsById: []
            },
            feedbacks: [],
            submitted: false
        }

    }
    componentDidMount() {
        this.state.schedule = JSON.parse(Cookies.get('schedule'));
        this.state.schedule.interviewFormsById.map((interviewForm) => {
            let profile = interviewForm.profileByProfileId;
            profile.profileFieldsById.map((profileField) => {
                if (this.findFromFeedbacks(profile.id, profileField.fieldByFieldId.id) == -1) {
                    this.state.feedbacks.push({
                        rating: '',
                        comment: '',
                        scheduleByScheduleId: { id: this.state.schedule.id },
                        fieldByFieldId: { id: profileField.fieldByFieldId.id },
                        profileByProfileId: { id: profile.id },
                        error: ''
                    });
                }
            });
            this.setState(this.state);
        });
    }

    findFromFeedbacks(profileByProfileId, fieldByFieldId) {
        for (var i = 0; i < this.state.feedbacks.length; i += 1) {
            if (this.state.feedbacks[i]['profileByProfileId'].id === profileByProfileId && this.state.feedbacks[i]['fieldByFieldId'].id === fieldByFieldId) {
                return i;
            }
        }
        return -1;
    }

    getRating(feedbackId) {
        if (feedbackId == -1) {
            return '';
        }
        return this.state.feedbacks[feedbackId].rating
    }

    getComment(feedbackId) {
        if (feedbackId == -1) {
            return '';
        }
        return this.state.feedbacks[feedbackId].comment
    }

    getError(feedbackId) {
        if (feedbackId == -1) {
            return '';
        }
        return this.state.feedbacks[feedbackId].error;
    }

    loadForm() {
        return this.state.schedule.interviewFormsById.map((interviewForm) => {

            return (
                <div id={interviewForm.profileByProfileId.name} style={
                    {
                        'border-style': 'solid',
                        'border-width': '1px',
                        'border-color': 'orange',
                        'border-radius': '8px',
                        'color': '#847c7c',
                        'padding': '20px',
                        'margin': '30px',
                        'margin-left':'0',
                        'height': 'auto'
                    }
                }>
                    <h2> {interviewForm.profileByProfileId.name}</h2>
                    <br />
                    <div style={
                        {
                            'border-style': 'solid',
                            'border-width': '1px',
                            'border-color': '#e4d7d7',
                            'border-radius': '8px',
                            'padding': '50px',
                            'margin': '30px'

                        }}>
                        {this.loadProfile(interviewForm.profileByProfileId)}
                    </div>

                </div>
            )
        });
    }

    submitClicked = () => {

        this.props.saveFeedbacks(this.state.feedbacks);
        this.state.submitted = true;
        this.setState(this.state);
        Cookies.set('feed-back-given','done');
    };

    canSubmit() {
        if (this.state.submitted) {
            return false;
        }
        else {
            for (let index = 0; index < this.state.feedbacks.length; index++) {
                const feedback = this.state.feedbacks[index];
                if (feedback.rating == '') return false;
                else if (feedback.error != '') return false;

            }
            return true;

        }
    }

    loadProfile(profile) {
        return profile.profileFieldsById.map((profileField) => {

            let feedbackId = this.findFromFeedbacks(profile.id, profileField.fieldByFieldId.id);
            return (
                <div style={{
                    'height': '40px',
                    'margin': '10px'
                }}>
                    <div style={{ 'width': '15%', "float": "left", 'margin-top': '10' }}>
                        <Label text={profileField.fieldByFieldId.name} />
                    </div>
                    <div style={{ 'width': '15%', "float": "left", 'margin-left': '3%', 'height': '30px' }}>
                        <Input placeholder="rating out of 10"
                            value={this.getRating(feedbackId)}
                            disabled={this.state.submitted}
                            isError={this.getError(feedbackId) != ''}
                            errorMessage={this.getError(feedbackId)}
                            onChange={
                                ({ target: { value } }) => {
                                    this.state.feedbacks[feedbackId].rating = value
                                    if (value == '' || value.length == 0) {
                                        this.state.feedbacks[feedbackId].error = 'cannot be empty'
                                    }
                                    else if (value == 'n/a') {
                                        this.state.feedbacks[feedbackId].error = ''
                                    }
                                    else if (!/^\d+$/.test(value)) {
                                        this.state.feedbacks[feedbackId].error = 'number or n/a expected'
                                    }
                                    else if (value > 10 || value < 0) {
                                        this.state.feedbacks[feedbackId].error = '0-10 rating is allowed.'
                                    }
                                    else {
                                        this.state.feedbacks[feedbackId].error = ''
                                    }
                                    this.setState(this.state);

                                }}
                        />
                    </div>
                    <div style={{ 'width': '60%', "float": "left", 'margin-left': '3%' }}>
                        <Input placeholder="comment (if exists)"
                            value={this.getComment(feedbackId)}
                            disabled={this.state.submitted}
                            onChange={
                                ({ target: { value } }) => {
                                    this.state.feedbacks[feedbackId].comment = value
                                    this.setState(this.state)
                                    console.log(this.state.feedbacks);

                                }}
                        />
                    </div>
                </div>

            )

        });

    }

    render() {
        return (
            <Layout footer={
                <AlertBar
                    type={this.props.alertType}
                    isDismissible={true}
                    onDismiss={() => {
                        this.props.hideAlert();
                        //this.state = this.getInitialStates();
                        this.setState(Object.assign({}, this.state));
                    }}
                    message={{ header: this.props.alertMsg }
                    }
                    isVisible={this.props.alertVisible}
                    isSingleLine={false}
                />}
            >
                <div style = {{
                        'margin': '30'
                       
                }}>
                    
                    <Column size='full'>
                    {this.loadForm()}
                    <Button size = 'x-large' isDisabled={!this.canSubmit()} type="primary" value="Submit" onClick={this.submitClicked} />
                    </Column>
                </div>
            </Layout>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {
        alertMsg: state.feedback.alertMsg,
        alertVisible: state.feedback.alertVisible,
        alertType: state.feedback.alertType,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        saveFeedbacks: saveFeedbacks,
        hideAlert: hideAlert

    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(interviewForm);
