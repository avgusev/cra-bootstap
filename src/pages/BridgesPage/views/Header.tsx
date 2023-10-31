import { observer } from 'mobx-react-lite';

import Button from '../../../components/Button';
import FilterButton from '../../../components/FilterButton';
import SkdfIcon from '../../../components/SkdfIcon';
import Autocomplete from '../../../components/Autocomplete';
import { downloadBlobFile } from '../../../utils';

import { BridgesStore } from '../store/bridgesStore';
import { accessMatrixStoreInstance } from '../../../features/AccessMatrix/store';
import { toast } from 'react-toastify';

import { useSearchParams } from 'react-router-dom';
import { formatNumber, pluralize } from '../../../utils';
import { trainingStore } from '../../../features/Training/store';
import Training from '../../../features/Training';

function Header({ store }: { store: BridgesStore }) {
  const { bridges, isExportLoading } = store;
  const maxExportItemsCount = 50000;
  const canExport = bridges && accessMatrixStoreInstance.doesHaveAccess('bridges__export');

  const [searchParams, setSearchParams] = useSearchParams();

  const setTextSearch = (value: string) => {
    searchParams.set('textSearch', value);
    setSearchParams(searchParams);
  };
  const clearTextSearch = () => {
    searchParams.delete('textSearch');
    setSearchParams(searchParams);
  };
  return (
    <header className="p-4">
      <div className="d-lg-flex align-items-start mb-4">
        <h1 className="mb-2 mb-lg-0 me-2 flex-grow-1">Мостовые сооружения</h1>
        <Autocomplete
          hasFooter
          options={store.searchOptions}
          isLoading={store.isSearchLoading}
          // placeholder="Поиск по наименованию или автомобильной дороге"
          placeholder="Поиск по наименованию или а/д"
          className="mb-2 mb-lg-0 me-2 flex-grow-1"
          defaultText={store.textSearch}
          disabled={store.isLoading}
          getOptionLabel={(option) => option.text}
          onInputChange={(textSearch) => store.setTextSearch(textSearch)}
          // onSelectValue={(selectOption) => {
          //   store.setTextSearch(selectOption.text);
          //   store.loadData();
          // }}
          // onShowAll={(textSearch) => {
          //   store.setTextSearch(textSearch);
          //   store.loadData();
          // }}
          onSelectValue={(selectOption) => setTextSearch(selectOption.text)}
          onShowAll={(textSearch) => setTextSearch(textSearch)}
          renderItem={(optionLabel) => (
            <div className="d-flex align-items-start pt-2 pb-2 ps-2.5">
              <SkdfIcon name="bridge" style={{ color: '#999ea5' }} height={22} width={22} className="pe-2.5" />
              {optionLabel}
            </div>
          )}
        />
        <Training id="registry" step={2} className="me-2">
          <FilterButton
            count={store.filterButtonCount}
            disabled={store.isLoading}
            onClick={() => {
              if (store.textSearch) clearTextSearch();
              store.showFiltersModal();
            }}
          />
        </Training>
        <Button
          variant="stroke"
          icon="question"
          className="flex-shrink-0"
          children="Помощь"
          onClick={() => trainingStore.showTrening('registry')}
        />
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        {bridges?.totalCount && bridges?.totalCount > 0 ? (
          <span className="me-3">
            <span className="text-nowrap">{formatNumber(bridges.totalCount)}</span>
            {pluralize({
              count: bridges.totalCount,
              one: ' сооружение',
              few: ' сооружения',
              many: ' сооружений',
            })}
          </span>
        ) : null}

        <div className="d-sm-flex me-auto"></div>
        <div className="d-sm-flex">
          {canExport && (
            <Button
              variant="function"
              icon="download"
              className="me-4"
              children="Экспорт"
              isLoading={isExportLoading}
              disabled={isExportLoading}
              onClick={() => {
                if (bridges.totalCount <= maxExportItemsCount) {
                  toast.info(`Файл формируется. Пожалуйста, подождите...`);

                  store
                    .getXlsxBlob()
                    .then(
                      (blob) =>
                        blob &&
                        downloadBlobFile(
                          blob,
                          `СКДФ - Закладка «Мостовые сооружения» ${new Date().toLocaleString()}.xlsx`
                        )
                    );
                } else {
                  toast.warn(
                    `Для скачивания в таблице должно быть менее ${maxExportItemsCount} строк. Вы можете настроить необходимые фильтры для активации данного фукнционала`,
                    { autoClose: 10000 }
                  );
                }
              }}
            />
          )}{' '}
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
