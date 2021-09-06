import "./ListProgram.css";
import { DataGrid } from "@material-ui/data-grid";
import {
  Chip,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  Container,
} from "@material-ui/core";
import { Delete, Edit, Visibility, Search, Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ProgramDialog } from "../../components";
import { useState } from "react";

const useStyles = makeStyles({
  createButton: {
    marginLeft: "20px",
  },
});

export default function ListProgram() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);
  const history = useHistory();

  const handleOnManual = () => {
    setOpenDialog(false);
    history.push("/programs/create");
  };

  const handleOnTemplate = (program) => {
    setOpenDialog(false);
    history.push({ pathname: "/programs/create", state: { ...program } });
  };

  const columnDefaults = {
    disableColumnMenu: true,
    filterable: false,
    disableReorder: true,
    resizeable: false,
  };
  const columns = [
    {
      ...columnDefaults,
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      ...columnDefaults,
      sortable: false,
      field: "farmer",
      headerName: "Farmer",
      flex: 2,
      renderCell: (params) => {
        return (
          <div className="farmer-name">
            <img
              src={`https://avatars.dicebear.com/api/initials/${params.row.farmer.firstName} ${params.row.farmer.lastName}.svg`}
              className="farmer-avatar"
              alt="user"
            ></img>
            <span>
              {params.row.farmer.firstName} {params.row.farmer.lastName}
            </span>
          </div>
        );
      },
    },
    {
      ...columnDefaults,
      field: "crop",
      headerName: "Crop",
      flex: 2,
      renderCell: (params) => {
        return (
          <div className="crop-name">
            <img
              src={`${process.env.PUBLIC_URL}/images/${params.row.crop}.jpg`}
              className="crop-image"
              alt={params.row.crop}
            ></img>
            <span>{params.row.crop}</span>
          </div>
        );
      },
    },
    {
      ...columnDefaults,
      field: "nextMilestone",
      headerName: "Next Milestone",
      flex: 2,
      renderCell: (params) => {
        const date = new Date(params.row.nextMilestone).getTime();
        const today = new Date().getTime();
        const mDif = date - today;
        const dDif = Math.floor(mDif / (1000 * 60 * 60 * 24));

        let style = {
          backgroundColor: "#ebf1fe",
          color: "#2a7ade",
        };

        if (dDif < 0) {
          style = {
            backgroundColor: "#fff0f1",
            color: "#d95087",
          };
        } else if (dDif >= 0 && dDif < 8) {
          style = {
            backgroundColor: "#e5faf2",
            color: "#3bb077",
          };
        }

        return <Chip label={params.row.nextMilestone} style={style} />;
      },
    },
    {
      ...columnDefaults,
      sortable: false,
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <IconButton>
              <Visibility />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
          </div>
        );
      },
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
      nextMilestone: "September 6, 2021",
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
      crop: "Dasheen",
      nextMilestone: "September 10, 2021",
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
      crop: "Carrot",
      nextMilestone: "August 6, 2021",
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
      crop: "Dasheen",
      nextMilestone: "October 6, 2021",
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
      nextMilestone: "November 6, 2021",
    },
  ];

  return (
    <Container>
      <div className="header">
        <h1>Programs</h1>
        <div className="header-actions">
          <Input
            placeholder="Searh programs"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
          <IconButton
            onClick={() => setOpenDialog(true)}
            className={classes.createButton}
          >
            <Add />
          </IconButton>
          <IconButton color="secondary" disabled>
            <Delete />
          </IconButton>
        </div>
      </div>
      <div className="grid-container">
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={50}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
      <ProgramDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onManual={handleOnManual}
        onTemplate={handleOnTemplate}
      />
    </Container>
  );
}
