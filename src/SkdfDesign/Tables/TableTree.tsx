import SkdfIcon from '../../components/SkdfIcon';

const rowBorderNone = ['', '', 'border-0', '', 'border-0', 'border-0', 'border-0', ''];

const headerCells = [
  <SkdfIcon name="settings" className="text-primary w-100 justify-content-center" />,
  'Наименование',
  'Идентификатор',
  'Протяженность, км',
  'Площадь, м²',
];

const rowsTree = [
  [
    <div className="d-flex">
      <SkdfIcon name="map" className="text-primary  ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">ул Калинина</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '684+000',
    '477,060',
    '13 477,78',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="close" className="text-primary me-3" />
      <SkdfIcon name="map" className="text-primary ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">Р-120 Орел - Брянск - Смоленск - граница с Республикой Беларусь</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '2+900',
    '2,735',
    '87,70',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="open" className="text-muted me-3" />
      <div className="line line-start" style={{ left: '1.1875rem' }} />
      <SkdfIcon name="map" className="text-muted ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">А-240 Брянск - Новозыбков - граница с Республикой Беларусь</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '149+000',
    '139,260',
    '2 818,83',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="dot" className="text-muted me-3" />
      <div className="line line-end" style={{ left: '1.1875rem' }} />
      <SkdfIcon name="map" className="text-primary  ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">Клетня-Строительная Слобода</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '684+000',
    '477,060',
    '13 477,78',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="open" className="text-muted me-3" />
      <div className="line line-start" style={{ left: '1.1875rem' }} />
      <SkdfIcon name="map" className="text-primary  ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">М-3 "Украина" Москва - Калуга - Брянск - граница с Украиной</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '2+900',
    '2,735',
    '87,70',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="dot" className="text-muted me-3" />
      <div className="line" style={{ left: '1.1875rem' }} />
      <SkdfIcon name="open" className="text-muted me-3" />
      <div className="line line-start" style={{ left: 'calc( 1.1875rem + 2.5rem )' }} />
      <SkdfIcon name="map" className="text-muted ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">«Брянск-Смоленск»-Бетово»-Чернетово</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '149+000',
    '139,260',
    '2 818,83',
  ],
  [
    <div className="d-flex">
      <span className="pe-4 me-3" />
      <div className="line" style={{ left: '1.1875rem' }} />
      <SkdfIcon name="dot" className="text-muted me-3" />
      <div className="line line-end" style={{ left: 'calc( 1.1875rem + 2.5rem )' }} />
      <SkdfIcon name="map" className="text-primary  ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">«Локоть – Кретово» – Хотеево</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '684+000',
    '477,060',
    '13 477,78',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="dot" className="text-muted me-3" />
      <div className="line line-end" style={{ left: '1.1875rem' }} />
      <SkdfIcon name="map" className="text-primary  ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">Дружба – Неверь</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '684+000',
    '477,060',
    '13 477,78',
  ],
  [
    <div className="d-flex">
      <SkdfIcon name="map" className="text-primary  ms-auto" />
    </div>,
    <div>
      <a href="/roads/89879">пр-кт Московский</a>
      <br />
      <small className="text-caption">Брянская область</small>
    </div>,
    '684+000',
    '477,060',
    '13 477,78',
  ],
];

function TableTree() {
  return (
    <div className="table-responsive">
      <table className="table skdf table-sticky-header table-hover text-nowrap">
        <thead>
          <tr>
            {headerCells.map((cell, index) => (
              <th key={index} scope="col" children={cell} style={index === 0 ? { width: '2.5rem' } : {}} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsTree.map((row, indexRow) => (
            <tr key={indexRow}>
              {row.map((cell, index) => (
                <td key={index} className={rowBorderNone[indexRow]}>
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

export default TableTree;
