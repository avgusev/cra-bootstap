import { observer } from 'mobx-react-lite';
import Pagination from '../../../components/Pagination';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/TanStackTable';

import { BridgesStore } from '../store/bridgesStore';
import columns from '../columns';

function Main({ store }: { store: BridgesStore }) {
  return (
    <main className="ps-4">
      <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {store.bridges?.data ? (
          <Table
            data={store.bridges.data}
            columns={columns}
            pagination={
              store.bridges && (
                <Pagination
                  isLoading={store.isLoading}
                  page={store.page}
                  count={store.pageCount}
                  onPageChange={store.setPage}
                />
              )
            }
            columnVisibility={store.columnVisibility}
            columnOrder={store.columnOrder}
            onChangeColumnVisibility={store.saveColumnVisibility}
            onChangeColumnOrder={store.saveColumnOrder}
            onSortDesc={(id) => store.setOrder(id, 1)}
            onSortAsc={(id) => store.setOrder(id, 0)}
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
