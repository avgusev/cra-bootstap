import { observer } from 'mobx-react-lite';
import { FormCheck, ToggleButton } from 'react-bootstrap';
import Button from '../../../components/Button';
import CheckSelect from '../../../components/CheckSelect';
import FilterCollapse from '../../../components/FilterCollapse';
import Modal from '../../../components/Modal';
import { FilterType } from '../api';
import { FiltersLayoutStore } from '../store/filtersLayoutStore';
import { PresetStore } from '../store/presetStore';
import { BridgesStore } from '../store/bridgesStore';
import classNames from 'classnames';
import CheckSelectTree from '../../../components/CheckSelectTree';
import CollapseLoading from '../../../components/CollapseLoading';

const SHOW_UNDEF_FILTERS = false;

function FiltersModal({
  bridgesStore,
  presetStore,
  filtersLayoutStore: layout,
}: {
  bridgesStore: BridgesStore;
  presetStore: PresetStore;
  filtersLayoutStore: FiltersLayoutStore;
}) {
  return (
    <Modal
      size="lg"
      show={bridgesStore.isOpenFiltersModal}
      onHide={() => bridgesStore.hideFiltersModal()}
      dialogClassName="modal-80w"
      contentClassName="h-100" // w-auto
      // header={}
      body={
        <>
          <div className="mb-4 mt-2r d-flex justify-content-between">
            <h1>Фильтры</h1>
            <input
              type="search"
              placeholder="Поиск по характеристикам, параметру или выборке"
              className="form-control mb-2 mb-lg-0 me-2 flex-grow-1"
              style={{ maxWidth: '66%' }}
              value={layout.textSearch}
              onChange={(e) => (layout.textSearch = e.target.value)}
            />
          </div>
          {presetStore.showPresets.length > 0 && (
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
                        const { type, label, key } = unit;

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
                          const filterItem = bridgesStore.filters[key];
                          if (filterItem.type === FilterType.MultiSelect) {
                            if (filterItem.options.length < 1) {
                              return <FilterCollapse.Disabled key={index} label={label} />;
                            }

                            return (
                              <FilterCollapse
                                key={key}
                                label={label}
                                hasValue={filterItem.value && filterItem.value.length > 0}
                                onClear={() => bridgesStore.updateMultiSelect(key, [])}
                              >
                                <CheckSelect
                                  search={filterItem.options.length > 6}
                                  placeholder="Поиск"
                                  options={filterItem.options}
                                  value={filterItem.value}
                                  disabled={bridgesStore.isLoading || !bridgesStore.bridges}
                                  onChange={(values) => bridgesStore.updateMultiSelect(key, values)}
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
                                disabled={bridgesStore.isLoading || filterItem.isDisabled}
                                reverse
                                label={label}
                                className={classNames('h4 text-start mb-4', {
                                  'text-muted': bridgesStore.isLoading || filterItem.isDisabled,
                                })}
                                checked={filterItem.value}
                                onChange={(e) => bridgesStore.updateSwitch(key, e.currentTarget.checked)}
                              />
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
                                onClear={() => bridgesStore.updateLookupHierarchy(key, [])}
                              >
                                <CheckSelectTree
                                  search
                                  placeholder="Поиск"
                                  options={filterItem.options}
                                  value={filterItem.value}
                                  disabled={bridgesStore.isLoading || !bridgesStore.bridges}
                                  onChange={(values) => bridgesStore.updateLookupHierarchy(key, values)}
                                  getOptionValue={(option) => option.pathId}
                                  getOptionLabel={(option) => option.text}
                                  getOptionChildren={(option) => option.children || []}
                                />
                              </FilterCollapse>
                            );
                          }

                          if (filterItem.type === FilterType.Fixed) {
                            const [title, firstLabel, secondLabel] = label.split(',');
                            return (
                              <CollapseLoading key={index} header={title} iconRight>
                                <>
                                  <FormCheck
                                    type="checkbox"
                                    id={`${key}_${firstLabel}`}
                                    disabled={bridgesStore.isLoading}
                                    label={firstLabel}
                                    className={classNames('text-start mb-2.5 ps-2r"', {
                                      'text-muted': bridgesStore.isLoading,
                                    })}
                                    checked={filterItem.value && filterItem.value[0] === 1}
                                    onChange={(e) => bridgesStore.updateFixed(key, e.currentTarget.checked ? [1] : [])}
                                  />
                                  <FormCheck
                                    type="checkbox"
                                    id={`${key}_${secondLabel}`}
                                    disabled={bridgesStore.isLoading}
                                    label={secondLabel}
                                    className={classNames('text-start mb-2.5 ps-2r"', {
                                      'text-muted': bridgesStore.isLoading,
                                    })}
                                    checked={filterItem.value && filterItem.value[0] === 0}
                                    onChange={(e) => bridgesStore.updateFixed(key, e.currentTarget.checked ? [0] : [])}
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
          {presetStore.activePreset !== undefined ? (
            <Button variant="ghost" className="px-0 text-danger" onClick={() => presetStore.removeActivePreset()}>
              Удалить сохранённую фильтрацию
            </Button>
          ) : (
            <Button
              disabled={!bridgesStore.selectedFiltersCount}
              variant="ghost"
              className="px-0"
              onClick={() => presetStore.setShowSaveFilterModal(true)}
            >
              Сохранить фильтрацию
            </Button>
          )}
          <div className="flex-grow-1" />
          <Button
            variant="stroke"
            disabled={bridgesStore.isLoading || bridgesStore.selectedFiltersCount === 0}
            onClick={() => bridgesStore.clearFilter()}
          >
            Сбросить все фильтры
          </Button>
          <Button
            disabled={bridgesStore.isLoading}
            isLoading={bridgesStore.isLoading}
            onClick={() => bridgesStore.applyFilter()}
          >
            {bridgesStore.applyButtonText}
          </Button>
        </>
      }
    />
  );
}

export default observer(FiltersModal);
