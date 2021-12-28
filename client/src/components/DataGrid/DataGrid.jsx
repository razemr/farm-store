import { DataGrid as MuiDataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import { useState, useEffect } from 'react';

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
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight
    },
    paperRoot: {
      background: theme.customBackgrounds[`${props.color}`],
      boxShadow: theme.customShadows[`${props.color}`],
      color: 'white !important',
    },
  }));

export default function DataGrid(props) {
  const { resource, columns, color, searchPlaceholder } = props;
  const classes = useStyles({ color })();
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [sort, setSort] = useState(params.get('_sort'));
  const [page, setPage] = useState(params.get('_page') | 0);
  const [pageSize, setPageSize] = useState(params.get('_limit') | 25);
  const [searchText, setSearchText] = useState(
    params.get('q') ? params.get('q') : '',
  );
  const [q, setQ] = useState(params.get('q') ? params.get('q') : '');

  useEffect(() => {
    loadRows();
  }, [sort, page, pageSize, q]);

  const loadRows = async () => {
    let query = sort ? `_sort=${sort}&` : '';
    query = query.concat(`_page=${page}&_limit=${pageSize}`);
    if (q) {
      query = query.concat(`&q=${q}`);
    }

    history.push({
      path: location.pathname,
      search: query,
    });

    const { data } = await httpClient.get(`/${resource}?${query}`);
    setRows([...data[resource]]);
    setRowCount(data.total);
  };

  const handleOnSortingModelChange = (model) => {
    if (model[0]) {
      setSort(`${model[0].field}:${model[0].sort}`);
    } else {
      setSort('');
    }
  };

  const handleOnPageChange = (_page) => {
    setPage(_page);
  };

  const handleOnPageSizeChange = (_pageSize) => {
    setPageSize(_pageSize);
  };

  const handleOnSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value && value.length > 3) {
      setQ(value);
    } else {
      setQ('');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Input
          value={searchText}
          onChange={handleOnSearchChange}
          placeholder={
            searchPlaceholder ? searchPlaceholder : `Search ${resource}`
          }
          startAdornment={
            <InputAdornment position="start">
              <Search color="disabled" />
            </InputAdornment>
          }
        />
      </div>
      <MuiDataGrid
        classes={{
          root: classes.root,
          columnHeader: classes.columnHeader,
          cell: classes.cell,
        }}
        columns={columns}
        rows={rows}
        getRowId={(row) => row._id}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        onPageSizeChange={handleOnPageSizeChange}
        disableSelectionOnClick={true}
        paginationMode="server"
        onPageChange={handleOnPageChange}
        sortingMode="server"
        onSortModelChange={handleOnSortingModelChange}
        disableColumnMenu={true}
        autoHeight={true}
      />
    </>
  );
}
