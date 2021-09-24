import { Button } from '@material-ui/core';

export const createColumns = (onView) => [
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
    field: 'milestoneTemplates',
    sortable: false,
    headerName: 'Milestones',
    flex: 2,
    renderCell: (params) => params.row.milestoneTemplates.length,
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
