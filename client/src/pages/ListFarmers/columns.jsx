import { Avatar } from '@material-ui/core';
import { Edit, Close, Visibility } from '@material-ui/icons';

export const createColumns = (onView, onEdit, onDelete) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => (<div style={{display: 'flex', alignItems: 'center'}}>
      <Avatar style={{height: '32px', width: '32px', marginRight: '8px'}} src={`https://avatars.dicebear.com/api/initials/${params.row.firstName} ${params.row.lastName}.svg`} />
      <span>{`${params.row.firstName} ${params.row.lastName}`}</span>
    </div>)
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 2
  },
  {
    field: 'emailAddress',
    headerName: 'Email Address',
    flex: 2
  },
  {
    field: 'parishName',
    headerName: 'Parish',
    flex: 2
  },
  {
    field: 'extensionName',
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