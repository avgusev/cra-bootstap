import { useEffect } from 'react';
import { action, makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import CheckSelectAsync from '../components/CheckSelectAsync';
import { fetchFilter, FilterType, MultiSelectItem } from '../pages/RoadsPage/api';

type State = 'pending' | 'done' | 'error';

class Store {
  value: MultiSelectItem[] = [];
  options: MultiSelectItem[] = [];
  limit = 10;
  start = 0;
  textSearch = '';
  totalCount = 0;

  state: State = 'pending';
  get isLoading() {
    return this.state === 'pending';
  }

  optionsState: State = 'done';
  get optionsIsLoading() {
    return this.optionsState === 'pending';
  }

  get request() {
    return {
      filters: {
        // REGION: { value: [241519] },
        OWNER: {
          value: {
            values: this.value.map((v) => v.id),
            limit: this.limit,
            start: this.start,
            textSearch: this.textSearch,
          },
        },
      },
      textSearch: '',
    };
  }

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    this.loadFilter();
  }

  loadOptions() {
    this.optionsState = 'pending';

    fetchFilter(this.request).then(
      action('filterFetchSuccess', (filterResponse) => {
        const owner = filterResponse.filters.find((f) => f.id === 'OWNER');
        if (owner && owner.type === FilterType.LookupMultipleWithPaged) {
          this.options = this.options.concat(owner.value || []);
          this.totalCount = owner.totalCount;
        }
        this.optionsState = 'done';
      }),
      action('filterFetchError', () => {
        this.optionsState = 'error';
      })
    );
  }

  loadFilter() {
    this.state = 'pending';
    fetchFilter(this.request).then(
      action('filterFetchSuccess', (filterResponse) => {
        const owner = filterResponse.filters.find((f) => f.id === 'OWNER');
        if (owner && owner.type === FilterType.LookupMultipleWithPaged) {
          this.options = owner.value || [];
          this.totalCount = owner.totalCount;
        }
        this.state = 'done';
      }),
      action('filterFetchError', () => {
        this.state = 'error';
      })
    );
  }

  loadNextPage = () => {
    if (this.start + this.limit >= this.totalCount) return;
    this.start += this.limit;
    this.loadOptions();
  };

  setTextSearch = (text: string) => {
    this.start = 0;
    this.textSearch = text;
    this.loadFilter();
  };

  setValue = (value: MultiSelectItem[]) => {
    this.start = 0;
    // this.textSearch = '';
    this.value = value;
    this.loadFilter();
  };
}

const store = new Store();

function CheckSelectAsyncPage() {
  useEffect(() => {
    store.init();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <CheckSelectAsync
            options={store.options}
            value={store.value}
            search
            placeholder="Поиск"
            disabled={store.isLoading}
            isLoading={store.optionsIsLoading}
            getOptionValue={(option) => option.text}
            getOptionLabel={(option) => option.text}
            onInputChange={store.setTextSearch}
            onChange={store.setValue}
            onScrollToBottom={store.loadNextPage}
            // onApply={store.apply}
          />
        </div>
        <div className="col-6">
          <table>
            <tr>
              <th className="pe-2">totalCount:</th>
              <td>{store.totalCount}</td>
            </tr>
            <tr>
              <th className="pe-2">textSearch:</th>
              <td>{store.textSearch}</td>
            </tr>
            <tr>
              <th className="pe-2">state:</th>
              <td>{store.state}</td>
            </tr>
            <tr>
              <th className="pe-2">optionsState:</th>
              <td>{store.optionsState}</td>
            </tr>
          </table>
          {/*<pre>{JSON.stringify(store.value.map(({ id, text }) => ({ id, text })))}</pre>*/}
          <pre>{JSON.stringify(store.value.map(({ id }) => id))}</pre>
        </div>
      </div>
    </div>
  );
}

export default observer(CheckSelectAsyncPage);
