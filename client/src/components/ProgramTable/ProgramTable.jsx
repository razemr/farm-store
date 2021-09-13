import './ProgramTable.css';
import { createColumns } from './columns';
import TableWidget from '../TableWidget/TableWidget';

export default function ProgramTable(props) {
  const { programs, onView, onEdit, onRowClick } = props;
  const columns = createColumns(onView, onEdit);

  const getRowId = (row) => row._id;

  return (
    <TableWidget
      rows={programs}
      columns={columns}
      pageSize={10}
      getRowId={getRowId}
      autoHeight={true}
      title="Active Programs"
      onRowClick={onRowClick}
      color="primary"
    />
  );
}
