import React, { Component } from "react";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import { DataGrid, Button, SectionHeader, TabbedPanel } from "@trycake/glaze-ui";

let columnDefsAll = [
  {
    Header: "ID",
    maxWidth: 100,
    accessor: "id",
    id: "id"
  },
  {
    Header: "First Name",
    accessor: "firstName",
    sortable: true
  },
  {
    Header: "Last Name",
    id: "lastName",
    accessor: "lastName"
  },
  {
    Header: "E-mail",
    id: "email",
    accessor: "email"
  }
];

let columnDefsPriviledge = [
  {
    Header: "ID",
    maxWidth: 100,
    accessor: "id",
    id: "id",
    sortable: true
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Position",
    accessor: "position",
    sortable: true
  },
  {
    Header: "Shortlister",
    accessor: "canShortList"
  },
  {
    Header: "Interviewer",
    accessor: "canInterview"
  }
];

let columnDefsAdmin = [
  {
    Header: "ID",
    maxWidth: 100,
    accessor: "id",
    id: "id",
    sortable: true
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Admin",
    accessor: "isAdmin"
  },
  {
    Header: "Super Admin",
    accessor: "isSuperAdmin"
  }
];

export default class UserTable extends Component {
  render() {
    return (
      <Section sectionSpacing={true}>
        <Column size="full">
          <h1>User Management</h1>
          <Section sectionSpacing={true}>
            <Column size="full">
              <TabbedPanel
                tabList={[{
                  name: "All",
                  content: (<Column>
                    <br />
                    <SectionHeader
                      sectionTitle={<h2>All Users</h2>}
                      sectionAction={
                        <Button
                          type={"primary"}
                          value="Add New User"
                          size={"large"}
                          onClick={() => {
                            this.props.makeEditVisible();
                          }}
                        />
                      }
                    />
                    <DataGrid
                      defaultPageSize={25}
                      data={this.props.contentUsers === undefined ? [] : this.props.contentUsers}
                      noDataText="No data to show"
                      clickableRows={true}
                      columns={columnDefsAll}
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
                  </Column>)
                }, {
                  name: "Privilege",
                  content: (<Column>
                    <br />
                    <SectionHeader
                      sectionTitle={<h2>User Privileges</h2>}
                      sectionAction={
                        <Button
                          type={"primary"}
                          value="Assign Privileges"
                          size={"large"}
                          onClick={() => {
                            this.props.makePrivilegeEditVisible();
                          }}
                        />
                      }
                    />
                    <DataGrid
                      defaultPageSize={25}
                      data={this.props.contentPrivileges === undefined ? []
                        : this.props.contentPrivileges.map((privilege) => {
                          if (privilege.userByUserId && privilege.positionByPositionId) {
                            return {
                              id: privilege.id,
                              name: privilege.userByUserId.firstName + " " + privilege.userByUserId.lastName,
                              userId: privilege.userByUserId.id,
                              email: privilege.userByUserId.email,
                              positionId: privilege.positionByPositionId.id,
                              position: privilege.positionByPositionId.name,
                              canShortList: privilege.canShortList === 1 ? "Yes" : "No",
                              canInterview: privilege.canInterview === 1 ? "Yes" : "No"
                            }
                          }
                        })
                      }
                      noDataText="No data to show"
                      clickableRows={true}
                      columns={columnDefsPriviledge}
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
                            this.props.makePrivilegeEditVisible(rowInfo.row._original);
                          }
                        };
                      }}
                      overflowContent="content-auto"
                    />
                  </Column>)
                }, {
                  name: "Admin",
                  content: (<Column>
                    <br />
                    <SectionHeader
                      sectionTitle={<h2>System Administration</h2>}
                      sectionAction={
                        <Button
                          type={"primary"}
                          value="Create Admins"
                          size={"large"}
                          onClick={() => {
                            this.props.makeAdminEditVisible();
                          }}
                        />
                      }
                    />
                    <DataGrid
                      defaultPageSize={25}
                      data={this.props.contentAdmins === undefined ? []
                        : this.props.contentAdmins.map((admin) => {
                          if (admin.userByUserId) {
                            return {
                              id: admin.id,
                              userId: admin.userByUserId.id,
                              name: admin.userByUserId.firstName + " " + admin.userByUserId.lastName,
                              isSuperAdmin: admin.isSuperAdmin === 1 ? "Yes" : "No",
                              isAdmin: admin.isAdmin === 1 ? "Yes" : "No"
                            }
                          }
                        })
                      }
                      noDataText="No data to show"
                      clickableRows={true}
                      columns={columnDefsAdmin}
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
                            this.props.makeAdminEditVisible(rowInfo.row._original);
                          }
                        };
                      }}
                      overflowContent="content-auto"
                    />
                  </Column>)
                }]} />
            </Column>
          </Section>
        </Column>
      </Section>
    );
  }
}
