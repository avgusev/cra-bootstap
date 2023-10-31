import { BlockMetadata } from '../../../features/DetailedView/types';

type Meta = Record<string, BlockMetadata[]>;

export const meta: Meta = {};

export type IItem = {
  dataIndex?: string;
  title?: string;
  children?: IItem[];
};

export const depthMeasurementsColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'length',
    title: 'Протяженность, км',
  },
  {
    dataIndex: 'value',
    title: 'Глубина колеи по полосам движения, мм',
    children: [
      { dataIndex: 'row', title: 'Полоса' },
      { dataIndex: 'value', title: 'Значение' },
    ],
  },
  {
    dataIndex: 'norma',
    title: 'Соответствие нормативному состоянию',
  },
];

export const defectsColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'length',
    title: 'Протяженность, км',
  },
  // {
  //   dataIndex: '',
  //   title: 'Коды дефектов по направлению',
  //   children: [
  {
    dataIndex: 'straight',
    title: 'Прямое направление',
    children: [
      { dataIndex: 'row', title: 'Полоса' },
      { dataIndex: 'value', title: 'Значение' },
    ],
  },
  {
    dataIndex: 'opposite',
    title: 'Обратное направление',
    children: [
      { dataIndex: 'row', title: 'Полоса' },
      { dataIndex: 'value', title: 'Значение' },
    ],
  },
  //   ],
  // },
  {
    dataIndex: 'ball',
    title: 'Бальная оценка',
  },
  {
    dataIndex: 'norma',
    title: 'Соответствие нормативному состоянию, %',
  },
];

export const crossColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'length',
    title: 'Протяженность, км',
  },
  // {
  //   dataIndex: '',
  //   title: 'Коды дефектов по направлению',
  //   children: [
  {
    dataIndex: 'straight',
    title: 'Прямое направление',
    children: [
      { dataIndex: 'row', title: 'Полоса' },
      { dataIndex: 'value', title: 'Значение' },
    ],
  },
  {
    dataIndex: 'opposite',
    title: 'Обратное направление',
    children: [
      { dataIndex: 'row', title: 'Полоса' },
      { dataIndex: 'value', title: 'Значение' },
    ],
  },
  //   ],
  // },
  {
    dataIndex: 'norma',
    title: 'Соответствие нормативному состоянию, %',
  },
];

export const smoothnessColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'length',
    title: 'Протяженность, км',
  },
  {
    dataIndex: 'badEvenness',
    title: 'Наихудший показатель ровности',
  },
  {
    dataIndex: 'norma',
    title: 'Соответствие нормативному состоянию',
  },
];

export const pavementColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'length',
    title: 'Протяженность, км',
  },
  {
    dataIndex: 'strength',
    title: 'Коэффициент прочности',
  },
  {
    dataIndex: 'norma',
    title: 'Соответствие нормативному состоянию',
  },
];

export const lateralColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'length',
    title: 'Протяженность, км',
  },
  {
    dataIndex: 'crossedDrawings',
    title: 'Измеренные продольные уклоны, %',
  },
  {
    dataIndex: 'normativeState',
    title: 'Соответствие нормативному состоянию',
  },
];

export const curveRadiusesColumns: IItem[] = [
  {
    dataIndex: 'start',
    title: 'Начало участка',
  },
  {
    dataIndex: 'finish',
    title: 'Конец участка',
  },
  {
    dataIndex: 'radius',
    title: 'Измеренный радиус кривой в плане, м',
  },
  {
    dataIndex: 'angle',
    title: 'Угол поворота',
  },
  {
    dataIndex: 'turn',
    title: 'Поворот',
  },
  {
    dataIndex: 'virazh',
    title: 'Вираж',
  },
  {
    dataIndex: 'norma',
    title: 'Соответствие нормативному состоянию, %',
  },
];
