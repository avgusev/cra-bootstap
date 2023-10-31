import { observer } from 'mobx-react-lite';
import { FormCheck, ToggleButton } from 'react-bootstrap';
import { parse } from 'date-fns';
import Button from '../../../components/Button';
import CheckSelect from '../../../components/CheckSelect';
import FilterCollapse from '../../../components/FilterCollapse';
import Modal from '../../../components/Modal';
import { FilterType } from '../api';
import { FiltersLayoutStore } from '../store/filtersLayoutStore';
import { PresetStore } from '../store/presetStore';
import { AccidentsStore } from '../store/accidentsStore';
import { userStoreInstance } from '../../../features/Auth/store';
import SkdfDatePicker from '../../../components/DatePicker';
import Training from '../../../features/Training';

const SHOW_UNDEF_FILTERS = true;

function FiltersModal({
  accidentsStore,
  presetStore,
  filtersLayoutStore: layout,
}: {
  accidentsStore: AccidentsStore;
  presetStore: PresetStore;
  filtersLayoutStore: FiltersLayoutStore;
}) {
  return (
    <Modal
      size="lg"
      show={accidentsStore.isOpenFiltersModal}
      onHide={() => accidentsStore.hideFiltersModal()}
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
                          const filterItem = accidentsStore.filters[key];
                          if (filterItem.type === FilterType.MultiSelect) {
                            if (filterItem.options.length < 1) {
                              return <FilterCollapse.Disabled key={index} label={label} />;
                            }

                            return (
                              <FilterCollapse
                                key={key}
                                label={label}
                                hasValue={filterItem.value && filterItem.value.length > 0}
                                onClear={() => accidentsStore.updateMultiSelect(key, [])}
                              >
                                <CheckSelect
                                  search={filterItem.options.length > 6}
                                  placeholder="Поиск"
                                  options={filterItem.options}
                                  value={filterItem.value}
                                  disabled={accidentsStore.isLoading || !accidentsStore.accidents}
                                  onChange={(values) => accidentsStore.updateMultiSelect(key, values)}
                                  getOptionValue={(option) => option.id}
                                  getOptionLabel={(option) => option.text}
                                />
                              </FilterCollapse>
                            );
                          }

                          if (filterItem.type === FilterType.DateRange) {
                            return (
                              <FilterCollapse
                                key={key}
                                label={label}
                                hasValue={filterItem.value && (!!filterItem.value.start || !!filterItem.value.end)}
                                onClear={() => {
                                  accidentsStore.updateDateRange(key, [null, null]);
                                  accidentsStore.loadFilterDateRange();
                                }}
                              >
                                <SkdfDatePicker
                                  id={String(index)}
                                  selectRangeMode="day"
                                  disabled={accidentsStore.isLoading || !accidentsStore.accidents}
                                  minDate={
                                    filterItem.min
                                      ? parse(filterItem.min, 'dd.MM.yyyy', new Date())
                                      : new Date(2010, 0, 1)
                                  }
                                  maxDate={
                                    filterItem.max ? parse(filterItem.max, 'dd.MM.yyyy', new Date()) : new Date()
                                  }
                                  startDate={
                                    (filterItem.value.start &&
                                      parse(filterItem.value.start, 'dd.MM.yyyy', new Date())) ||
                                    null
                                  }
                                  endDate={
                                    (filterItem.value.end && parse(filterItem.value.end, 'dd.MM.yyyy', new Date())) ||
                                    null
                                  }
                                  onChange={(date: Date | null | [Date | null, Date | null]) =>
                                    accidentsStore.updateDateRange(key, date)
                                  }
                                  onCalendarClose={() => accidentsStore.loadFilterDateRange()}
                                />
                              </FilterCollapse>
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
                    disabled={!accidentsStore.selectedFiltersCount}
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
            disabled={accidentsStore.isLoading || accidentsStore.selectedFiltersCount === 0}
            onClick={() => accidentsStore.clearFilter()}
          >
            Сбросить все фильтры
          </Button>
          <Button
            disabled={accidentsStore.isLoading}
            isLoading={accidentsStore.isLoading}
            onClick={() => accidentsStore.applyFilter()}
          >
            {accidentsStore.applyButtonText}
          </Button>
        </>
      }
    />
  );
}

export default observer(FiltersModal);
