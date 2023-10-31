import { makeAutoObservable } from 'mobx';
import { FilterKey, RootStore } from '.';
import { FilterType } from '../api';

type FiltersLayoutType = {
  title: string;
  units: {
    type: FilterType;
    label: string;
    key?: FilterKey;
    min?: number;
    max?: number;
  }[];
};

const initialFiltersLayout: FiltersLayoutType[][] = [
  [
    {
      title: 'Безопасность',
      units: [
        { type: FilterType.DateRange, label: 'Период', key: 'DATE_START.DATE_FINISH' },
        // { type: FilterType.MultiSelect, label: 'Статус аварийно-опасного участка', key: 'EMER_STATUS' },
        { type: FilterType.MultiSelect, label: 'Вид ДТП', key: 'DTP_TYPE' },
        // { type: FilterType.Switch, label: 'ДТП с погибшими', key: 'IS_HAVE_DEAD' },
        // { type: FilterType.Switch, label: 'ДТП с пострадавшими', key: 'IS_HAVE_WOUNDED' },
      ],
    },
  ],
  [
    {
      title: 'Местоположение',
      units: [
        { type: FilterType.MultiSelect, label: 'Регион', key: 'REGION' },
        // { type: FilterType.MultiSelect, label: 'Агломерация', key: 'AGGLOMERATION' },
        { type: FilterType.MultiSelect, label: 'Район', key: 'DISTRICT' },
        { type: FilterType.MultiSelect, label: 'Город', key: 'CITY' },
        { type: FilterType.MultiSelect, label: 'Населённый пункт', key: 'LOCALITY' },
      ],
    },
  ],
  [
    {
      title: 'Автомобильная дорога',
      units: [
        { type: FilterType.MultiSelect, label: 'Владелец' }, // key: 'OWNER'
        { type: FilterType.MultiSelect, label: 'Значение', key: 'VALUE_OF_THE_ROAD' },
      ],
    },

    {
      title: 'Дополнительно',
      units: [
        { type: FilterType.MultiSelect, label: 'Система-источник', key: 'SOURCESYSTEM' },
        // { type: FilterType.Switch, label: 'Доступно на карте', key: 'IS_HAVE_GEOMETRY' },
      ],
    },
  ],
];

export class FiltersLayoutStore {
  rootStore: RootStore;

  private _textSearch = '';
  public get textSearch() {
    return this._textSearch;
  }
  public set textSearch(value) {
    this._textSearch = value;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get filters() {
    return initialFiltersLayout.map((column) =>
      column
        .map((group) => ({
          ...group,
          units: group.units.filter((item) => item.label.toLowerCase().includes(this.textSearch.toLowerCase())),
        }))
        .filter((group) => group.units.length > 0)
    ); // .filter((column) => column.length > 0);
  }
}
