import { IconButton, Typography } from '@material-ui/core';
import { Edit, PriorityHigh, Close, Description } from '@material-ui/icons';
import { compareDates } from '../../utils/compareDates';

const columnDefaults = {
  disableColumnMenu: true,
  filterable: false,
  disableReorder: true,
  resizeable: false,
};

export const createColumns = (onView, onEdit) => [
  {
    ...columnDefaults,
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => {
      return (
        <Typography variant="body1">{params.row.name}</Typography>
        // <div className="program-name">
        //   <img
        //     src={`${process.env.PUBLIC_URL}/images/${params.row.crop.name}.jpg`}
        //     className="crop-image"
        //     alt="user"
        //   ></img>
        //   <Typography variant="body1">{params.row.name}</Typography>
        // </div>
      );
    },
  },

  {
    ...columnDefaults,
    field: 'nextMilestone',
    headerName: 'Next Milestone',
    flex: 1,
    renderCell: (params) => {
      const date = new Date(params.row.nextMilestone);
      const today = new Date();
      const status = compareDates(date, today);

      return (
        <div className="next-milestone">
          <Typography variant="body1">{date.toLocaleDateString()} {status < 0 && <PriorityHigh color="error" fontSize="small" />}</Typography>
          
        </div>
      );
    },
  },
  {
    ...columnDefaults,
    sortable: false,
    field: 'farmer',
    headerName: 'Farmer',
    flex: 1,
    renderCell: (params) => {
      return (
        <Typography variant="body1">
          {params.row.farmer.firstName} {params.row.farmer.lastName}
        </Typography>
      );
    },
  },
  {
    ...columnDefaults,
    field: 'crop',
    headerName: 'Crop',
    flex: 1,
    renderCell: (params) => {
      return <Typography variant="body1">{params.row.crop.name}</Typography>;
    },
  },
  {
    ...columnDefaults,
    sortable: false,
    field: 'action',
    headerName: ' ',
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <IconButton onClick={(e) => onView(params.row._id)}>
            <Description color="primary" fontSize="small"/>
          </IconButton>
          <IconButton>
            <Edit color="action" fontSize="small" />
          </IconButton>
          <IconButton>
            <Close color="error" fontSize="small" />
          </IconButton>
        </div>
      );
    },
  },
];
