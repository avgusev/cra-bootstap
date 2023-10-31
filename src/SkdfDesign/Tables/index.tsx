import Table from './Table';
import TableFocus from './TableFocus';
import TableTree from './TableTree';

function Tables() {
  return (
    <>
      <h1>SKDF Tables</h1>
      <Table />
      <hr className="my-5" />
      <TableFocus />
      <hr className="my-5" />
      <TableTree />
    </>
  );
}

export default Tables;
