import { Button } from "@material-ui/core";

export const createColumns = (onView, onEdit, onDelete) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2
  },
  {
    field: 'categoryName',
    headerName: 'Category',
    flex: 2
  },
  {
    field: 'companyName',
    headerName: 'Company',
    flex: 2
  },
  {
    field: 'description',
    headerName: 'Description',
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