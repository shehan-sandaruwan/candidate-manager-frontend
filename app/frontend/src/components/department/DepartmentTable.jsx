import React, { Component } from "react";
import {
  Column,
  Section

} from "@trycake/glaze-ui/dist/components/Layout";
import { Button, DataGrid, SectionHeader } from "@trycake/glaze-ui";

let columnDefs = [
  {
    Header: "ID",
    accessor: "id",
    id: "id",
    show: true,
    sortable: true
  },
  {
    Header: "Name",
    id: "name",
    accessor: "name",
    show: true
  }
];



export default class DepartmentTable extends Component {
  render() {
    return (
      <Section sectionSpacing={true}>
        <Column size={"full"}>
          <SectionHeader
            sectionTitle={<h1>Departments</h1>}
            sectionAction={
              <Button
                type={"primary"}
                value="Add New Department"
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
            defaultSorting={[{ id: "name" }]}
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
