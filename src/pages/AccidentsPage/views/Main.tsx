import { observer } from 'mobx-react-lite';
import Pagination from '../../../components/Pagination';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/TanStackTable';

import { AccidentsStore } from '../store/accidentsStore';
import columns from '../columns';

function Main({ store }: { store: AccidentsStore }) {
  return (
    <main className="ps-4">
      <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {store.accidents?.data ? (
          <Table
            data={store.accidents.data}
            columns={columns}
            pagination={
              store.accidents && (
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
