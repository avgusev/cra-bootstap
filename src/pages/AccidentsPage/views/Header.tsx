import { observer } from 'mobx-react-lite';

import Button from '../../../components/Button';
import FilterButton from '../../../components/FilterButton';
import SkdfIcon from '../../../components/SkdfIcon';
import Autocomplete from '../../../components/Autocomplete';
import { downloadBlobFile } from '../../../utils';

import { AccidentsStore } from '../store/accidentsStore';
import { accessMatrixStoreInstance } from '../../../features/AccessMatrix/store';
import { userStoreInstance } from '../../../features/Auth/store';
import { toast } from 'react-toastify';

import { useSearchParams } from 'react-router-dom';
import { formatNumber } from '../../../utils';
import Training from '../../../features/Training';
import { trainingStore } from '../../../features/Training/store';

function Header({ store }: { store: AccidentsStore }) {
  const { accidents, isExportLoading } = store;
  const maxExportItemsCount = 50000;
  const canExport = accidents && accessMatrixStoreInstance.doesHaveAccess('traffic_accidents__export');

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
        <h1 className="mb-2 mb-lg-0 me-2 flex-grow-1">ДТП</h1>
        <Autocomplete
          hasFooter
          options={store.searchOptions}
          isLoading={store.isSearchLoading}
          placeholder="Поиск по адресу ДТП"
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
              <SkdfIcon name="road" height={22} width={22} className="pe-2.5 text-placeholder" />
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
              // if (!localStorage.getItem('filterTrening')) {
              //   trainingStore.updateStep(0);
              //   trainingStore.showTrening('filter');
              //   localStorage.setItem('filterTrening', 'true');
              // }
            }}
          />
        </Training>
        <Button
          variant="stroke"
          icon="question"
          className="flex-shrink-0"
          children="Помощь"
          disabled={store.isLoading}
          onClick={() => trainingStore.showTrening('registry')}
        />
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        {accidents && <span className="me-3">{formatNumber(accidents.totalCount)} ДТП</span>}
        <div className="d-sm-flex me-auto">
          {/* <Link to="/map" className="btn btn-icon btn-skdf-function">
            <SkdfIcon name="list_on_map" /> Показать на карте
          </Link> */}
          {/* <Button variant="function" icon="list_on_map" children="Показать на карте" disabled /> */}
        </div>
        {userStoreInstance.isSignedIn && (
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
                  if (accidents.totalCount <= maxExportItemsCount) {
                    toast.info(`Файл формируется. Пожалуйста, подождите...`);

                    store
                      .getXlsxBlob()
                      .then(
                        (blob) =>
                          blob && downloadBlobFile(blob, `СКДФ - Закладка «ДТП» ${new Date().toLocaleString()}.xlsx`)
                      );
                  } else {
                    toast.warn(
                      `Для скачивания в таблице должно быть менее ${maxExportItemsCount} строк. Вы можете настроить необходимые фильтры для активации данного фукнционала`,
                      { autoClose: 10000 }
                    );
                  }
                }}
              />
            )}
            {/* <Button variant="function" icon="report" children="Сформировать АОУ" disabled /> */}
          </div>
        )}
      </div>
    </header>
  );
}

export default observer(Header);
