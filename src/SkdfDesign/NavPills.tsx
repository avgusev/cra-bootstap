import { Accordion } from 'react-bootstrap';
import classNames from 'classnames';

const links1 = [
  'Общая информация',
  'Владелец дороги',
  'Участки, входящие в опорную сеть',
  'Нормативно-правовые документы',
  'Дата ввода в эксплуатацию',
  'Платность',
];

const links2 = [
  'Категория',
  'Ширина проезжей части',
  'Ширина земляного полотна',
  'Число полос движения',
  'Вид покрытия',
  'Класс',
  'Нагрузка на ось',
  'Максимальная скорость',
  'Пропускная способность',
];

function NavBasic() {
  return (
    <ul className="nav nav-pills skdf flex-column gap-1">
      {links1.map((link, index) => (
        <li key={link} className="nav-item">
          <a className={classNames('nav-link', { active: index === 0 })} href="#/nav">
            {link}
            <span className="text-caption ms-2">{index === 0 ? 99 : index * 2}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function NavAccordion() {
  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="mt-4">
          <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
            Технические характеристики
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <ul className="nav nav-pills skdf flex-column gap-1">
            {links2.map((link, index) => (
              <li key={link} className="nav-item">
                <a className="nav-link" href="#/nav">
                  {link}
                  {index !== 0 ? <span className="text-caption ms-2">{index}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function NavPills() {
  return (
    <>
      <h1>NavPills</h1>
      <div style={{ width: '18.75rem' }}>
        <NavBasic />
        <NavAccordion />
      </div>
    </>
  );
}

export { NavBasic, NavAccordion };
export default NavPills;
