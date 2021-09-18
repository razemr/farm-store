import './ListPrograms.css';
import {
  Input,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { Dialog } from '../../components/Dialog';
import { Container } from '../../components/Container';
import { DataGrid } from '../../components/DataGrid';
import { createColumns } from './columns';
import { httpClient } from '../../http/HttpClient';

export default function ListPrograms() {
  const getRowId = (row) => row._id;
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [programs, setPrograms] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(params.get('_sort'));
  const [page, setPage] = useState(params.get('_page') | 0);
  const [pageSize, setPageSize] = useState(params.get('_limit') | 25);
  const [searchText, setSearchText] = useState(
    params.get('q') ? params.get('q') : '',
  );
  const [q, setQ] = useState(params.get('q') ? params.get('q') : '');

  useEffect(() => {
    loadPrograms();
  }, [sort, page, pageSize, searchText]);

  const handleOnView = (id) => {
    history.push(`/programs/${id}`);
  };

  const handleAdd = () => {
    history.push('/programs/create');
  };

  const handleOnEdit = (id) => {
    history.push(`/programs/${id}/edit`);
  };

  const handleOnDelete = (program) => {
    setSelectedProgram(program);
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/programs/${selectedProgram._id}`);
    loadPrograms();
    setOpen(false);
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value && value.length > 3) {
      setQ(value);
    } else {
      setQ('');
    }
  };

  const columns = createColumns(handleOnView, handleOnEdit, handleOnDelete);

  const loadPrograms = async () => {
    let query = sort ? `_sort=${sort}&` : '';
    query = query.concat(`_page=${page}&_limit=${pageSize}`);
    if (q) {
      query = query.concat(`&q=${q}`);
    }

    history.push({
      path: location.pathname,
      search: query,
    });

    const { data } = await httpClient.get(`/programs?${query}`);
    setPrograms([...data.programs]);
    setRowCount(data.total);
  };

  return (
    <>
      <PageHeader title="Programs">
        <Input
          value={searchText}
          onChange={handleSearch}
          placeholder="Searh programs"
          startAdornment={
            <InputAdornment position="start">
              <Search color="disabled" />
            </InputAdornment>
          }
        />
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <Container title="Programs" color="primary">
        <DataGrid
          color="primary"
          rows={programs}
          columns={columns}
          getRowId={getRowId}
          autoHeight={true}
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}
          onSortingModelChange={handleOnSortingModelChange}
          onPageChange={handleOnPageChange}
          onPageSizeChange={handleOnPageSizeChange}
          programs={programs}
        />
      </Container>
      <Dialog
        open={open}
        title="Confirm Deletion"
        content={
          <div>
            <Typography variant="body1" display="inline">
              Are you sure you want to delete
            </Typography>
            <Typography variant="h5" display="inline">
              {` ${selectedProgram && selectedProgram.name}`}
            </Typography>
            <Typography variant="body1" display="inline">
              ?
            </Typography>
          </div>
        }
        actions={
          <>
            <Button onClick={(e) => setOpen(false)}>Cancel</Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteConfirmation}
            >
              Confirm
            </Button>
          </>
        }
      />
    </>
  );
}
