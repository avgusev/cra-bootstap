import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormCheck, ToggleButton } from 'react-bootstrap';
import Button from '../../../components/Button';
import CheckSelect from '../../../components/CheckSelect';
import CheckSelectAsync from '../../../components/CheckSelectAsync';
import CheckSelectTree from '../../../components/CheckSelectTree';
import FilterCollapse from '../../../components/FilterCollapse';
import InputRange, { Pair } from '../../../components/InputRange';
import Modal from '../../../components/Modal';
import Training from '../../../features/Training';
import { FilterType } from '../api';
import { FiltersLayoutStore } from '../store/filtersLayoutStore';
import { PresetStore } from '../store/presetStore';
import { userStoreInstance } from '../../../features/Auth/store';
import { RoadsStore } from '../store/roadsStore';
import CollapseLoading from '../../../components/CollapseLoading';

const SHOW_UNDEF_FILTERS = false;

function FiltersModal({
  roadsStore,
  presetStore,
  filtersLayoutStore: layout,
}: {
  roadsStore: RoadsStore;
  presetStore: PresetStore;
  filtersLayoutStore: FiltersLayoutStore;
}) {
  return (
    <Modal
      size="lg"
      show={roadsStore.isOpenFiltersModal}
      onHide={() => roadsStore.hideFiltersModal()}
      dialogClassName="modal-80w"
      contentClassName="h-100" // w-auto
      // header={}
      body={
        <>
          <div className="mb-4 mt-2r d-flex justify-content-between">
            <h1>Фильтры</h1>
            <Training id="filter" step={0} className=" mb-2 mb-lg-0 me-2 flex-grow-1" style={{ maxWidth: '66%' }}>
              <input
                type="search"
                placeholder="Поиск по характеристикам, параметру или выборке"
                className="form-control"
                value={layout.textSearch}
                onChange={(e) => (layout.textSearch = e.target.value)}
              />
            </Training>
          </div>
          {userStoreInstance.isSignedIn && presetStore.showPresets.length > 0 && (
            <div className="d-flex gap-2 flex-wrap pt-2 pb-5">
              {presetStore.showPresets.map((item: { name: string }, index: number) => (
                <ToggleButton
                  key={index}
                  id={`radio-${index}`}
                  variant="tag"
                  type="checkbox"
                  size="sm"
                  value={item.name}
                  checked={presetStore.activePreset === item.name}
                  onClick={() => presetStore.activatePreset(item.name)}
                >
                  {item.name}
                </ToggleButton>
              ))}
              {presetStore.presets.length > 4 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => presetStore.setShowAllPresets(!presetStore.showAllPresets)}
                >
                  {presetStore.showAllPresets ? 'Скрыть' : `Показать все ${presetStore.presets.length}`}
                </Button>
              )}
            </div>
          )}
          <div className="container-fluid p-0">
            <div className="row">
              {layout.filters.map((column, index) => (
                <div key={index} className="col-4 d-flex flex-column gap-4">
                  {column.map((group) => (
                    <div key={group.title}>
                      <h3 className="mb-4">{group.title}</h3>

                      {group.units.map((unit, index) => {
                        const { type, label, key, min, max } = unit;

                        if (key === undefined && SHOW_UNDEF_FILTERS) {
                          if (type !== FilterType.Switch) {
                            return <FilterCollapse.Disabled key={index} label={label} />;
                          }
                          if (type === FilterType.Switch) {
                            return (
                              <FormCheck
                                type="switch"
                                key={index}
                                id={String(index)}
                                disabled
                                reverse
                                label={label}
                                className="h4 text-start mb-4 text-muted"
                              />
                            );
                          }
                        }
                        if (key !== undefined) {
                          const filterItem = roadsStore.filters[key];

                          if (filterItem.type === FilterType.MultiSelect) {
                            if (filterItem.options.length < 1) {
                              return <FilterCollapse.Disabled key={index} label={label} />;
                            }

                            return (
                              <FilterCollapse
                                key={key}
                                label={label}
                                hasValue={filterItem.value && filterItem.value.length > 0}
                                onClear={() => roadsStore.updateMultiSelect(key, [])}
                              >
                                <CheckSelect
                                  search={filterItem.options.length > 6}
                                  placeholder="Поиск"
                                  options={filterItem.options}
                                  value={filterItem.value}
                                  disabled={roadsStore.isLoading || !roadsStore.roads}
                                  onChange={(values) => roadsStore.updateMultiSelect(key, values)}
                                  getOptionValue={(option) => option.id}
                                  getOptionLabel={(option) => option.text}
                                />
                              </FilterCollapse>
                            );
                          }

                          if (filterItem.type === FilterType.Switch) {
                            return (
                              <FormCheck
                                type="switch"
                                key={index}
                                id={String(index)}
                                disabled={roadsStore.isLoading || filterItem.isDisabled}
                                reverse
                                label={label}
                                className={classNames('h4 text-start mb-4', {
                                  'text-muted': roadsStore.isLoading || filterItem.isDisabled,
                                })}
                                checked={filterItem.value}
                                onChange={(e) => roadsStore.updateSwitch(key, e.currentTarget.checked)}
                              />
                            );
                          }

                          if (filterItem.type === FilterType.NumberRange) {
                            return (
                              <FilterCollapse
                                key={index}
                                label={label}
                                hasValue={filterItem.value && (!!filterItem.value[0] || !!filterItem.value[1])}
                                onClear={() => roadsStore.updateNumberRange(key, [undefined, undefined])}
                              >
                                <>
                                  <InputRange
                                    id={String(index)}
                                    min={min}
                                    max={max}
                                    disabled={roadsStore.isLoading || !roadsStore.roads}
                                    value={filterItem.value as Pair}
                                    onChange={(values) => roadsStore.updateNumberRange(key, values)}
                                  />
                                  <hr className="my-3" />
                                </>
                              </FilterCollapse>
                            );
                          }

                          if (filterItem.type === FilterType.LookupHierarchy) {
                            if (filterItem.options.length < 1) {
                              return <FilterCollapse.Disabled key={index} label={label} />;
                            }

                            return (
                              <FilterCollapse
                                key={key}
                                label={label}
                                hasValue={filterItem.value && filterItem.value.length > 0}
                                onClear={() => roadsStore.updateLookupHierarchy(key, [])}
                              >
                                <CheckSelectTree
                                  search
                                  placeholder="Поиск"
                                  options={filterItem.options}
                                  value={filterItem.value}
                                  disabled={roadsStore.isLoading || !roadsStore.roads}
                                  onChange={(values) => roadsStore.updateLookupHierarchy(key, values)}
                                  getOptionValue={(option) => option.pathId}
                                  getOptionLabel={(option) => option.text}
                                  getOptionChildren={(option) => option.children || []}
                                />
                              </FilterCollapse>
                            );
                          }

                          if (filterItem.type === FilterType.LookupMultipleWithPaged) {
                            if (filterItem.options.length < 1) {
                              return <FilterCollapse.Disabled key={index} label={label} />;
                            }

                            return (
                              <FilterCollapse
                                key={key}
                                label={label}
                                hasValue={filterItem.value && filterItem.value.length > 0}
                                isLoading={filterItem.isLoading}
                                onClear={() => roadsStore.updateLookupMultipleWithPaged(key, [])}
                              >
                                <CheckSelectAsync
                                  options={filterItem.options}
                                  value={filterItem.value}
                                  search
                                  placeholder="Поиск"
                                  isLoading={filterItem.isLoading}
                                  disabled={roadsStore.isLoading}
                                  getOptionValue={(option) => option.id}
                                  getOptionLabel={(option) => option.text}
                                  onInputChange={(text) => roadsStore.setTextSearchAsync(key, text)}
                                  onChange={(values) => roadsStore.updateLookupMultipleWithPaged(key, values)}
                                  onScrollToBottom={() => roadsStore.loadNextPage(key)}
                                />
                              </FilterCollapse>
                            );
                          }

                          if (filterItem.type === FilterType.Fixed) {
                            if (key === 'IS_CHECKED' && !userStoreInstance.isSignedIn) return null;

                            const [title, firstLabel, secondLabel] = label.split(',');
                            return (
                              <CollapseLoading key={index} header={title} iconRight>
                                <>
                                  <FormCheck
                                    type="checkbox"
                                    id={`${key}_${firstLabel}`}
                                    disabled={roadsStore.isLoading}
                                    label={firstLabel}
                                    className={classNames('text-start mb-2.5 ps-2r"', {
                                      'text-muted': roadsStore.isLoading,
                                    })}
                                    checked={filterItem.value && filterItem.value[0] === 1}
                                    onChange={(e) => roadsStore.updateFixed(key, e.currentTarget.checked ? [1] : [])}
                                  />
                                  <FormCheck
                                    type="checkbox"
                                    id={`${key}_${secondLabel}`}
                                    disabled={roadsStore.isLoading}
                                    label={secondLabel}
                                    className={classNames('text-start mb-2.5 ps-2r"', {
                                      'text-muted': roadsStore.isLoading,
                                    })}
                                    checked={filterItem.value && filterItem.value[0] === 0}
                                    onChange={(e) => roadsStore.updateFixed(key, e.currentTarget.checked ? [0] : [])}
                                  />
                                </>
                              </CollapseLoading>
                            );
                          }
                        }

                        return null;
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      }
      footer={
        <>
          {userStoreInstance.isSignedIn && (
            <>
              {presetStore.activePreset !== undefined ? (
                <Button variant="ghost" className="px-0 text-danger" onClick={() => presetStore.removeActivePreset()}>
                  Удалить сохранённую фильтрацию
                </Button>
              ) : (
                <Training id="filter" step={1}>
                  <Button
                    disabled={!roadsStore.selectedFiltersCount}
                    variant="ghost"
                    className="px-0"
                    onClick={() => presetStore.setShowSaveFilterModal(true)}
                  >
                    Сохранить фильтрацию
                  </Button>
                </Training>
              )}
            </>
          )}
          <div className="flex-grow-1" />
          <Button
            variant="stroke"
            disabled={roadsStore.isLoading || roadsStore.selectedFiltersCount === 0}
            onClick={() => roadsStore.clearFilter()}
          >
            Сбросить все фильтры
          </Button>
          <Button
            disabled={roadsStore.isLoading}
            isLoading={roadsStore.isLoading}
            onClick={() => roadsStore.applyFilter()}
          >
            {roadsStore.applyButtonText}
          </Button>
        </>
      }
    />
  );
}

export default observer(FiltersModal);
