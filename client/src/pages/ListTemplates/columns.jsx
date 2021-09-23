import { Edit, Close, Visibility } from '@material-ui/icons';

export const createColumns = (onView, onEdit, onDelete) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
  },
  {
    field: 'cropName',
    headerName: 'Crop',
    flex: 2,
  },
  {
    field: 'companyName',
    headerName: 'Company',
    flex: 2,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 2,
  },
  {
    field: 'milestones',
    headerName: 'Milestones',
    flex: 2,
    renderCell: (params) => params.row.milestones.length,
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
