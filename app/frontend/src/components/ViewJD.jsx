import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Section, Column } from "@trycake/glaze-ui/dist/components/Layout";
import { TextArea } from "@trycake/glaze-ui";
import { getJob } from "../actions/job-actions";
import  "../../assets/css/viewJD.css";

class ViewJD extends React.Component {
    getInitialStates = () => {
        let states = {
            positionId: ""
        };
        return Object.assign({}, states);
    };
    constructor(props) {
        super(props);
        this.state = this.getInitialStates();
    }
    componentDidMount() {
        let stateCopy = this.getInitialStates();
        stateCopy.positionId = window.location.href.split("?")[1].split("=")[1];
        this.props.getJob(stateCopy.positionId);
        this.setState(stateCopy);
    }
    render() {
        return (
            <div className="wrapper" >
                <div className="innerWrapper" >
                    <Section>
                        <Column>
                            <Column>
                                <br /><br />
                                <div>
                                    <label className="positionLbl" >{this.props.job.name}</label>
                                    <div className="imgDiv">
                                        <img src="http://syscolabs.lk/wp-content/uploads/2017/08/illustration-male-engineer-Feature_1290x688_MS1-940x501-350x310.jpg" alt="" />
                                    </div>
                                </div>
                            </Column>
                        </Column>
                    </Section>
                    <Section>
                        <Column>
                            <br />
                            <TextArea value={this.props.job.description}
                                isDisabled={true}
                            />
                        </Column>
                    </Section>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        job: state.job.job
    };
};
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        getJob: getJob
    },
        dispatch);
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(ViewJD);