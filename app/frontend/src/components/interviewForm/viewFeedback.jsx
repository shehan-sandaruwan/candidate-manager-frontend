import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Column,
    Layout
} from "@trycake/glaze-ui/dist/components/Layout";
import {
    Label,
    Input
} from "@trycake/glaze-ui";
import { getFeedbacks } from '../../actions/feedback-actions'

class viewFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {
                interviewFormsById: []
            },
            feedbacks: [{scheduleByScheduleId : {
                interviewFormsById : []
            }}],
            submitted: false
        }

    }


    componentDidMount() {
        async function getFeedbacks(context) {
            await context.props.getFeedbacks(context.state.schedule.id)
            console.log(context.props.allFeedbacks);
            context.state.feedbacks = context.props.allFeedbacks;
            context.setState(context.state);

        }

        this.state.schedule = {
            id : 1
        }
        getFeedbacks(this);
        this.state.submitted = true;
        this.setState(this.state);

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

    loadForm() {
        return this.state.feedbacks[0].scheduleByScheduleId.interviewFormsById.map((interviewForm) => {

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
                        'margin-left': '0',
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
                        />
                    </div>
                    <div style={{ 'width': '60%', "float": "left", 'margin-left': '3%' }}>
                        <Input placeholder="comment (if exists)"
                            value={this.getComment(feedbackId)}
                            disabled={this.state.submitted}
                        />
                    </div>
                </div>

            )

        });

    }

    render() {
        return (
            <Layout >
                <div style={{
                    'margin': '30'

                }}>

                    <Column size='full'>
                        {this.loadForm()}
                    </Column>
                </div>
            </Layout>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {
        allFeedbacks: state.feedback.feedbacks
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        getFeedbacks: getFeedbacks

    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(viewFeedback);
