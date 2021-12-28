import { useEffect, useState } from 'react';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import {
  IconButton,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { Event, List, Timeline, Search } from '@material-ui/icons';
import { PageHeader } from '../../components/PageHeader';
import { useHistory, useLocation } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import { Autocomplete, Pagination } from '@material-ui/lab';
import { SelectControl } from '../../components/FormControls/SelectControl';

export default function ListMilestones() {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [milestones, setMilestones] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(params.get('_page') | 0);
  const _statuses = params.get('_statuses')
    ? params.get('_statuses').split(',')
    : ['Due', 'Overdue'];
  const [statuses, setStatuses] = useState(_statuses);
  const [searchText, setSearchText] = useState(
    params.get('q') ? params.get('q') : '',
  );
  const [q, setQ] = useState(params.get('q') ? params.get('q') : '');
  const [pageSize, setPageSize] = useState(params.get('_pageSize') | 25);

  useEffect(() => {
    const getMilestones = async () => {
      let query = statuses.length > 0 ? `_statuses=${statuses}&` : '';
      query = query.concat(`_page=${page}&_limit=${pageSize}`);
      if (q) {
        query = query.concat(`&q=${q}`);
      }

      history.push({
        path: location.pathname,
        search: query,
      });

      const { data } = await httpClient.get(`/milestones?${query}`);
      const total = data.total;
      setMilestones([...data.milestones]);
      setPageCount(Math.ceil(total / pageSize));
    };

    getMilestones();
  }, [statuses, q, page, pageSize]);

  const handleCheck = (status, id) => {};
  const handleStatus = (e, values) => {
    setPage(0);
    setStatuses([...values]);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setPage(0);

    if (value && value.length > 3) {
      setQ(value);
    } else {
      setQ('');
    }
  };
  const handlePage = (e, page) => {
    setPage(page - 1);
  };

  const handlePageSize = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <>
      <PageHeader title="Milestones"></PageHeader>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '16px' }}
      >
        <Grid item xs={5}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={6}>
            <Autocomplete
            onChange={handleStatus}
            value={statuses}
            multiple
            options={['Due', 'Not Due', 'Completed', 'Overdue']}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Status" />}
          ></Autocomplete>
            </Grid>
            <Grid item xs={6}>
            <TextField
            label="Search"
            style={{ width: '100%' }}
            value={searchText}
            onChange={handleSearch}
            placeholder="Search milestones"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="disabled" />
                </InputAdornment>
              ),
            }}
          />
            </Grid>
          </Grid>

          
        </Grid>
        <Grid>
          <IconButton >
            <Event fontSize="small"/>
          </IconButton>
          <IconButton>
            <List fontSize="small"/>
          </IconButton>
          <IconButton>
            <Timeline fontSize="small"/>
          </IconButton>
        </Grid>
      </Grid>
      <MilestoneTimeline
        align="alternate"
        milestones={milestones}
        onCheck={handleCheck}
      />
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}
        >
          <Typography style={{ marginRight: '8px' }}>
            Milestones per page:
          </Typography>
          <SelectControl
            variant="outlined"
            value={pageSize}
            onChange={handlePageSize}
            options={['25', '50', '100'].map((option) => ({
              key: option,
              value: option,
              label: option,
            }))}
          ></SelectControl>
        </div>
        <Pagination count={pageCount} onChange={handlePage}></Pagination>
      </div>
    </>
  );
}
