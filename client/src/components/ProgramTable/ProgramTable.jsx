import './ProgramTable.css';
import { createColumns } from './columns';
import TableWidget from '../TableWidget/TableWidget';

export default function ProgramTable(props) {
  const { programs, onView, onEdit } = props;
  const columns = createColumns(onView, onEdit);

  const getRowId = (row) => row._id;

  return <TableWidget rows={programs} columns={columns} pageSize={10} getRowId={getRowId} disableSelectionOnClick={true}
  autoHeight={true} title="List of Programs"/>;
}
