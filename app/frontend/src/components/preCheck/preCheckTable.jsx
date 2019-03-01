import React, { Component } from "react";
import { DataGrid } from "@trycake/glaze-ui";

let columnDefs = [
  {
    Header: "Name",
    accessor: "name",
    id: "name",
    sortable: true
  },
  {
    Header: "Status",
    id: "status",
    accessor: "status"
  },
  {
    Header: "Comment",
    id: "comment",
    accessor: "comment"
  },
  {
    Header: "NIC",
    id: "nic",
    accessor: "nic"
  },
  {
    Header: "E-mail",
    id: "email",
    accessor: "email"
  },
  {
    Header: "Contact Number",
    id: "phone",
    accessor: "phone"
  }
];

export default class PreCheckTable extends Component {

  render() {
    console.log("content",this.props.contents);
    return (
      <DataGrid
        defaultPageSize={10}
        data={this.props.contents === undefined ? [] : this.props.contents}
        noDataText="No data to show"
        columns={columnDefs}
        defaultSorted={[
          {
            id: "name",
            desc: false
          }
        ]}
        onGetTrProps={(state, rowInfo, column) => {
          return {
            style: {
              background:
                rowInfo.row.nic == this.props.nic ||
                rowInfo.row.email == this.props.email
                  ? "#e4e3e3"
                  : "white",
              color:
                rowInfo.row.nic == this.props.nic ||
                rowInfo.row.email == this.props.email
                  ? "white"
                  : "#5f5f5f"
            }
          };
        }}
        defaultSorting={[{ id: "name" }]}
        overflowContent="content-auto"
      />
    );
  }
}
