import { makeAutoObservable } from 'mobx';
import { FilterKey, RootStore } from '.';
import { FilterType } from '../api';

const initialFiltersLayout: {
  title: string;
  units: {
    type: FilterType;
    label: string;
    key?: FilterKey;
    min?: number;
    max?: number;
  }[];
}[][] = [
  [
    {
      title: 'Общая информация',
      units: [
        { type: FilterType.MultiSelect, label: 'Вид', key: 'TYPE' },
        { type: FilterType.MultiSelect, label: 'Тип моста', key: 'BRIDGE_TYPE' },
        { type: FilterType.MultiSelect, label: 'Тип препятствия', key: 'TYPE_OF_OBSTACLE' },
        { type: FilterType.MultiSelect, label: 'Состояние', key: 'TECHNICAL_CONDITION' },
        { type: FilterType.MultiSelect, label: 'Вид покрытия', key: 'CLOTHING' },
        { type: FilterType.Switch, label: 'Наличие объезда', key: 'DETOUR' },
        { type: FilterType.Switch, label: 'Соответствие критериям уникальности', key: 'IS_UNIQUE' },
      ],
    },
  ],
  [
    {
      title: 'Автомобильная дорога',
      units: [
        { type: FilterType.MultiSelect, label: 'Значение', key: 'VALUE_OF_THE_ROAD' },
        { type: FilterType.MultiSelect, label: 'Категория', key: 'ROAD_CATEGORY' },
        { type: FilterType.MultiSelect, label: 'Регион', key: 'REGION' },
        { type: FilterType.MultiSelect, label: 'Агломерация', key: 'AGGLOMERATION' },
        { type: FilterType.MultiSelect, label: 'Район', key: 'DISTRICT' },
        { type: FilterType.MultiSelect, label: 'Город', key: 'CITY' },
        { type: FilterType.MultiSelect, label: 'Населённый пункт', key: 'LOCALITY' },
      ],
    },
  ],
  [
    {
      title: 'Правовая информация',
      units: [
        { type: FilterType.MultiSelect, label: 'Владелец', key: 'OWNER' },
        { type: FilterType.MultiSelect, label: 'Эксплуатирующая организация', key: 'OPERATOR' },
        { type: FilterType.Fixed, label: 'Статус проверки, Проверено, Не проверено', key: 'IS_CHECKED' },
      ],
    },
    {
      title: 'Дополнительно',
      units: [{ type: FilterType.Switch, label: 'Доступно на карте', key: 'IS_HAVE_GEOMETRY' }],
    },
    {
      title: 'Проектная деятельность',
      units: [{ type: FilterType.LookupHierarchy, label: 'Проект', key: 'PROJECT' }],
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
