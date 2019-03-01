import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Section,
    Column,
    Layout
} from "@trycake/glaze-ui/dist/components/Layout";
import { getStates } from '../actions/state-actions';
import { DataGrid, TabbedPanel, Label, Input, } from "@trycake/glaze-ui";
import { getFeedbacks } from '../actions/feedback-actions'
import Cookies from 'js-cookie';
let columnDefs = [
    {
        Header: "ID",
        maxWidth: 100,
        accessor: "id",
        id: "id",
        show: false
    },

    {
        Header: "Date Time",
        accessor: "updatedTime2",
        maxWidth: 200,
        sortable: true
    },
    {
        Header: "State",
        accessor: "stateName",
        maxWidth: 200,
        sortable: true
    },
    {
        Header: "Changed By",
        accessor: "user",
        maxWidth: 200,
        sortable: true
    },
    {
        Header: "Comment",
        accessor: "comment",
        maxWidth: 600,
        sortable: true
    }

];


class trackApplication extends React.Component {



    getInitialStates = () => {
        let states = {
            application: Cookies.get('application'),
            schedules: [
                {
                    id : ''
                }
                ],
            feedbacks: Array(10).fill([{
                scheduleByScheduleId: {
                    interviewFormsById: []
                }
            }]),
            submitted: false
        };
        return Object.assign({}, states);
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialStates();
    }

    componentDidMount() {
        this.props.allStates(JSON.parse(this.state.application).id);
        this.state.schedules = JSON.parse(this.state.application).schedulesById;
        this.setState(this.state)
        async function getFeedbacks(context) {
            for (let i = 0; i < context.state.schedules.length; i++) {
                let element = context.state.schedules[i];
                await context.props.getFeedbacks(element.id)
                context.state.feedbacks[i] = context.props.allFeedbacks;
                console.log(context.state.feedbacks);
                context.setState(context.state);

            }
        }
        // this should get from backend
        
        getFeedbacks(this);
        this.state.submitted = true;
        this.setState(this.state);
    }

    findFromFeedbacks(profileByProfileId, fieldByFieldId, feedback) {
        for (var i = 0; i < this.state.feedbacks[feedback].length; i += 1) {
            if (this.state.feedbacks[feedback][i]['profileByProfileId'].id === profileByProfileId && this.state.feedbacks[feedback][i]['fieldByFieldId'].id === fieldByFieldId) {
                return i;
            }
        }
        return -1;
    }

    getRating(feedbackId, feedback) {
        if (feedbackId == -1) {
            return '';
        }
        return this.state.feedbacks[feedback][feedbackId].rating
    }

    getComment(feedbackId, feedback) {
        if (feedbackId == -1) {
            return '';
        }
        return this.state.feedbacks[feedback][feedbackId].comment
    }

    loadForm(feedback) {

        return this.state.feedbacks[feedback][0].scheduleByScheduleId.interviewFormsById.map((interviewForm) => {
            return (
                <div id={interviewForm.profileByProfileId.name} style={
                    {
                        'border-style': 'solid',
                        'border-width': '1px',
                        'border-color': 'orange',
                        'border-radius': '8px',
                        'color': '#847c7c',
                        'margin': '30px',
                        'padding': '40px',
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
                            'padding': '20px',
                            'margin': '15px',


                        }}>
                        {this.loadProfile(interviewForm.profileByProfileId, feedback)}
                    </div>

                </div>
            )
        });
    }


    loadProfile(profile, feedback) {
        return profile.profileFieldsById.map((profileField) => {

            let feedbackId = this.findFromFeedbacks(profile.id, profileField.fieldByFieldId.id, feedback);
            return (
                <div style={{
                    'height': '40px',
                    'margin': '10px'
                }}>
                    <div style={{ 'width': '15%', "float": "left", 'margin-top': '10', 'margin-bottom': '10' }}>
                        <Label text={profileField.fieldByFieldId.name} />
                    </div>
                    <div style={{ 'width': '15%', "float": "left", 'margin-left': '3%', 'height': '30px' }}>
                        <Input placeholder="rating out of 10"
                            value={this.getRating(feedbackId, feedback)}
                            disabled={this.state.submitted}
                        />
                    </div>
                    <div style={{ 'width': '60%', "float": "left", 'margin-left': '3%' }}>
                        <Input placeholder="comment (if exists)"
                            value={this.getComment(feedbackId, feedback)}
                            disabled={this.state.submitted}
                        />
                    </div>
                </div>

            )

        });

    }

    getShedule() {
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

    getTrace() {
        let application = JSON.parse(this.state.application);
        return (
            <Section sectionSpacing={true}>
                <div id="info-box" style={{
                    "border-width": "1px",
                    "border-style": "solid",
                    "width": "70%",
                    "border-color": "gainsboro",
                    "padding": "20px",
                    "border-radius": "5px",
                    "font-size": "medium",
                    "color": "gray",
                    "float": "left", "margin": 0
                }}>
                    <div id="pro-pic" style={{ "float": "left", "margin": 0, "width": "100px" }}><img src="https://visualpharm.com/assets/344/Male%20User-595b40b65ba036ed117d4d28.svg" height="80px"></img></div>
                    <div id="pro-detail" style={{ "float": "left", "margin": 0, "width": "66%" }}>
                        <h3>{application.firstName + " " + application.lastName}</h3>
                        <br />
                        <p>{application.email}
                            &nbsp;&nbsp;&nbsp;{application.positionByPositionId.name}
                        </p>
                    </div>
                </div>
                <br />
                <Column size={"full"}>
                    <DataGrid
                        defaultPageSize={10}
                        data={this.props.applicationStates}
                        noDataText="No data to show"
                        clickableRows={true}
                        columns={columnDefs}
                        defaultSorted={[
                            {
                                id: "id",
                                desc: false
                            }
                        ]}
                        onGetTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: e => {

                                },

                                onContextMenu: e => {
                                    e.preventDefault();
                                    if (e.type === 'click') {
                                        console.log('Left click');
                                    } else if (e.type === 'contextmenu') {
                                        console.log('Right click');
                                    }
                                }
                                //this.props.makeEditVisible(rowInfo.row._original);
                            }
                        }
                        }
                        overflowContent="content-auto"
                    />
                </Column>
            </Section>

        );
    }

    getTabs() {
        let tabs = [];
        this.state.schedules.forEach((element, i) => {
            tabs[i] = {
                name: this.state.feedbacks[i][0].scheduleByScheduleId.type,
                content: (
                    <div style={{
                        'margin': '30px'
                    }}>
                        {this.loadForm(i)}
                    </div>
                )
            }
        });
        return tabs;
    }


    render() {
        let application = JSON.parse(this.state.application);
        return (
            <Section sectionSpacing={true}>
                <Column size="full">
                    <h1>Trace of Candidate History</h1>
                    <Section >
                        <Column size="full">

                            <TabbedPanel
                                tabList={[{
                                    name: "History",
                                    content: (
                                        this.getTrace()

                                    )
                                }
                                ].concat(this.getTabs())
                                }
                            />
                        </Column>
                    </Section>
                </Column>
            </Section>


        )
    };
};

const mapStateToProps = (state, props) => {

    return {
        allFeedbacks: state.feedback.feedbacks,
        applicationStates: state.state.allStates.map(state => {
            state.updatedTime2 = state.updatedTime.substr(0, 19).replace("T", '\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
            if (state.userByUserId == null) {
                state.user = "-none-"
            }
            else {
                state.user = state.userByUserId.firstName + " " + state.userByUserId.lastName;
            }
            return state;
        })
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        allStates: getStates,
        getFeedbacks: getFeedbacks
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(trackApplication);
