import { observer } from 'mobx-react-lite';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../../../components/Button';
import FilterButton from '../../../components/FilterButton';
import SkdfIcon from '../../../components/SkdfIcon';
import Autocomplete from '../../../components/Autocomplete';
import { downloadBlobFile } from '../../../utils';

import InfoOverlay from '../components/InfoOverlay';
import RoadsCountAndLength from '../components/RoadsCountAndLength';
import { RoadsStore } from '../store/roadsStore';
import { accessMatrixStoreInstance } from '../../../features/AccessMatrix/store';
import { userStoreInstance } from '../../../features/Auth/store';
import Training from '../../../features/Training';
import { trainingStore } from '../../../features/Training/store';

function Header({ roadsStore }: { roadsStore: RoadsStore }) {
  const { roads, isExportLoading } = roadsStore;
  const maxExportItemsCount = 60000;
  const canExport = roads && accessMatrixStoreInstance.doesHaveAccess('roads__export');

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
        <h1 className="mb-2 mb-lg-0 me-2 flex-grow-1">Дороги</h1>
        <Autocomplete
          hasFooter
          options={roadsStore.searchOptions}
          isLoading={roadsStore.isSearchLoading}
          placeholder="Поиск по названию, идентификационному или учётному номеру"
          className="mb-2 mb-lg-0 me-2 flex-grow-1"
          defaultText={roadsStore.textSearch}
          disabled={roadsStore.isLoading}
          getOptionLabel={(option) => option.text}
          onInputChange={(textSearch) => (textSearch === '' ? clearTextSearch() : roadsStore.setTextSearch(textSearch))}
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
            count={roadsStore.filterButtonCount}
            disabled={roadsStore.isLoading}
            onClick={() => {
              if (roadsStore.textSearch) clearTextSearch();
              roadsStore.showFiltersModal();
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
          disabled={roadsStore.isLoading}
          onClick={() => trainingStore.showTrening('registry')}
        />
      </div>

      <div className="d-flex flex-wrap align-items-center gap-2">
        {roads && <RoadsCountAndLength count={roads.totalCount} length={roads.stat.totalLength} />}

        <div className="d-sm-flex me-auto">
          {roads && (
            <InfoOverlay stat={roads.stat}>
              <Button variant="function" icon="info" className="me-4" />
            </InfoOverlay>
          )}
          <Link to="/map" className="btn btn-icon btn-skdf-function">
            <SkdfIcon name="list_on_map" /> Показать на карте
          </Link>
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
                  if (roads.totalCount <= maxExportItemsCount) {
                    toast.info(`Файл формируется. Пожалуйста, подождите...`);

                    roadsStore
                      .getXlsxBlob()
                      .then(
                        (blob) =>
                          blob && downloadBlobFile(blob, `СКДФ - Закладка «Дороги» ${new Date().toLocaleString()}.xlsx`)
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
            {/* <Button variant="function" icon="task" className="me-4" children="Отчеты" disabled /> */}
            {/* <Button variant="function" icon="terms" children="Постановление" disabled /> */}
          </div>
        )}
      </div>
    </header>
  );
}

export default observer(Header);
