import { CardList, NavigationStruct } from '../../features/DetailedView/types';

export enum RoadDiagnosticResultsId {
  DepthMeasurements = 1,
  Defects = 2,
  Coefficients = 3,
  SmoothnessOneHundred = 4,
  Smoothness = 5,
  PavementDurabilities = 6,
  CrossSlopes = 7,
  LateralCrosses = 8,
  CurveRadiuses = 9,
}

export const navigation: NavigationStruct = {
  common: {
    id: 'common',
    name: 'Общая информация',
    blocks: [
      {
        id: RoadDiagnosticResultsId.DepthMeasurements,
        name: 'Ведомость измерения глубины колеи',
        endpoint: 'depth-measurements',
      }, // 3
      {
        id: RoadDiagnosticResultsId.Defects,
        name: 'Ведомость дефектов покрытия',
        endpoint: 'defects',
      }, // 7
      {
        id: RoadDiagnosticResultsId.Coefficients,
        name: 'Ведомость измерения коэффициента сцепления',
        endpoint: 'coefficient-measurements',
      }, // 9
      {
        id: RoadDiagnosticResultsId.SmoothnessOneHundred,
        name: 'Ведомость измерения продольной ровности на 100 м',
        endpoint: 'smoothness-one-hundred',
      }, // 4
      {
        id: RoadDiagnosticResultsId.Smoothness,
        name: 'Ведомость измерения продольной ровности на 1 км',
        endpoint: 'smoothness',
      }, // 5

      {
        id: RoadDiagnosticResultsId.PavementDurabilities,
        name: 'Ведомость измерений прочности дорожной одежды',
        endpoint: 'pavement-durabilities',
      }, // 7
      {
        id: RoadDiagnosticResultsId.CrossSlopes,
        name: 'Ведомость поперечных уклонов',
        endpoint: 'cross-slopes',
      }, // 9
      {
        id: RoadDiagnosticResultsId.LateralCrosses,
        name: 'Ведомость продольных уклонов',
        endpoint: 'lateral-crosses',
      }, // 4
      {
        id: RoadDiagnosticResultsId.CurveRadiuses,
        name: 'Ведомость радиусов кривых в плане',
        endpoint: 'curve-radiuses',
      }, // 5
    ],
  },
};

export const navKeys: (keyof NavigationStruct)[] = [
  'depth-measurements',
  'defects',
  'coefficient-measurements',
  'smoothness-one-hundred',
  'smoothness',
  'pavement-durabilities',
  'cross-slopes',
  'lateral-crosses',
  'curve-radiuses',
];

export const cardList: CardList = [
  [
    [
      { title: 'Начало участка', code: 'START', className: 'col-4' },
      { title: 'Конец конец', code: 'FINISH', className: 'col-4' },
      { title: 'Протяженность', code: 'LENGTH', className: 'col-4' },
    ],
    [
      { title: 'Площадь покрытия проезжей части, кв.м', code: 'SQUARE', className: 'col-4' },
      { title: 'Тип диагностики', code: 'DIAGNOSTIC_TYPE', className: 'col-4' },
      // { title: 'Статус', code: 'PLAN_FACT', className: 'col-4' },
    ],
  ],
];
