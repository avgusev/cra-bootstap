import { observer } from 'mobx-react-lite';

import Button from '../../../../components/Button';
import FilterButton from '../../../../components/FilterButton';
import SkdfIcon from '../../../../components/SkdfIcon';
import Autocomplete from '../../../../components/Autocomplete';
// import { pluralize } from '../../../../utils';

import { OverhaulsStore } from '../store/overhaulsStore';
import { accessMatrixStoreInstance } from '../../../../features/AccessMatrix/store';
import { userStoreInstance } from '../../../../features/Auth/store';
// import { toast } from 'react-toastify';

import { useSearchParams } from 'react-router-dom';
import { formatNumber, pluralize } from '../../../../utils';
import Training from '../../../../features/Training';
import { trainingStore } from '../../../../features/Training/store';
import { Nav } from 'react-bootstrap';
import classNames from 'classnames';
import { useState } from 'react';

function Header({ store }: { store: OverhaulsStore }) {
  const { overhauls, isExportLoading } = store;
  // const maxExportItemsCount = 50000;
  const [index, setIndex] = useState(0);
  const canExport = overhauls && accessMatrixStoreInstance.doesHaveAccess('events__export');

  const [searchParams, setSearchParams] = useSearchParams();

  const setTextSearch = (value: string) => {
    searchParams.set('textSearch', value);
    setSearchParams(searchParams);
  };
  // const clearTextSearch = () => {
  //   searchParams.delete('textSearch');
  //   setSearchParams(searchParams);
  // };

  return (
    <header className="p-4 d-grid gap-4">
      <div className="d-lg-flex align-items-start">
        <h1 className="mb-2 mb-lg-0 me-2 flex-grow-1">Программы капитального ремонта</h1>
        <Autocomplete
          hasFooter
          options={store.searchOptions}
          isLoading={store.isSearchLoading}
          placeholder="Поиск по наименованию"
          className="mb-2 mb-lg-0 me-2 flex-grow-1"
          defaultText={store.textSearch}
          disabled
          // ={store.isLoading}
          getOptionLabel={(option) => option.text}
          onInputChange={(textSearch) => console.log(textSearch)}
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
            // count={store.filterButtonCount}
            disabled
            // ={store.isLoading}
            // onClick={() => {}}
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
        {overhauls && (
          <Nav variant="pills" className="skdf d-flex gap-2">
            <Button className={classNames('nav-link', { active: index === 0 })} onClick={() => setIndex(0)}>
              ФКУ и ГК
            </Button>
            <Button disabled className={classNames('nav-link', { active: index === 1 })} onClick={() => setIndex(1)}>
              Регионы
            </Button>
            <Button disabled className={classNames('nav-link', { active: index === 2 })} onClick={() => setIndex(2)}>
              Муниципальные образования
            </Button>
          </Nav>
        )}
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        {overhauls && overhauls.data && (
          <span className="me-3">
            {formatNumber(overhauls.data.length)}{' '}
            {pluralize({
              count: overhauls.data.length,
              one: 'программа',
              few: 'программы',
              many: 'программ',
            })}
          </span>
        )}
        <Button disabled variant="function" icon="plus" children="Добавить программу" />
        <div className="d-sm-flex me-auto"></div>
        {userStoreInstance.isSignedIn && (
          <div className="d-sm-flex">
            {canExport && (
              <Button
                disabled
                variant="function"
                icon="download"
                className="me-4"
                children="Экспорт"
                isLoading={isExportLoading}
                // disabled={isExportLoading}
                // onClick={() => {}}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default observer(Header);
