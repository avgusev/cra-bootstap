import SkdfIcon from '../../components/SkdfIcon';

function TBody() {
  return (
    <>
      <tr>
        <td className="text-primary">
          <SkdfIcon name="map" />
        </td>
        <td>0+000</td>
        <td>2+900</td>
        <td className="text-end">2,735</td>
        <td className="text-end">87,70</td>
        <td className="text-end">0</td>
        <td className="text-end">0</td>
        <td>
          <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>
        </td>
      </tr>
      <tr>
        <td className="text-muted">
          <SkdfIcon name="map" />
        </td>
        <td>13+390</td>
        <td>149+000</td>
        <td className="text-end">139,260</td>
        <td className="text-end">2 818,83</td>
        <td className="text-end">348 941 095 984,200</td>
        <td className="text-end">348 941 095 984,200</td>
        <td>
          <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>
        </td>
      </tr>
      <tr>
        <td className="text-muted">
          <SkdfIcon name="map" />
        </td>
        <td>47+755</td>
        <td>48+844</td>
        <td className="text-end">1,000</td>
        <td className="text-end">1,00</td>
        <td className="text-end">0</td>
        <td className="text-end">0</td>
        <td>
          <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>
        </td>
      </tr>
      <tr>
        <td className="text-primary">
          <SkdfIcon name="map" />
        </td>
        <td>209+669</td>
        <td>684+000</td>
        <td className="text-end">477,060</td>
        <td className="text-end">13 477,78</td>
        <td className="text-end">0</td>
        <td className="text-end">0</td>
        <td>
          <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>
        </td>
      </tr>
    </>
  );
}

function TableMock({ repeat = 1, className = '' }) {
  return (
    <table className={className}>
      <thead>
        <tr>
          <th scope="col" className="text-primary">
            <SkdfIcon name="settings" />
          </th>
          <th scope="col">Начало участка</th>
          <th scope="col">Конец участка</th>
          <th scope="col" className="text-end">
            Протяженность, км
          </th>
          <th scope="col" className="text-end">
            Площадь, м²
          </th>
          <th scope="col" className="text-end">
            Балансовая стоимость, тыс. ₽
          </th>
          <th scope="col" className="text-end">
            Остаточная стоимость, тыс. ₽
          </th>
          <th scope="col">Владелец</th>
        </tr>
      </thead>
      <tbody>
        {new Array(repeat).fill(0).map((_, i) => (
          <TBody key={i} />
        ))}
      </tbody>
    </table>
  );
}

export default TableMock;
