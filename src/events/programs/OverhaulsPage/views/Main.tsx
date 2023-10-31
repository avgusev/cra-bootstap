import { observer } from 'mobx-react-lite';
import Spinner from '../../../../components/Spinner';
import Table from '../../../../components/TanStackTable';

import { OverhaulsStore } from '../store/overhaulsStore';
import columns from '../columns';

function Main({ store }: { store: OverhaulsStore }) {
  return (
    <main className="ps-4">
      <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 204px)' }}>
        {store.overhauls?.data ? (
          <Table
            data={store.overhauls?.data}
            columns={columns}
            columnVisibility={store.columnVisibility}
            columnOrder={store.columnOrder}
            onChangeColumnVisibility={store.saveColumnVisibility}
            onChangeColumnOrder={store.saveColumnOrder}
            // onSortDesc={(id) => store.setOrder(id, 1)}
            // onSortAsc={(id) => store.setOrder(id, 0)}
          />
        ) : (
          <div className="position-absolute top-50 start-50 translate-middle">
            <Spinner size={48} className="text-primary" />
          </div>
        )}
      </div>
    </main>
  );
}
export default observer(Main);
