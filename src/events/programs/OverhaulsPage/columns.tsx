import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { organizationStoreInstance } from '../../../features/DetailedView/store';
import { formatNumber } from '../../../utils';

import { OverhaulsResponse } from './api';

const columnHelper = createColumnHelper<OverhaulsResponse['data'][number]>();

const columns = [
  columnHelper.accessor('program_id', {
    id: 'settings',
    meta: {
      title: 'Настройка',
      headerClassName: 'text-start',
      settingsColumn: true,
    },
    size: 41,
    minSize: 41,
    enableHiding: false,
    enableResizing: false,
    cell: () => {
      return <></>;
    },
  }),

  columnHelper.accessor(
    (row) => ({
      id: row.program_id,
      name: row.name,
      version: row.version,
    }),
    {
      id: 'name',
      meta: {
        title: 'Наименование',
        // settingsColumn: true,
      },
      header: 'Наименование',
      minSize: 480,
      enableHiding: false,
      cell: ({ getValue }) => {
        const { id, name, version } = getValue();

        return (
          <>
            <Link to={`/overhaul/${id}`}>{name}</Link>
            <br />
            <small className="text-caption">
              {version.name} от {format(new Date(version.date), 'dd.MM.yyyy')}
            </small>
          </>
        );
      },
    }
  ),

  columnHelper.accessor('program_id', {
    id: 'program_id',
    meta: {
      title: 'Номер СКДФ',
    },
    header: 'Номер СКДФ',
    size: 192,
    minSize: 152,
  }),

  columnHelper.accessor((row) => ({ region: row.region }), {
    id: 'region',
    meta: {
      title: 'Регион',
    },
    header: 'Регион',
    size: 192,
    minSize: 152,
    cell: ({ getValue }) => {
      const { region } = getValue();
      return <>{region.name}</>;
    },
  }),

  columnHelper.accessor((row) => ({ work_type: row.work_type }), {
    id: 'work_type',
    meta: {
      title: 'Вид работ',
    },
    header: 'Вид работ',
    size: 192,
    minSize: 152,
    cell: ({ getValue }) => {
      const { work_type } = getValue();
      return <>{work_type.name}</>;
    },
  }),
  columnHelper.accessor((row) => ({ object_work_type: row.object_work_type }), {
    id: 'object_work_type',
    meta: {
      title: 'Тип объекта работ',
    },
    header: 'Тип объекта работ',
    size: 192,
    minSize: 152,
    cell: ({ getValue }) => {
      const { object_work_type } = getValue();
      return <>{object_work_type.name}</>;
    },
  }),
  columnHelper.accessor((row) => ({ years: row.years }), {
    id: 'years',
    meta: {
      title: 'Сроки реализации',
    },
    header: 'Сроки реализации',
    size: 256,
    minSize: 256,
    cell: ({ getValue }) => {
      const { years } = getValue();
      return (
        <>
          {years[0]}-{years.at(-1)}
        </>
      );
    },
  }),
  columnHelper.accessor((row) => ({ organization: row.organization }), {
    id: 'organization',
    meta: {
      title: 'Организация',
    },
    header: 'Организация',
    size: 400,
    minSize: 150,
    cell: ({ getValue }) => {
      const { organization } = getValue();
      return (
        <Button
          variant="function"
          className="text-start inline-block"
          onClick={() => organizationStoreInstance.getOrganizationMiniPassport(organization.id)}
        >
          {organization.name}
        </Button>
      );
    },
  }),
  columnHelper.accessor((row) => ({ status: row.status }), {
    id: 'status',
    meta: {
      title: 'Статус утверждения',
    },
    header: 'Статус утверждения',
    size: 192,
    minSize: 152,
    cell: ({ getValue }) => {
      const { status } = getValue();
      return <>{status.name}</>;
    },
  }),
  columnHelper.accessor((row) => ({ status: row.status }), {
    id: 'status_date',
    meta: {
      title: 'Дата статуса',
    },
    header: 'Дата статуса',
    size: 192,
    minSize: 152,
    cell: ({ getValue }) => {
      const { status } = getValue();
      return <>{format(new Date(status.date), 'dd.MM.yyyy')}</>;
    },
  }),
  columnHelper.accessor('sum_cost', {
    id: 'sum_cost',
    meta: {
      title: 'Утвержденный объем финансирования, тыс. ₽',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Утвержденный объем финансирования, тыс. ₽',
    size: 410,
    minSize: 410,
    cell: ({ renderValue }) => {
      const value = renderValue();
      return value && formatNumber(value);
    },
  }),
];

export default columns;
