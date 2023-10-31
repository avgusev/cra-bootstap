import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import MapLink from '../../components/MapLink';
import SkdfIcon from '../../components/SkdfIcon';
import { formatNumber } from '../../utils';
import { BridgesResponse } from './api';

const columnHelper = createColumnHelper<BridgesResponse['data'][number]>();
const columns = [
  columnHelper.accessor((row) => ({ id: row.id, hasGeometry: row.hasGeometry }), {
    id: 'hasGeometry',
    meta: {
      title: 'На карте',
      headerClassName: 'text-start',
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
  columnHelper.accessor(
    (row) => ({
      id: row.id,
      name: row.name,
      valueOfRoad: row.valueOfRoad,
      roadName: row.roadName,
      location: row.location,
    }),
    {
      id: 'name',
      meta: {
        title: 'Наименование',
      },
      header: 'Наименование',
      minSize: 480,
      enableHiding: false,
      cell: ({ getValue }) => {
        const { id, name, valueOfRoad, roadName, location } = getValue();
        return (
          <>
            <Link to={`/bridges/${id}`}>{name}</Link>
            <br />
            <small className="text-caption">
              {valueOfRoad ? `${valueOfRoad}, ${roadName}` : roadName}
              <br />
              {location}
            </small>
          </>
        );
      },
    }
  ),
  columnHelper.accessor('isChecked', {
    id: 'isChecked',
    meta: {
      title: 'Проверено',
      headerClassName: 'text-center',
      className: 'text-center',
    },
    header: 'Проверено',
    enableResizing: false,
    size: 140,
    minSize: 140,
    cell: ({ renderValue }) => (
      <SkdfIcon name={renderValue() ? 'check' : 'cross'} className={renderValue() ? 'text-success' : 'text-danger'} />
    ),
  }),
  columnHelper.accessor('technicalCondition', {
    id: 'technicalCondition',
    meta: {
      title: 'Техническое состояние',
    },
    header: 'Техническое состояние',
    size: 228,
    minSize: 228,
    cell: ({ getValue }) => getValue()?.value || '',
  }),
  columnHelper.accessor((row) => ({ type: row.type, bridgeType: row.bridgeType }), {
    id: 'type',
    meta: {
      title: 'Вид',
    },
    header: 'Вид',
    size: 248,
    minSize: 248,
    cell: ({ getValue }) => `${getValue().type.value} ${getValue().bridgeType ? `(${getValue().bridgeType})` : ''}`,
  }),
  columnHelper.accessor('length', {
    id: 'length',
    meta: {
      title: 'Протяженность, м',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    size: 210,
    minSize: 210,
    header: 'Протяженность, м',
    cell: ({ getValue }) => getValue() && formatNumber(getValue()),
  }),
  columnHelper.accessor('numberOfLanes', {
    id: 'numberOfLanes',
    meta: {
      // title: 'Число полос движения',
      title: 'Число полос',
    },
    // header: 'Число полос движения',
    header: 'Число полос',
    size: 144,
    minSize: 144,
    cell: ({ getValue }) => getValue() || '',
  }),
  columnHelper.accessor('clothing', {
    id: 'clothing',
    meta: {
      title: 'Вид покрытия',
    },
    header: 'Вид покрытия',
    size: 200,
    minSize: 200,
    cell: ({ getValue }) => getValue()?.value || '',
  }),
  columnHelper.accessor((row) => ({ roadCategory: row.roadCategory, roadCategorySP: row.roadCategorySP }), {
    id: 'roadCategory',
    meta: {
      title: 'Категория',
    },
    header: 'Категория',
    size: 256,
    minSize: 256,
    cell: ({ getValue }) => {
      const { roadCategory, roadCategorySP } = getValue();
      const res: string[] = [];
      const rcValues = roadCategory.map((c) => c.value);
      const rcSPValues = roadCategorySP.map((c) => c.value);
      for (let i = 0; i < rcValues.length || i < rcSPValues.length; i++) {
        res[i] = [rcValues[i], rcSPValues[i]].join(' ');
      }

      return `${res.join(', ')}`;
    },
  }),
  columnHelper.accessor('obstacle', {
    id: 'obstacle',
    meta: {
      title: 'Препятствие',
    },
    header: 'Препятствие',
    cell: ({ getValue }) => getValue()?.value || '',
  }),
  columnHelper.accessor('detour', {
    id: 'detour',
    meta: {
      title: 'Наличие объезда',
    },
    header: 'Наличие объезда',
    size: 180,
    minSize: 180,
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('balanceCost', {
    id: 'balanceCost',
    meta: {
      title: 'Балансовая стоимость, тыс. руб.',
      headerClassName: 'text-end pe-4',
      className: 'text-end pe-4',
    },
    header: 'Балансовая стоимость, тыс. руб.',
    size: 300,
    minSize: 300,
    cell: ({ getValue }) => getValue() && formatNumber(getValue()),
  }),
];

export default columns;
