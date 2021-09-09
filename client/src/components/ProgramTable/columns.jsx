import { IconButton } from '@material-ui/core';
import { Edit, Visibility, PriorityHigh, Close } from '@material-ui/icons';
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
        <div className="crop-name">
          <img
            src={`${process.env.PUBLIC_URL}/images/${params.row.crop.name}.jpg`}
            className="crop-image"
            alt="user"
          ></img>
          <span>
            {params.row.name}
          </span>
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
      return (<>{params.row.farmer.firstName} {params.row.farmer.lastName}</>)
    },
  },
  {
    ...columnDefaults,
    field: 'crop',
    headerName: 'Crop',
    flex: 1,
    renderCell: (params) => {
      return params.row.crop.name;
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
        <div>
          <span>{date.toDateString()}</span>
          {status < 0 && <IconButton color="secondary">
            <PriorityHigh />
          </IconButton>}
        </div>
      );
    },
  },
  {
    ...columnDefaults,
    sortable: false,
    field: 'action',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <IconButton onClick={(e) => onView(params.row._id)} color="primary">
            <Visibility />
          </IconButton>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton color="secondary">
            <Close />
          </IconButton>
        </div>
      );
    },
  },
];
