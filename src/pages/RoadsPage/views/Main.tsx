import { observer } from 'mobx-react-lite';
import Pagination from '../../../components/Pagination';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/TanStackTable';
import { RoadsStore } from '../store/roadsStore';

import columns from '../columns';
import { userStoreInstance } from '../../../features/Auth/store';

function Main({ roadsStore }: { roadsStore: RoadsStore }) {
  return (
    <main className="ps-4">
      <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {roadsStore.roads?.data ? (
          <Table
            data={roadsStore.roads.data}
            columns={columns.filter((column) => !column?.meta?.private || userStoreInstance.isSignedIn)}
            pagination={
              roadsStore.roads && (
                <Pagination
                  isLoading={roadsStore.isLoading}
                  page={roadsStore.page}
                  count={roadsStore.pageCount}
                  onPageChange={roadsStore.setPage}
                />
              )
            }
            columnVisibility={roadsStore.columnVisibility}
            columnOrder={roadsStore.columnOrder}
            onSortAsc={(id) => roadsStore.setOrder(id, 0)}
            onSortDesc={(id) => roadsStore.setOrder(id, 1)}
            onChangeColumnVisibility={roadsStore.saveColumnVisibility}
            onChangeColumnOrder={roadsStore.saveColumnOrder}
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
