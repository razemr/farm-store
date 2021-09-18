import { DataGrid as MuiDataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      border: 'none',
      borderRadius: 'none',
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: theme.typography.h5.fontWeight,
        fontSize: theme.typography.h5.fontSize,
        color: `${theme.palette[props.color].main} !important`,
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none !important',
      },
      '& .MuiDataGrid-footerContainer': {
        color: `${theme.palette[props.color].main} !important`,
        '& .MuiTablePagination-root': {
          color: `${theme.palette[props.color].main} !important`,
        },
      },
    },
    columnHeader: {
      outline: 'none !important',
    },
    cell: {
      outline: 'none !important',
    },
    paperRoot: {
      background: theme.customBackgrounds[`${props.color}`],
      boxShadow: theme.customShadows[`${props.color}`],
      color: 'white !important',
    },
  }));

export default function DataGrid(props) {
  const {
    rows,
    columns,
    getRowId,
    title,
    color,
    onRowClick,
    pageSize,
    page,
    rowCount,
    onSortingModelChange,
    onPageChange,
    onPageSizeChange,
    onFilterModelChange,
    ...other
  } = props;
  const classes = useStyles({ color })();
  return (
    <MuiDataGrid
      classes={{
        root: classes.root,
        columnHeader: classes.columnHeader,
        cell: classes.cell,
      }}
      rows={rows}
      getRowId={getRowId}
      columns={columns}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      onPageSizeChange={onPageSizeChange}
      disableSelectionOnClick={true}
      paginationMode="server"
      onPageChange={onPageChange}
      sortingMode="server"
      onSortModelChange={onSortingModelChange}
      disableColumnMenu={true}
      {...other}
    />
  );
}
