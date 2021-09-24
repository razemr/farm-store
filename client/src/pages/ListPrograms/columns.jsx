import { Chip, Typography, Button } from '@material-ui/core';
import { Edit, Close, Visibility } from '@material-ui/icons';
import { getMilestoneStatus } from '../../utils/getMilestoneStatus';
import { MILESTONE_STATUS as STATUS } from '../../utils/constants';

export const createColumns = (onView) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2
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
      return !params.row.completed ? date.toLocaleDateString() : '-';
    },
  },
  {
    field: 'farmerName',
    headerName: 'Farmer',
    flex: 2
  },
  {
    field: 'parishName',
    headerName: 'Parish',
    flex: 2
  },
  {
    field: 'radaExtensionName',
    headerName: 'Extension',
    flex: 2
  },
  {
    sortable: false,
    field: 'action',
    headerName: ' ',
    flex: 1,
    renderCell: (params) => {
      return (
        <Button variant="outlined" onClick={(e) => onView(params.row._id)}>View</Button>
      );
    },
  },
];
