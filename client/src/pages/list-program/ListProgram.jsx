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
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";

const useStyles = makeStyles({
  createButton: {
    marginLeft: "20px",
  },
});

export default function ListProgram() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();
  const { listItems, programs } = useContext(GlobalContext);

  useEffect(() => {
    listItems("programs");
  }, []);

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
              src={`${process.env.PUBLIC_URL}/images/${params.row.crop.name}.jpg`}
              className="crop-image"
              alt={params.row.crop.name}
            ></img>
            <span>{params.row.crop.name}</span>
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
            <IconButton onClick={e => history.push(`/programs/${params.row._id}`)}>
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
            rows={programs}
            getRowId={(row) => row._id}
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
