import './ProgramTable.css';
import { DataGrid } from '@material-ui/data-grid';
import { createColumns } from './columns';

export default function ProgramTable(props) {
  const { programs, onView, onEdit } = props;
  const columns = createColumns(onView, onEdit);

  return (
    <div className="grid-container">
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={programs}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={50}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
}
