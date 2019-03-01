import React from "react";
import { Link } from "react-router-component";
import {Button, Icon} from "@trycake/glaze-ui";


export let columnDefsn = [
    {
      Header: "ID",
      accessor: "id",
      id: "id",
      show: false,
      sortable: true
    },
  
    {
      Header: "NIC",
      id: "nic",
      accessor: "nic",
      show: false
    },
    {
      Header: "Submitted Date",
      id: "submittedDate",
      accessor: "submittedDate",
      maxWidth: 150,
      show: true
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
      Header: "Position",
      id: "positionByPositionId.name",
      accessor: "positionByPositionId.name"
    },
    {
      Header: "Gender",
      id: "gender",
      accessor: "gender",
      show: false
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      show: true
    },
    {
      minWidth:50,
      maxWidth:200,
      Cell: function Cell(){
        return (
          <Link href = "precheckpage" 
          style={{"text-decoration": "none"}}>
            <Button value="Precheck" size="small" btnIcon="">
              <Icon name="forwardArrow" face="fill-delta"></Icon>
            </Button>
          </Link>
        );
    }
  }

  ];


 export let columnDeflineshortn = [
    {
      Header: "ID",
      accessor: "id",
      id: "id",
      show: false,
      sortable: true
    },
  
    {
      Header: "NIC",
      id: "nic",
      accessor: "nic",
      show: false
    },
    {
      Header: "Submitted Date",
      id: "submittedDate",
      accessor: "submittedDate",
      maxWidth: 150,
      show: true
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
      Header: "Position",
      id: "positionByPositionId.name",
      accessor: "positionByPositionId.name"
    },
    {
      Header: "Gender",
      id: "gender",
      accessor: "gender",
      show: false
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      show: true
    },
    
    {
      Header: "Last Employeed",
      id: "lastCompany",
      accessor: "lastCompany",
      show: true
    }
  ];


 export let columnDefHrn = [
    {
      Header: "ID",
      accessor: "id",
      id: "id",
      show: false,
      sortable: true
    },
  
    {
      Header: "NIC",
      id: "nic",
      accessor: "nic",
      show: false
    },
    {
      Header: "Submitted Date",
      id: "submittedDate",
      accessor: "submittedDate",
      maxWidth: 150,
      show: true
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
      Header: "Position",
      id: "positionByPositionId.name",
      accessor: "positionByPositionId.name"
    },
    {
      Header: "Gender",
      id: "gender",
      accessor: "gender",
      show: false
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      show: true
    },
    {
      Header: "University",
      id: "institute",
      accessor: "institute",
      show: true
    },
    {
      Header: "Last Employeed",
      id: "lastCompany",
      accessor: "lastCompany",
      show: true
    }
  ];


  export let columnDefsSelectn = [
    {
      Header: "ID",
      accessor: "id",
      id: "id",
      show: false,
      sortable: true
    },
  
    {
      Header: "NIC",
      id: "nic",
      accessor: "nic",
      show: false
    },
    {
      Header: "Submitted Date",
      id: "submittedDate",
      accessor: "submittedDate",
      maxWidth: 150,
      show: true
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
      Header: "Position",
      id: "positionByPositionId.name",
      accessor: "positionByPositionId.name"
    },
    {
      Header: "Gender",
      id: "gender",
      accessor: "gender",
      show: false
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      show: true
    }
    

  ];
  export let columnDefPreCheck = [
    {
      Header: "ID",
      accessor: "id",
      id: "id",
      show: false,
      sortable: true
    },
  
    {
      Header: "NIC",
      id: "nic",
      accessor: "nic",
      show: false
    },
    {
      Header: "Submitted Date",
      id: "submittedDate",
      accessor: "submittedDate",
      maxWidth: 150,
      show: true
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
      Header: "Position",
      id: "positionByPositionId.name",
      accessor: "positionByPositionId.name"
    },
    {
      Header: "Gender",
      id: "gender",
      accessor: "gender",
      show: false
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      show: true
    },
    {
      Header:"Comment",
      id:"comment",
      accessor:"comment",
    }

  ];
