import { BlockMetadata } from '../../../features/DetailedView/types';

type Meta = Record<string, BlockMetadata[]>;

export const meta: Meta = {
  'backbone-network-works': [
    { id: 1972, name: 'Start', code: 'START', type: 'string', title: 'Начало участка' },
    { id: 1973, name: 'Finish', code: 'FINISH', type: 'string', title: 'Конец участка' },
    { id: 1851, name: 'Length', code: 'LENGTH', type: 'number', title: 'Протяженность, км' },
    { id: 2321, name: 'Square', code: 'SQUARE', type: 'number', title: 'Площадь покрытия проезжей части, кв.м' },
    { id: 0, name: 'TypeOfWorks', code: 'TYPE_OF_WORKS', type: 'string', title: 'Вид работ' },
    { id: 0, name: 'Deadline', code: 'DEADLINE', type: 'string', title: 'Срок проведения' },
    { id: 0, name: 'EventId', code: 'EVENT_ID', type: 'number', title: 'Мероприятие' },
    { id: 2127, name: 'WorkFinish', code: 'WORK_FINISH', type: 'date', title: 'Дата завершения работ' },
    { id: 0, name: 'EventName', code: 'EVENT_NAME', type: 'string', title: 'Наименование объекта' },
    { id: 0, name: 'EventStatus', code: 'EVENT_STATUS', type: 'string', title: 'Статус работ' },
    { id: 0, name: 'OrganizationName', code: 'ORG_NAME', type: 'string', title: 'Заказчик' },
    { id: 0, name: 'Contractors', code: 'CONTRACTORS', type: 'string', title: 'Подрядчики' },
  ],
};
