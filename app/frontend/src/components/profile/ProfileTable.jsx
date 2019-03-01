import React, { Component } from "react";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import { SectionHeader, Button, DataGrid } from "@trycake/glaze-ui";

let columnDefsProfiles = [
    {
        Header: "ID",
        maxWidth: 100,
        accessor: "id",
        id: "id"
    },
    {
        Header: "Name",
        accessor: "name",
        sortable: true
    },
    {
        Header: "Description",
        id: "description",
        accessor: "description"
    }
];
export default class ProfileTable extends Component {
    render() {
        return (
            <Section sectionSpacing={true}>
                <Column size={"full"}>
                    <h1>Profile Management</h1>
                    <Section sectionSpacing={true}>
                        <Column size={"full"}>
                            <Column>
                                <br />
                                <SectionHeader
                                    sectionTitle={<h2>All Profiles</h2>}
                                    sectionAction={
                                        <Button
                                            type={"primary"}
                                            value="Add New Profile"
                                            size={"large"}
                                            onClick={() => {
                                                this.props.showAddProfileFlyer();
                                            }}
                                        />
                                    }
                                />
                                 <DataGrid
                                    defaultPageSize={25}
                                    data={this.props.allProfiles === undefined ? [] : this.props.allProfiles}
                                    noDataText="No data to show"
                                    clickableRows={true}
                                    columns={columnDefsProfiles}
                                    defaultSorted={[
                                        {
                                            id: "id",
                                            desc: true
                                        }
                                    ]}
                                    defaultSorting={[{ id: "id" }]}
                                    onGetTdProps={(state, rowInfo, column, instance) => {
                                        return {
                                            onClick: e => {
                                                this.props.makeEditVisible(rowInfo.row._original);
                                            }
                                        };
                                    }}
                                    overflowContent="content-auto"
                                /> 
                            </Column>
                        </Column>
                    </Section>
                </Column>
            </Section>
        );
    }
}