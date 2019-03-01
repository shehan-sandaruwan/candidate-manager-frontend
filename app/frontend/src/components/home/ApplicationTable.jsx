import React, { Component } from "react";
import { Column, Section } from "@trycake/glaze-ui/dist/components/Layout";
import { DataGrid, Button, Icon} from "@trycake/glaze-ui";
import Cookies from "js-cookie";
import  "@trycake/glaze-ui/dist/css/glaze-ui-components.css"
import { Link } from "react-router-component";
import {columnDefsn, columnDeflineshortn, columnDefHrn, columnDefsSelectn,columnDefPreCheck} from "./columnDefs"





export default class ApplicationTable extends Component {
  
 
  constructor() {
    super();
    this.state = {
      isDialogOpen: "block"
    };
  }

  openDialog = () =>
    this.setState({
      isDialogOpen: "block"
    });

  handleClose = () => this.setState({ isDialogOpen: "none" });
  candidates = [];
  componentWillUpdate(nextProps){
    if(this.props.selectedState === "pre-checked"){
      this.candidates = [];
      nextProps.contents.map(candidate =>{
        if(candidate.schedulesById.length == 0){
          candidate.comment = "";
            this.candidates.push(candidate);
        }
        else{
          candidate.comment = "on hold";
          this.candidates.push(candidate);
        }
    })
    }
   
  }


  render() {

    //Passing the appropriate column definition aacording to the selected state
    let columnstuct = null;
    if (this.props.selectedState === "hr-short-listed") {
      columnstuct = columnDefHrn;
    } else if (this.props.selectedState === "line-short-listed"){
      columnstuct = columnDeflineshortn;
    }
    else if(this.props.selectedState === "pre-checked"){
      columnstuct = columnDefPreCheck;
    }
    else if (this.props.selectedState === "selected" || 
    this.props.selectedState === "interview-scheduled" ||
    this.props.selectedState === "interviewed" ) {
    columnstuct = columnDefsSelectn;

    } else {
      columnstuct = columnDefsn;
    }
  
   
   
   
    return (
      <Section sectionSpacing={true}>
        <Column size={"full"}>
          <DataGrid
            defaultPageSize={25}
            data={this.props.contents === undefined ? [] 
              :
              this.props.selectedState === "pre-checked" ? this.candidates:this.props.contents
              }
            
            noDataText="No data to show"
            clickableRows={false}
            columns={columnstuct}
            //columns = {this.props.selectedState === "submitted"  ? columnDefs : columnDefsHr}

            defaultSorted={[
              {
                id: "createdTime",
                desc: true
              }
            ]}
            defaultSorting={[{ id: "firstName" }]}
            onGetTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: e => {
                  if (this.props.selectedState === "submitted") {
                    this.props.makeEditVisible(rowInfo.row._original);
                  } else if (this.props.selectedState === "pre-checked") {
                    this.props.makeHRShortListVisible(rowInfo.row._original);
                    this.props.getSpecificPrivilegedUsers(
                      rowInfo.row._original.positionByPositionId.id,
                      "short-list"
                    );
                  } else if (
                    this.props.selectedState === "line-short-listed" ||
                    this.props.selectedState === "interviewed"
                  ) {
                    this.props.makeScheduleInterviewVisible(
                      rowInfo.row._original,
                      this.props.selectedState
                    );
                    this.props.getSpecificPrivilegedUsers(
                      rowInfo.row._original.positionByPositionId.id,
                      "interview"
                    );
                  } else if (
                    this.props.selectedState === "interview-scheduled"
                  ) {
                    this.props.makeScheduleEditVisible(rowInfo.row._original);
                    this.props.getSpecificPrivilegedUsers(
                      rowInfo.row._original.positionByPositionId.id,
                      "interview"
                    );
                  } 
                  else if ( this.props.selectedState === "selected"){
                    this.props.makeacceptVisible(rowInfo.row._original);

                  }
                  
                  else {
                    alert("not authorized");
                  }
                },
                onContextMenu: e => {
                  e.preventDefault();
                  if (e.type === "contextmenu") {
                    Cookies.set("application", rowInfo.row._original);
                    console.log(rowInfo.row._original);
                    window.open("/candidatemanager/track");
                  }
                }
              };
            }}
            overflowContent="content-auto"
            // loading = {true}
            filterable = {true}
          />
          {/* <div
            id="dialog-box"
            style={{
              display: this.state.isDialogOpen,
              left: "20%",
              top: "30%",
              position: "absolute",
              width: "60%",
              "border-style": "solid",
              "border-width": "1px",
              "border-color": "orange",
              "border-radius": "8px",
              color: "#847c7c",
              background: "white",
              "font-size": "30px",
              padding: "30px"
            }}
          >
            <center>
              <p>Right click on a application to view full trace.</p>
              <br />
              <br />
              <Button onClick={this.handleClose} size="large" value="OK" />
            </center>
          </div> */}
        </Column>
      </Section>
    );
  }
}
