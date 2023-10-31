import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import MapLink from '../../components/MapLink';
import { AccidentsResponse } from './api';

const columnHelper = createColumnHelper<AccidentsResponse['data'][number]>();

const columns = [
  columnHelper.accessor((row) => ({ id: row.id, hasGeometry: row.hasGeometry }), {
    id: 'hasGeometry',
    meta: {
      title: 'На карте',
      headerClassName: 'text-center',
      className: 'text-center',
      settingsColumn: true,
    },
    size: 48,
    minSize: 48,
    enableHiding: false,
    enableResizing: false,
    cell: ({ getValue }) => {
      const { id, hasGeometry } = getValue();
      return <MapLink id={id} hasGeometry={hasGeometry} />;
    },
  }),
  columnHelper.accessor((row) => ({ id: row.id, address: row.address }), {
    id: 'address',
    meta: {
      title: 'Адрес ДТП',
    },
    header: 'Адрес ДТП',
    minSize: 480,
    enableHiding: false,
    cell: ({ getValue }) => {
      const { id, address } = getValue();
      return (
        <>
          <Link to={`/traffic-accidents/${id}`}>{address}</Link>
          {/* <br />
          <small className="text-caption">{info}</small> */}
        </>
      );
    },
  }),
  columnHelper.accessor('date', {
    id: 'date',
    meta: {
      title: 'Дата и время',
    },
    header: 'Дата и время',
    size: 192,
    minSize: 152,
  }),
  columnHelper.accessor((row) => row.type.value, {
    id: 'type',
    meta: {
      title: 'Вид ДТП',
    },
    header: 'Вид ДТП',
    size: 256,
    minSize: 256,
  }),
  columnHelper.group({
    id: 'wounded_dead',
    header: 'Количество пострадавших',
    columns: [
      columnHelper.accessor('wounded', {
        meta: {
          title: 'Ранено',
        },
        header: 'Ранено',
        size: 140,
        minSize: 140,
      }),
      columnHelper.accessor('dead', {
        meta: {
          title: 'Погибло',
        },
        header: 'Погибло',
        size: 140,
        minSize: 140,
      }),
    ],
  }),
  columnHelper.accessor('peopleAmount', {
    meta: {
      title: 'Количество участников',
    },
    header: 'Количество участников',
    size: 220,
    minSize: 220,
  }),
  columnHelper.accessor('tsAmount', {
    meta: {
      title: 'Количество ТС',
    },
    header: 'Количество ТС',
    size: 136,
    minSize: 136,
  }),
  columnHelper.accessor('sourceSystem', {
    meta: {
      title: 'Система источник',
    },
    header: 'Система источник',
    size: 240,
    minSize: 240,
  }),
  columnHelper.accessor('reason', {
    meta: {
      title: 'Причины ДТП',
    },
    header: 'Причины ДТП',
    size: 480,
    minSize: 240,
  }),
];

export default columns;
