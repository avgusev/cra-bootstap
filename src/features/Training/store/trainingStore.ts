import { makeAutoObservable } from 'mobx';

type TrainingType = {
  block?: string;
  steps: {
    title: string;
    text: string;
  }[];
};

const initialTraining: TrainingType[] = [
  {
    block: 'registry',
    steps: [
      {
        title: 'Настройка и отображение таблицы',
        text: 'Настраивайте очередность и управляйте отображением столбцов.',
      },
      {
        title: 'Работа с каждым столбцом',
        text: 'Добавляйте и скрывайте каждый столбец отдельно.',
      },
      {
        title: 'Фильтрация',
        text: 'Фильтруйте отображаемые табличные данные.',
      },
    ],
  },
  // {
  //   block: 'filter',
  //   steps: [
  //     {
  //       title: 'Поиск по характеристикам',
  //       text: 'Воспользуйтесь поиском по доступным характеристикам.',
  //     },
  //     {
  //       title: 'Пресеты для быстрой работы',
  //       text: 'Сохраняйте пресеты настроек характеристик чтобы быстро применить их в следующий раз.',
  //     },
  //   ],
  // },
  {
    block: 'passport',
    steps: [
      {
        title: 'Поиск по характеристикам',
        text: 'Воспользуйтесь поиском по характеристикам.',
      },
      {
        title: 'Все доступные характеристики',
        text: 'Используйте оглавление для быстрого просмотра паспорта и перемещения между характеристиками.',
      },
      {
        title: 'Подтвердите паспорт',
        text: 'Для подтверждения паспорта перейдите в режим редактирования и включите галочку "Подтверждаю".',
      },
    ],
  },
  {
    block: 'dashboard',
    steps: [
      {
        title: 'Все доступные дашборды',
        text: 'Посмотрите список всех доступных дашбордов.',
      },
    ],
  },
];

export class TrainingStore {
  // rootStore: RootStore;

  private _isOpenTraining = '';
  trainingStep = 0;
  trainings?: TrainingType;

  constructor() {
    makeAutoObservable(this);
  }

  //#Trening modal
  get isOpenTrening() {
    return this._isOpenTraining;
  }

  set isOpenTrening(value) {
    this._isOpenTraining = value;
  }

  showTrening = (name = '', training?: TrainingType) => {
    this.isOpenTrening = name;
    if (training) {
      this.trainings = training;
    } else {
      this.trainings = initialTraining.find((item) => item.block === name);
    }
  };
  hideTrening = () => {
    this.isOpenTrening = '';
    this.trainingStep = 0;
  };

  updateStep = (step: number) => {
    this.trainingStep = step;
  };
}

const trainingStore = new TrainingStore();

export default trainingStore;
