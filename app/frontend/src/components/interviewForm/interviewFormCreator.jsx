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

class interviewFormCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [], name: '', description: '', filedNameErrors: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            else{
                if (this.state.filedNameErrors[i] == undefined) this.state.filedNameErrors[i] = '';
                return (<div key={i}>
                    <LayoutHandler childrenSpaceLevel="one">
                        <Container>
                            <Section >

                                <Column>
                                    <Input type="text" value={el || ''}
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
        let err = stateCopy.filedNameErrors;
        this.setState(stateCopy);

    }

    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }

    removeClick(i) {
        let values = [...this.state.values];
        let filedNameErrors = [...this.state.filedNameErrors];

        filedNameErrors.splice(i,1)
        values.splice(i, 1);

        this.setState({ values,filedNameErrors});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.values.join(', '));
        event.preventDefault();
    }

    render() {
        return (
            <div id="profile-creator" style={{
                'margin': '10px',
                'padding': '30px'
            }}>
                <Input type="text" placeholder="Profile Name" value={this.state.name} onChange={
                    ({ target: { value } }) => { this.state.name = value }} />
                <TextArea type="text" placeholder="Description" value={this.state.description} onChange={
                    ({ target: { value } }) => { this.state.description = value }} />
                <br/>
                <Label text="Included Fields"/>
                {this.createUI()}
                <Button type='negative'
                    btnIcon={<Icon name='downwardArrow'
                        size='xx-small'
                        face='fill-carrot' />}
                    value='add more'
                    onClick={this.addClick.bind(this)} />
                <Button type="primary" value="Submit" />
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {

    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({

    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(interviewFormCreator);
