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
      title: 'Местоположение',
      units: [
        { type: FilterType.MultiSelect, label: 'Регион', key: 'REGION' },
        { type: FilterType.MultiSelect, label: 'Агломерация', key: 'AGGLOMERATION' },
        { type: FilterType.MultiSelect, label: 'Район', key: 'DISTRICT' },
        { type: FilterType.MultiSelect, label: 'Город', key: 'CITY' },
        { type: FilterType.MultiSelect, label: 'Населённый пункт', key: 'LOCALITY' },
      ],
    },
    {
      title: 'Правовая информация',
      units: [
        { type: FilterType.LookupMultipleWithPaged, label: 'Владелец', key: 'OWNER' },
        { type: FilterType.MultiSelect, label: 'Эксплуатирующая организация', key: 'EXPL_ORG' },
        { type: FilterType.LookupMultipleWithPaged, label: 'Документ-основание', key: 'BASE_DOCUMENT' },
        { type: FilterType.MultiSelect, label: 'Значение', key: 'ROAD_VALUE' },
        { type: FilterType.Fixed, label: 'Статус проверки, Проверено, Не проверено', key: 'IS_CHECKED' },

        // { type: FilterType.MultiSelect, label: 'Статус проверки' },
      ],
    },
    {
      title: 'Проектная деятельность',
      units: [
        { type: FilterType.LookupHierarchy, label: 'Проект', key: 'PROJECT' },
        { type: FilterType.MultiSelect, label: 'Заказчик', key: 'CUSTOMER' },
        { type: FilterType.MultiSelect, label: 'Подрядчик', key: 'CONTRACTOR' },
        { type: FilterType.MultiSelect, label: 'Источник финансирования', key: 'FIN_SOURCE' },
        { type: FilterType.MultiSelect, label: 'Вид работ', key: 'WORK_TYPE' },
        { type: FilterType.MultiSelect, label: 'Статус', key: 'WORK_STATUS' },
        { type: FilterType.Switch, label: 'КЖЦ', key: 'IS_LIFE_CYCLE' },
        { type: FilterType.Switch, label: 'С применением новых технологий и материалов', key: 'IS_NEW_TECHNOLOGY' },
      ],
    },
  ],
  [
    {
      title: 'Технические характеристики',
      units: [
        { type: FilterType.MultiSelect, label: 'Класс', key: 'ROAD_CLASS' },
        { type: FilterType.MultiSelect, label: 'Категория', key: 'ROAD_CATEGORY' },
        { type: FilterType.MultiSelect, label: 'Вид покрытия', key: 'ROAD_COATING' },
        { type: FilterType.MultiSelect, label: 'Число полос движения', key: 'RANKS' },
        { type: FilterType.MultiSelect, label: 'Максимальная скорость движения', key: 'TOP_SPEED' },
        { type: FilterType.MultiSelect, label: 'Дорожно-климатическая зона', key: 'CLIMATIC_ZONE' },
        { type: FilterType.MultiSelect, label: 'Нагрузка на ось', key: 'AXLE_LOAD' },
        { type: FilterType.Switch, label: 'Пропускная способность', key: 'THROUGHPUT' },
        { type: FilterType.Switch, label: 'Ширина проезжей части', key: 'ROAD_WIDTH' },
        { type: FilterType.Switch, label: 'Ширина земляного полотна', key: 'SUBGRADE_WIDTH' },
      ],
    },
    {
      title: 'Нормативное состояние',
      units: [
        { type: FilterType.MultiSelect, label: 'Вид проведения диагностики', key: 'DIAGNOSTIC_TYPE' },
        { type: FilterType.MultiSelect, label: 'Статус проведения диагностики', key: 'DIAGNOSTIC_STATUS' },
        {
          type: FilterType.Switch,
          label: 'Соответствие нормативному состоянию',
          key: 'NORM_PERCENTAGE',
          min: 0,
          max: 100,
        },
      ],
    },
  ],
  [
    {
      title: 'Безопасность',
      units: [
        { type: FilterType.MultiSelect, label: 'Статус аварийно-опасного участка', key: 'EMER_STATUS' },
        { type: FilterType.MultiSelect, label: 'Вид ДТП', key: 'EMER_DTP_TYPE' },
        { type: FilterType.Switch, label: 'ДТП с погибшими', key: 'IS_HAVE_DEAD' },
        { type: FilterType.Switch, label: 'ДТП с пострадавшими', key: 'IS_HAVE_WOUNDED' },
      ],
    },
    {
      title: 'Сообщения граждан',
      units: [
        { type: FilterType.MultiSelect, label: 'Тип', key: 'APPEAL_TYPE' },
        { type: FilterType.MultiSelect, label: 'Статус', key: 'APPEAL_STATUS' },
      ],
    },
    {
      title: 'Дополнительно',
      units: [
        { type: FilterType.Switch, label: 'Доступно на карте', key: 'IS_HAVE_GEOMETRY' },
        { type: FilterType.Switch, label: 'Входит в опорную сеть', key: 'IS_CORE_NETWORK' },
        { type: FilterType.LookupHierarchy, label: 'Критерий опорной сети', key: 'CORE_NETWORK_CRITERION' },
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
