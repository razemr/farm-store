import { Chip, Typography } from '@material-ui/core';
import { Edit, Close, Visibility } from '@material-ui/icons';
import { getMilestoneStatus } from '../../utils/getMilestoneStatus';
import { MILESTONE_STATUS as STATUS } from '../../utils/constants';

export const createColumns = (onView, onEdit, onDelete) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => {
      return <Typography variant="body1">{params.row.name}</Typography>;
    },
  },
  {
    sortable: false,
    field: 'status',
    headerName: 'Status',
    flex: 2,
    renderCell: (params) => {
      const status = params.row.completed
        ? STATUS.COMPLETE
        : getMilestoneStatus(new Date(params.row.nextMilestone));
      return (
        <Chip
          style={
            status === STATUS.NOT_DUE
              ? { backgroundColor: '#e0e0e080', color: '#9e9e9e' }
              : status === STATUS.OVERDUE
              ? { backgroundColor: '#e5737380', color: '#d32f2f' }
              : status === STATUS.COMPLETE
              ? { backgroundColor: '#81c78480', color: '#388e3c' }
              : { backgroundColor: '#ffb74d80', color: '#f57c00' }
          }
          size="small"
          label={
            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
              {status}
            </Typography>
          }
        ></Chip>
      );
    },
  },
  {
    field: 'nextMilestone',
    headerName: 'Next Milestone',
    flex: 2,
    renderCell: (params) => {
      const date = new Date(params.row.nextMilestone);
      return (
        <Typography variant="body1">
          {!params.row.completed ? date.toLocaleDateString() : '-'}
        </Typography>
      );
    },
  },
  {
    field: 'farmerName',
    headerName: 'Farmer',
    flex: 2,
    renderCell: (params) => {
      return <Typography variant="body1">{params.row.farmerName}</Typography>;
    },
  },
  {
    field: 'parishName',
    headerName: 'Parish',
    flex: 2,
    renderCell: (params) => {
      return <Typography variant="body1">{params.row.parishName}</Typography>;
    },
  },
  {
    field: 'radaExtensionName',
    headerName: 'Extension',
    flex: 2,
    renderCell: (params) => {
      return (
        <Typography variant="body1">{params.row.radaExtensionName}</Typography>
      );
    },
  },
  {
    sortable: false,
    field: 'action',
    headerName: ' ',
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="action-icons">
          <Visibility
            style={{ color: '#4caf50', cursor: 'pointer' }}
            fontSize="small"
            className="action-icon"
            onClick={(e) => onView(params.row._id)}
          />
          <Edit
            style={{ cursor: 'pointer' }}
            color="primary"
            fontSize="small"
            className="action-icon"
            onClick={(e) => onEdit(params.row._id)}
          />
          <Close
            style={{ cursor: 'pointer' }}
            color="error"
            fontSize="small"
            className="action-icon"
            onClick={(e) => onDelete(params.row)}
          />
        </div>
      );
    },
  },
];
