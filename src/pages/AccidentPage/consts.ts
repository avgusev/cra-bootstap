import { CardList, BlockMetadata, NavigationStruct } from '../../features/DetailedView/types';

export enum TrafficAccidentBlockId {
  CommonInfo = 0,
  RoadConditions = 1,
  Participants = 2,
  ParticipantsSummary = 3,
  VehicleParticipants = 4,
  OtherParticipants = 5,
}

export const navigation: NavigationStruct = {
  common: {
    id: 'common',
    name: 'Общая информация',
    blocks: [
      {
        id: TrafficAccidentBlockId.RoadConditions,
        name: 'Дорожные условия',
        endpoint: 'road-conditions',
      }, // 1
      {
        id: TrafficAccidentBlockId.Participants,
        name: 'Участники',
        endpoint: 'participants',
      }, // 2
    ],
  },
};

export const navKeys: (keyof NavigationStruct)[] = [];

export const cardList: CardList = [
  [
    [
      { title: 'Номер СКДФ', code: 'ID', className: 'col-6' },
      { title: 'Дата и время', code: 'DTP_DATE', className: 'col-6' },
    ],
    [{ title: 'Вид ДТП', code: 'DTP_TYPE', className: 'col-12' }],
    [{ title: 'Причина ДТП', code: 'PDD_VIOLAT', className: 'col-12' }],
    [{ title: 'Система-источник', code: 'SOURCESYSTEM', className: 'col-12' }],
    [
      { title: 'Регион', code: 'REGION', className: 'col-6' },
      { title: 'Координаты', code: ['LATITUDE', 'LONGITUDE'], className: 'col-6' },
    ],
  ],
  [
    [
      { title: 'Идентификационный номер', code: 'IDENTIFICATION_NUMBER_SECTION', className: 'col-6' },
      { title: 'Дорога', code: 'ROAD_FULL_NAME', className: 'col-6' },
    ],
    [
      { title: 'Значение дороги', code: 'ROAD_VALUE_OF_THE_ROAD', className: 'col-6' },
      { title: 'Владелец', code: 'OWNER', className: 'col-6' },
    ],
    [
      { title: 'Категория дороги', code: 'ROAD_CATEGORY', className: 'col-6' },
      { title: 'Место ДТП', code: 'DTP_PLACE', className: 'col-6' },
    ],
  ],
];

export const vehicleTableMeta: BlockMetadata[] = [
  {
    id: 2708,
    name: 'LeavingPlace',
    code: 'LEAVING_PLACE',
    type: 'string',
    title: 'Сведения об оставлении места ДТП',
  },
  {
    id: 2714,
    name: 'Type',
    code: 'TS_TYPE',
    type: 'string',
    title: 'Тип ТС',
  },
  {
    id: 2649,
    name: 'Color',
    code: 'TS_COLOR',
    type: 'string',
    title: 'Цвет',
  },
  {
    id: 2688,
    name: 'Model',
    code: 'TS_MODEL',
    type: 'string',
    title: 'Марка/Модель',
  },
  {
    id: 2650,
    name: 'DamagePlaces',
    code: 'DAMAGE_PLACES',
    type: 'string',
    title: 'Места повреждения',
  },
  {
    id: 2709,
    name: 'TechProblems',
    code: 'TECH_PROBLEMS',
    type: 'string',
    title: 'Технические неисправности',
  },
  {
    id: 2707,
    name: 'Wheel',
    code: 'WHEEL',
    type: 'string',
    title: 'Расположение руля, тип привода',
  },
  {
    id: 2710,
    name: 'PropertyForm',
    code: 'PROPERTY_FORM',
    type: 'string',
    title: 'Форма собственности',
  },
  {
    id: 3324,
    name: 'Date',
    code: 'TS_DATE',
    type: 'string',
    title: 'Год выпуска',
  },
];

export const participantsTableMeta: BlockMetadata[] = [
  {
    id: 2696,
    name: 'Category',
    code: 'PERS_CATEGORY',
    type: 'string',
    title: 'Категория участника',
  },
  {
    id: 3323,
    name: 'Sex',
    code: 'SEX',
    type: 'string',
    title: 'Пол',
  },
  {
    id: 2699,
    name: 'WoundCons',
    code: 'WOUND_CONS',
    type: 'string',
    title: 'Степень тяжести последствий',
  },
  {
    id: 2697,
    name: 'PddViolat',
    code: 'PDD_VIOLAT',
    type: 'string',
    title: 'Непосредственные нарушения ПДД',
  },
  {
    id: 2698,
    name: 'PddViolatRelated',
    code: 'PDD_VIOLAT_RELAT',
    type: 'string',
    title: 'Сопутствующие нарушения ПДД',
  },
  {
    id: 2638,
    name: 'SafeBelt',
    code: 'SAFE_BELT',
    type: 'boolean',
    title: 'Использовался ли ремень',
  },
  {
    id: 2641,
    name: 'ChildSeat',
    code: 'CHILD_SEAT',
    type: 'string',
    title: 'Тип ДУУ',
    titleHint: 'Тип детского удерживающего устройства',
  },
  {
    id: 2640,
    name: 'DrivingExp',
    code: 'DRIVING_EXP',
    type: 'number',
    title: 'Водительский стаж',
  },
  {
    id: 2695,
    name: 'LeavingPlace',
    code: 'PERS_LEAVING_PLACE',
    type: 'string',
    title: 'Сведения об оставлении места ДТП',
  },
  {
    id: 2639,
    name: 'AlcoLevel',
    code: 'ALCO_LEVEL',
    type: 'string',
    title: 'Степень опьянения',
  },
];
