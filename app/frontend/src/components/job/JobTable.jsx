import React, { Component } from "react";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import { DataGrid, Button, SectionHeader } from "@trycake/glaze-ui";

let columnDefs = [
  {
    Header: "ID",
    maxWidth: 30,
    accessor: "id",
    id: "id"
  },
  {
    Header: "Job Name",
    accessor: "name",
    maxWidth: 250,
    sortable: true
  },
  {
    Header: "Job Description",
    id: "description",
    accessor: "description"
  },

  {
    Header: "Department",
    id: "department",
    maxWidth: 100,
    accessor: "department",
    show: true
  },
  {
    Header: "Availability",
    id: "isOpenstate",
    maxWidth: 100,
    accessor: "isOpenstate",
    show: true
  },
  {
    Header: "Date ",
    id: "created_time",
    accessor: "created_time",
    show: true
  }
];

export default class JobTable extends Component {
  render() {
    return (
      <Section sectionSpacing={true}>
        <Column size={"full"}>
          <SectionHeader
            sectionTitle={<h1>Job Management</h1>}
            sectionAction={
              <Button
                type={"primary"}
                value="Add New Job"
                size={"large"}
                onClick={() => {
                  this.props.makeEditVisible();
                }}
              />
            }
          />
          <DataGrid
            defaultPageSize={25}
            data={this.props.contents === undefined ? [] : this.props.contents}
            noDataText="No data to show"
            clickableRows={true}
            columns={columnDefs}
            defaultSorted={[
              {
                id: "id",
                desc: true
              }
            ]}
            defaultSorting={[{ id: "fullName" }]}
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
      </Section>
    );
  }
}
