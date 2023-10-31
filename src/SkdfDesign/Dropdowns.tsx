import { Dropdown } from 'react-bootstrap';
import SkdfIcon from '../components/SkdfIcon';

function Dropdowns() {
  const columnsMenu = (
    <Dropdown.Menu className="dropdown-limited-height">
      <Dropdown.Item>Протяжённость, км</Dropdown.Item>
      <Dropdown.Item as="button">Площадь покрытия, м²</Dropdown.Item>
      <Dropdown.Item as="button">Нормативное состояние, %</Dropdown.Item>
      <Dropdown.Item as="button">Аварийно-опасные участки, шт</Dropdown.Item>
      <Dropdown.Item as="button">Аварийно-опасные участки, км</Dropdown.Item>
      <Dropdown.Item as="button">Участки проведения работ, шт</Dropdown.Item>
      <Dropdown.Item as="button">Участки проведения работ, км</Dropdown.Item>
      <Dropdown.Item as="button">Участки перегрузки, шт</Dropdown.Item>
      <Dropdown.Item as="button">Участки перегрузки, шт</Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <>
      <h1>Dropdowns</h1>
      <Dropdown drop="end">
        <Dropdown.Toggle variant="primary">First example</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button">
            <SkdfIcon name="settings" />
            Настроить
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <SkdfIcon name="eye_closed" />
            Скрыть показатель
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <Dropdown drop="end">
        <Dropdown.Toggle variant="primary">Second example</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button">
            <SkdfIcon name="fit" />
            Вписать все столбцы в экран
          </Dropdown.Item>
          <Dropdown drop="end">
            <Dropdown.Toggle as="button" bsPrefix="dropdown-item">
              <SkdfIcon name="settings" />
              Управление столбцами
              <SkdfIcon name="arrow_right" className="dropdown-icon-right" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button">
                <SkdfIcon name="lock" />
                Закрепить до текущего столбца
              </Dropdown.Item>
              <Dropdown drop="end" align="end">
                <Dropdown.Toggle as="button" bsPrefix="dropdown-item">
                  <SkdfIcon name="arrow_left" />
                  Вставить столбец слева
                  <SkdfIcon name="arrow_right" className="dropdown-icon-right" />
                </Dropdown.Toggle>
                {columnsMenu}
              </Dropdown>
              <Dropdown drop="end" align="end">
                <Dropdown.Toggle as="button" bsPrefix="dropdown-item">
                  <SkdfIcon name="arrow_left" />
                  Вставить столбец справа
                  <SkdfIcon name="arrow_right" className="dropdown-icon-right" />
                </Dropdown.Toggle>
                {columnsMenu}
              </Dropdown>
              <Dropdown.Item as="button">
                <SkdfIcon name="eye_closed" />
                Скрыть столбец
              </Dropdown.Item>
              <hr className="dropdown-divider mx-3" />
              <Dropdown.Item as="button">
                <SkdfIcon name="sort_desc" />
                Сортировать по убыванию
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <SkdfIcon name="sort_asc" />
                Сортировать по возрастанию
              </Dropdown.Item>
              <hr className="dropdown-divider mx-3" />
              <Dropdown.Item as="button">
                <SkdfIcon name="filter" />
                Фильтровать
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <Dropdown drop="end">
        <Dropdown.Toggle variant="primary">Third example</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button">
            <SkdfIcon name="corner" />
            Выпрямить угол
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <SkdfIcon name="corner_round" />
            Скруглить угол
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <SkdfIcon name="round_all" />
            Скруглить все углы
          </Dropdown.Item>
          <hr className="dropdown-divider mx-3" />
          <Dropdown.Item as="button">
            <SkdfIcon name="cut" />
            Разрезать при сохранении
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <SkdfIcon name="flag" />
            Установить начальную
            <br />
            точку для операции
          </Dropdown.Item>
          <hr className="dropdown-divider mx-3" />
          <Dropdown.Item as="button">
            <SkdfIcon name="trash" />
            Удалить точку
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Dropdowns;
