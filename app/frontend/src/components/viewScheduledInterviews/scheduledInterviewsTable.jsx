import React, { Component } from "react";
import { DataGrid} from "@trycake/glaze-ui";

let columnDefs = [
  {
    Header: "Date",
    accessor: "date",
    id: "date",
    sortable: true
  },
  {
    Header: "Time",
    id: "proposedTime",
    accessor: "proposedTime"
  },
  {
    Header: "Place",
    id: "venue",
    accessor: "venue"
  },
  {
    Header: "Candidate Name",
    id: "candidateName",
    accessor: "candidateName"
  },
  {
    Header: "Position",
    id: "applicationByApplicationId.positionByPositionId.name",
    accessor: "applicationByApplicationId.positionByPositionId.name"
  },
  {
    Header: "Interviewers",
    id: "panel",
    accessor: "panel"
  }
];

export default class ScheduledInterviewsTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DataGrid
          defaultPageSize={25}
          data={this.props.contents === undefined ? [] : this.props.contents}
          noDataText="No data to show"
          columns={columnDefs}
          showPagination={false}
          clickableRows={true}
          defaultSorted={[
            {
              id: "date",
              desc: false
            }
          ]}
          onGetTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                this.props.makeEditVisible(rowInfo.row._original);
              }
            };
          }}
          defaultSorting={[{ id: "date" }]}
          overflowContent="content-auto"
        />
      </div>
    );
  }
}
