import React, { Component } from "react";
import { DataGrid} from "@trycake/glaze-ui";

let columnDefs = [
  {
    Header: "Name",
    accessor: "name",
    id: "name",
    sortable: true
  },
  {
    Header: "position",
    id: "position",
    accessor: "positionByPositionId.name"
  },
  {
    Header: "Applied Date",
    id: "createdTime",
    accessor: "createdTime"
  },
  {
    Header: "E-mail",
    id: "email",
    accessor: "email"
  },
  {
    Header: "Phone No.",
    id: "contactNumber",
    accessor: "contactNumber"
  }
];

export default class LineShortlistTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateId: 0,
      sideBarVisible: false
    };
  }
  render() {
    //console.log("data",this.props.contents);
    return (
      <div>
        <DataGrid
          defaultPageSize={10}
          data={this.props.contents === undefined ? [] : this.props.contents}
          noDataText="No data to show"
          columns={columnDefs}
          clickableRows={true}
          showPagination={false}
          defaultSorted={[
            {
              id: "name",
              desc: false
            }
          ]}
          onGetTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                this.props.showSideBar(rowInfo.row._original);
              }
            };
          }}
          defaultSorting={[{ id: "name" }]}
          overflowContent="content-auto"
        />
      </div>
    );
  }
}
