import { Avatar, Button } from '@material-ui/core';

export const createColumns = (onView, onEdit, onDelete) => [
  {
    field: 'firstName',
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
        <Button variant="outlined" onClick={(e) => onView(params.row._id)}>View</Button>
      );
    },
  },
];