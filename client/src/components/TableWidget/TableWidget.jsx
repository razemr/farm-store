import { DataGrid } from '@material-ui/data-grid';
import { Paper, Typography } from '@material-ui/core';
import './TableWidget.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = (props) => makeStyles((theme) => ({
  root: {
    border: 'none',
    borderRadius: 'none',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: theme.typography.h6.fontWeight,
      fontSize: theme.typography.h6.fontSize,
      color: `${theme.palette[props.color]} !important`,
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none !important',
    },
    '& .MuiDataGrid-footerContainer': {
      color: `${theme.palette[props.color]} !important`,
      '& .MuiTablePagination-root': {
        color: `${theme.palette[props.color]} !important`,
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
    color: 'white !important'
  }
}));

export default function TableWidget(props) {
  const { rows, columns, getRowId, pageSize, title, onRowClick, color, ...other } =
    props;
    const classes = useStyles({color})();
  return (
    <Paper elevation={1} className="table-wrapper">
      <Paper classes={{root: classes.paperRoot}} className="table-header">
        <Typography align="right" variant="h2">
          {title}
        </Typography>
        <Typography align="right" variant="subtitle1">
          Total Programs: 87
        </Typography>
      </Paper>
      <DataGrid
        classes={{
          root: classes.root,
          columnHeader: classes.columnHeader,
          cell: classes.cell,
        }}
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        pageSize={pageSize}
        onRowClick={onRowClick}
        {...other}
      />
    </Paper>
  );
}
