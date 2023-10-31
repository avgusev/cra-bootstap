import { CardList, NavigationStruct } from '../../features/DetailedView/types';

export enum BackboneNetworkBlockId {
  CommonInfo = 0,
  Work = 402,
}

export const navigation: NavigationStruct = {
  common: {
    id: 'common',
    name: 'Общая информация',
    blocks: [
      {
        id: BackboneNetworkBlockId.Work,
        name: 'Работы',
        endpoint: 'backbone-network-works',
      }, // 1
    ],
  },
};

export const navKeys: (keyof NavigationStruct)[] = [];

export const cardList: CardList = [
  [
    [
      { title: 'Начало участка', code: 'START', className: 'col-4' },
      { title: 'Конец участка', code: 'FINISH', className: 'col-4' },
      { title: 'Протяженность, км', code: 'LENGTH', className: 'col-4' },
    ],
    [
      { title: 'Критерии опорной сети', code: 'CRITERION', className: 'col-8' },
      { title: 'МТМ', code: 'ITR', className: 'col-4' },
    ],
    [
      { title: 'Дата начала', code: 'DATE_START', className: 'col-4' },
      { title: 'Дата окончания', code: 'DATE_FINISH', className: 'col-4' },
    ],
  ],
];
