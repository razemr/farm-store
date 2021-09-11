import { DataGrid } from '@material-ui/data-grid';
import { Paper, Typography } from '@material-ui/core';
import './TableWidget.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root': {
      border: 'none',
      borderRadius: 'none',
      '&:focus': { outline: 'none' },
    },
  },
  cell: {
    '&.MuiDataGrid-columnSeparator': {
      display: 'none',
    },
  },
});

export default function TableWidget(props) {
  const classes = useStyles();
  const { rows, columns, getRowId, pageSize, title, ...other } = props;
  return (
    <Paper elevation={10} className="table-wrapper">
      <Paper className="table-header">
        <Typography align="right" variant="h2">
          {title}
        </Typography>
        <Typography align="right" variant="subtitle1">
          Total Programs: 87
        </Typography>
      </Paper>
      <DataGrid
        classes={{ root: classes.root, cell: classes.cell }}
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        pageSize={pageSize}
        {...other}
      />
    </Paper>
  );
}
