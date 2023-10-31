import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import MapLink from '../../components/MapLink';

import SkdfIcon from '../../components/SkdfIcon';

import { formatNumber, roadValue2Icon } from '../../utils';
import { RoadsResponse } from './api';

const columnHelper = createColumnHelper<RoadsResponse['data'][number]>();
const columns = [
  columnHelper.accessor((row) => ({ id: row.id, hasGeometry: row.hasGeometry }), {
    id: 'hasGeometry',
    meta: {
      title: 'На карте',
      headerClassName: 'text-start',
      // className: 'text-end',
      settingsColumn: true,
    },
    size: 41,
    minSize: 41,
    enableHiding: false,
    enableResizing: false,
    cell: ({ getValue }) => {
      const { id, hasGeometry } = getValue();

      return <MapLink id={id} hasGeometry={hasGeometry} />;
    },
  }),
  columnHelper.accessor((row) => ({ id: row.id, name: row.name, info: row.info, level: row.level }), {
    id: 'name',
    meta: {
      title: 'Наименование',
    },
    header: 'Наименование',
    minSize: 480,
    enableHiding: false,
    cell: ({ getValue }) => {
      const { id, name, info, level } = getValue();
      const to = level > 1 ? `/roadsOnBalance/${id}` : `/roads/${id}`;
      return (
        <>
          <Link to={to}>{name}</Link>
          <br />
          <small className="text-caption">{info}</small>
        </>
      );
    },
  }),
  columnHelper.accessor((row) => ({ roadValueRc: row.roadValueRc, value: row.value }), {
    id: 'value',
    meta: {
      title: 'Значение',
      headerClassName: 'text-center',
      className: 'text-center',
    },
    header: 'Значение',
    enableResizing: false,
    size: 136,
    minSize: 136,
    cell: ({ getValue }) => (
      <SkdfIcon name={roadValue2Icon[getValue().roadValueRc]} title={getValue().value} className="text-caption" />
    ),
  }),
  columnHelper.accessor('uniqueId', {
    id: 'uniqueId',
    meta: {
      title: 'Идентификатор',
    },
    header: 'Идентификатор',
    size: 192,
    minSize: 192,
    cell: ({ renderValue }) => renderValue(),
  }),
  columnHelper.accessor('isChecked', {
    id: 'isChecked',
    meta: {
      title: 'Статус',
      headerClassName: 'text-center',
      className: 'text-center',
      private: true,
    },
    header: 'Статус',
    enableResizing: false,
    size: 128,
    minSize: 128,
    cell: ({ renderValue }) => (
      <SkdfIcon name={renderValue() ? 'check' : 'cross'} className={renderValue() ? 'text-success' : 'text-danger'} />
    ),
  }),
  columnHelper.accessor('length', {
    id: 'length',
    meta: {
      title: 'Протяженность, км',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Протяженность, км',
    size: 228,
    minSize: 228,
    cell: ({ getValue }) => getValue() && formatNumber(getValue()),
  }),
  columnHelper.accessor('numberOfLanes', {
    id: 'numberOfLanes',
    meta: {
      title: 'Число полос',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Число полос',
    size: 144,
    minSize: 144,
    cell: ({ renderValue }) => renderValue(),
  }),
  columnHelper.accessor('square', {
    id: 'square',
    meta: {
      title: 'Площадь, м²',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Площадь, м2',
    size: 152,
    minSize: 152,
    cell: ({ renderValue }) => {
      const value = renderValue();
      return value && formatNumber(value);
    },
  }),
  columnHelper.accessor('normativeState', {
    id: 'normativeState',
    meta: {
      title: 'Нормативное состояние, %',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Нормативное состояние, %',
    size: 272,
    minSize: 272,
    cell: ({ renderValue }) => {
      const value = renderValue();
      return value && formatNumber(value);
    },
  }),
  columnHelper.group({
    id: 'dangerousPart',
    header: 'Аварийно-опасные участки',
    // minSize: 382,
    columns: [
      columnHelper.accessor('dangerousPartCount', {
        id: 'dangerousPartCount',
        meta: {
          title: 'Аварийно-опасные участки (Количество)',
          headerClassName: 'text-end pe-4',
          className: 'text-end pe-4',
        },
        header: 'Количество',
        size: 124,
        minSize: 124,
        cell: ({ renderValue }) => {
          const value = renderValue();
          return value && formatNumber(value);
        },
      }),
      columnHelper.accessor('dangerousPartLength', {
        id: 'dangerousPartLength',
        meta: {
          title: 'Аварийно-опасные участки (Протяженность, км)',
          headerClassName: 'text-end pe-4 text-nowrap',
          className: 'text-end pe-4',
        },
        header: 'Протяжённость, км',
        size: 185,
        minSize: 185,
        cell: ({ renderValue }) => {
          const value = renderValue();
          return value && formatNumber(value);
        },
      }),
    ],
  }),
  columnHelper.group({
    id: 'overloadPart',
    header: 'Участки перегрузки',
    // minSize: 382,
    columns: [
      columnHelper.accessor('overloadPartCount', {
        id: 'overloadPartCount',
        meta: {
          title: 'Участки перегрузки (Количество)',
          headerClassName: 'text-end pe-4',
          className: 'text-end pe-4',
        },
        header: 'Количество',
        size: 124,
        minSize: 124,
        cell: ({ renderValue }) => {
          const value = renderValue();
          return value && formatNumber(value);
        },
      }),
      columnHelper.accessor('overloadPartLength', {
        id: 'overloadPartLength',
        meta: {
          title: 'Участки перегрузки (Протяженность, км)',
          headerClassName: 'text-end pe-4 text-nowrap',
          className: 'text-end pe-4',
        },
        header: 'Протяжённость, км',
        size: 185,
        minSize: 185,
        cell: ({ renderValue }) => {
          const value = renderValue();
          return value && formatNumber(value);
        },
      }),
    ],
  }),
  columnHelper.group({
    id: 'roadPart',
    header: 'Участки проведения работ',
    // minSize: 382,
    columns: [
      columnHelper.accessor('roadPartCount', {
        id: 'roadPartCount',
        meta: {
          title: 'Участки проведения работ (Количество)',
          headerClassName: 'text-end pe-4',
          className: 'text-end pe-4',
        },
        header: 'Количество',
        size: 124,
        minSize: 124,
        cell: ({ renderValue }) => {
          const value = renderValue();
          return value && formatNumber(value);
        },
      }),
      columnHelper.accessor('roadPartLength', {
        id: 'roadPartLength',
        meta: {
          title: 'Участки проведения работ (Протяженность, км)',
          headerClassName: 'text-end pe-4 text-nowrap',
          className: 'text-end pe-4',
        },
        header: 'Протяжённость, км',
        size: 185,
        minSize: 185,
        cell: ({ renderValue }) => {
          const value = renderValue();
          return value && formatNumber(value);
        },
      }),
    ],
  }),
  columnHelper.accessor('cost', {
    id: 'cost',
    meta: {
      title: 'Стоимость работ, тыс. ₽',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Стоимость работ, тыс. ₽',
    size: 256,
    minSize: 256,
    cell: ({ renderValue }) => {
      const value = renderValue();
      return value && formatNumber(value);
    },
  }),
  columnHelper.accessor('coatingTypes', {
    id: 'coatingTypes',
    meta: {
      title: 'Виды покрытия',
    },
    header: 'Виды покрытия',
    size: 256,
    minSize: 256,
    cell: ({ row, getValue }) =>
      getValue()?.map((el: { code: number; value: string }) => (
        <span key={`${row.id}_${el.value}`}>
          {el.value}
          <br />
        </span>
      )),
  }),
  columnHelper.accessor('categories', {
    id: 'categories',
    meta: {
      title: 'Категория',
    },
    header: 'Категория',
    size: 256,
    minSize: 256,
    cell: ({ row, getValue }) =>
      getValue()?.map((el: { code: number; value: string }) => (
        <span key={`${row.id}_${el.value}`}>
          {el.value}
          <br />
        </span>
      )),
  }),
  columnHelper.accessor('classes', {
    id: 'classes',
    meta: {
      title: 'Класс',
    },
    header: 'Класс',
    size: 256,
    minSize: 256,
    cell: ({ row, getValue }) =>
      getValue()?.map((el: { code: number; value: string }) => (
        <span key={`${row.id}_${el.value}`}>
          {el.value}
          <br />
        </span>
      )),
  }),
];

export default columns;
