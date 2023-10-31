import { BlockMetadata } from '../../../features/DetailedView/types';

type Meta = Record<string, BlockMetadata[]>;

export const meta: Meta = {
  documentation: [
    { id: 3169, name: 'Type', code: 'TYPE_OF_DOCUMENT', type: 'string', title: 'Тип документации' },
    { id: 0, name: 'Name', code: 'NAME', type: 'string', title: 'Наименование' },
    { id: 4280, name: 'Approved', code: 'APPROVED', type: 'boolean', title: 'Утвержден' },
    { id: 3156, name: 'RegDate', code: 'REG_DATE', type: 'date', title: 'Дата утверждения' },
    {
      id: 4282,
      name: 'ProjectDocDate',
      code: 'PROJECT_DOC_DATE',
      type: 'date',
      title: 'Дата завершения разработки проектной документации',
    },
    {
      id: 4281,
      name: 'StateExaminationDate',
      code: 'STATE_EXAMINATION_DATE',
      type: 'date',
      title: 'Дата получения положительных заключений государственной экспертизы',
    },
    { id: 201, name: 'AuthorOrg', code: 'AUTHOR_ORG', type: 'string', title: 'Составитель' },
    // { id: 0, name: 'File', code: 'FILES', type: 'files', title: 'Файл' },
  ],
  works: [
    { id: 1972, name: 'Start', code: 'START', type: 'string', title: 'Начало участка' },
    { id: 1973, name: 'Finish', code: 'FINISH', type: 'string', title: 'Конец участка' },
    { id: 1851, name: 'Lenght', code: 'LENGTH', type: 'number', title: 'Протяженность, км' },
    { id: 2321, name: 'Square', code: 'SQUARE', type: 'number', title: 'Площадь покрытия проезжей части, кв.м' },
    { id: 1832, name: 'Deadline', code: 'DEADLINE', type: 'date', title: 'Срок проведения' },
    { id: 0, name: 'SumZnach', code: 'ZNACH', type: 'number', title: 'Предусмотрено, тыс.руб' },
    { id: 0, name: 'FinSource', code: 'ISTOCHNIK_FINANCIROVANIYA', type: 'string', title: 'Источник финансирования' },
    { id: 0, name: 'Project', code: 'PROJECT', type: 'string', title: 'Проект' },
    { id: 2127, name: 'WorkFinish', code: 'WORK_FINISH', type: 'string', title: 'Дата завершения работ' },
    { id: 2008, name: 'Map', code: 'MAP', type: 'map', title: 'На карте', width: '7rem' },
  ],
  'estimate-of-technical-conditions': [
    { id: 4299, name: 'Date', code: 'ATC_DATE', type: 'date', title: 'Дата' },
    {
      id: 4267,
      name: 'ExpertAssement',
      code: 'EXPERT_ASSESSMENT',
      type: 'string',
      title: 'Экспертная оценка состояния (категория)',
    },
    { id: 4276, name: 'TypeOfSurvey', code: 'TYPE_OF_SURVEY', type: 'string', title: 'Тип' },
    { id: 4260, name: 'AddExam', code: 'ADD_EXAM', type: 'string', title: 'Доп. обследование' },
    { id: 4261, name: 'Expert', code: 'EXPERT', type: 'string', title: 'Эксперт' },
    { id: 4262, name: 'Atc', code: 'ATC', type: 'string', title: 'Общая оценка' },
    // { id: 0, name: '', code: '', type: 'estimate', title: 'Показатели' },
  ],
};
