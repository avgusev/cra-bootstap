import { TableMock } from '../mock';

function Table() {
  return (
    <div className="table-responsive" style={{ maxHeight: '24rem' }}>
      <TableMock className="table skdf table-sticky-header table-hover text-nowrap" repeat={4} />
    </div>
  );
}

export default Table;
