import { CardList, NavigationStruct } from '../../features/DetailedView/types';

export enum BridgeCardBlockId {
  CommonInfo = 0,
  ExtraParameters = 1,
  MovementRestrictions = 10,
  EstimateOfTechnicalCondition = 20,
  ListOfDefects = 30,
  Works = 40,
  Documentation = 50,
  Drawings = 70,
}

export const navigation: NavigationStruct = {
  common: {
    id: 'common',
    name: 'Общая информация',
    blocks: [
      {
        id: BridgeCardBlockId.Documentation,
        name: 'Документация',
        endpoint: 'documentation',
      }, // 50
      // {
      //   id: BridgeCardBlockId.MovementRestrictions,
      //   name: 'Параметры ограничений движения',
      //   endpoint: 'movement-restrictions',
      // }, // 10
      {
        id: BridgeCardBlockId.Works,
        name: 'Работы',
        endpoint: 'works',
      }, // 40
      {
        id: BridgeCardBlockId.EstimateOfTechnicalCondition,
        name: 'Оценка технического состояния',
        endpoint: 'estimate-of-technical-conditions',
      }, // 20
    ],
  },
};

export const navKeys: (keyof NavigationStruct)[] = [
  'documentation',
  'movement-restrictions',
  'works',
  'estimate-of-technical-conditions',
];

export const modalNavKeys: (keyof NavigationStruct)[] = ['estimate-of-technical-conditions'];

export const cardList: CardList = [
  [
    // [{ title: 'Фотографии', code: 'FOTO', className: 'col-12' }],
    [
      { title: 'Вид мостового сооружения', code: 'TYPE', className: 'col-4' },
      { title: 'Тип моста', code: 'BRIDGE_TYPE_1', className: 'col-4' },
      { title: 'Техническое состояние мостового сооружения', code: 'TECHNICAL_CONDITION', className: 'col-4' },
    ],
    [
      { title: 'Полная длина мостового сооружения, м', code: 'LENGTH', className: 'col-4' },
      { title: 'Площадь покрытия мостового сооружения, кв. м', code: 'SQUARE', className: 'col-4' },
      { title: 'Ширина мостового полотна, м', code: 'OVERALL_DIMENSIONS', className: 'col-4' },
    ],
    [
      { title: 'Вид препятствия', code: 'TYPE_OF_OBSTACLE', className: 'col-4' },
      { title: 'Наименование основного препятствия', code: 'OBSTACLE_NAME', className: 'col-4' },
    ],
    [
      { title: 'Начало, км+м', code: 'START', className: 'col-4' },
      { title: 'Владелец', code: 'OWNER', className: 'col-4' },
      { title: 'Эксплуатирующая организация', code: 'EXPL_ORG', className: 'col-4' },
    ],
  ],
  [
    [
      { title: 'Регион', code: 'REGION', className: 'col-4' },
      { title: 'Город', code: 'CITY', className: 'col-4' },
      { title: 'Район', code: 'DISTRICT', className: 'col-4' },
    ],
    [
      { title: 'Наименование автомобильной дороги', code: 'ROAD', className: 'col-4' },
      { title: 'Тип расположения', code: 'LOCATION_TYPE', className: 'col-4' },
      { title: 'Вид покрытия мостового полотна', code: 'CLOTHING', className: 'col-4' },
    ],
  ],
];
