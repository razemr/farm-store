import * as React from "react";
import "./ProgramList.css";
import { DataGrid } from "@material-ui/data-grid";

export default function ProgramList() {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "farmer",
      headerName: "Farmer",
      valueGetter: (params) => {
          if(params.row.farmer) {
              return `${params.row.farmer.firstName} ${params.row.farmer.lastName}`
          } else {
              return "";
          }
        },
      flex: 1,
    },
    {
      field: "crop",
      headerName: "Crop",
      flex: 1,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
    },
  ];
  const rows = [
    {
      id: 1,
      name: "Pineapple Precise Management System",
      farmer: {
        firstName: "Ramone",
        lastName: "Graham",
      },
      startDate: "January 6, 2021",
      endDate: "December 6, 2021",
      company: "Newport Fersan",
      crop: "Pineapple",
    },
    {
      id: 2,
      name: "Pineapple Precise Management System",
      farmer: {
        firstName: "Sheree",
        lastName: "Bryan",
      },
      startDate: "January 6, 2021",
      endDate: "December 6, 2021",
      company: "Newport Fersan",
      crop: "Pineapple",
    },
    {
      id: 3,
      name: "Pineapple Precise Management System",
      farmer: {
        firstName: "Michael",
        lastName: "Williams",
      },
      startDate: "January 6, 2021",
      endDate: "December 6, 2021",
      company: "Newport Fersan",
      crop: "Pineapple",
    },
    {
      id: 4,
      name: "Pineapple Precise Management System",
      farmer: {
        firstName: "Ishamar",
        lastName: "Laing",
      },
      startDate: "January 6, 2021",
      endDate: "December 6, 2021",
      company: "Newport Fersan",
      crop: "Pineapple",
    },
    {
      id: 5,
      name: "Pineapple Precise Management System",
      farmer: {
        firstName: "Danielle",
        lastName: "Watson",
      },
      startDate: "January 6, 2021",
      endDate: "December 6, 2021",
      company: "Newport Fersan",
      crop: "Pineapple",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} pageSize={50} autoHeight />
        </div>
      </div>
    </div>
  );
}
