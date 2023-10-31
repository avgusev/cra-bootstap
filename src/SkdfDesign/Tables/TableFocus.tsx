import classNames from 'classnames';
import SkdfIcon from '../../components/SkdfIcon';
// import { TableMock } from '../mock';

const columnAlign = ['', '', '', 'text-end', 'text-end', 'text-end', 'text-end', ''];
const columnFocus = ['', '', 'table-focus', '', 'table-focus', '', '', ''];
const columnDropDowns = ['', 'th-dropdown', 'th-dropdown', 'th-dropdown', '', '', '', ''];

const headerCells = [
  <SkdfIcon name="settings" className="text-primary" />,
  'Начало участка',
  'Конец участка',
  'Протяженность, км',
  'Площадь, м²',
  'Балансовая стоимость, тыс. ₽',
  'Остаточная стоимость, тыс. ₽',
  'Владелец',
];

const rows = [
  [
    <SkdfIcon name="map" className="text-primary" />,
    '0+000',
    '2+900',
    '2,735',
    '87,70',
    '0',
    '0',
    <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>,
  ],
  [
    <SkdfIcon name="map" className="text-muted" />,
    '13+390',
    '149+000',
    '139,260',
    '2 818,83',
    '348 941 095 984,200',
    '348 941 095 984,200',
    <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>,
  ],
  [
    <SkdfIcon name="map" className="text-muted" />,
    '47+755',
    '48+844',
    '1,000',
    '1,00',
    '0',
    '0',
    <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>,
  ],
  [
    <SkdfIcon name="map" className="text-primary" />,
    '209+669',
    '684+000',
    '477,060',
    '13 477,78',
    '0',
    '0',
    <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>,
  ],
];

function TableFocus() {
  return (
    <div className="table-responsive">
      <table className="table skdf table-sticky-header table-hover text-nowrap">
        <thead>
          <tr>
            {headerCells.map((cell, index) => (
              <th
                key={index}
                scope="col"
                className={classNames(columnAlign[index], columnFocus[index], columnDropDowns[index])}
                children={cell}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={classNames(columnAlign[index], columnFocus[index], {
                    'pe-4': !!columnDropDowns[index],
                  })}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableFocus;
