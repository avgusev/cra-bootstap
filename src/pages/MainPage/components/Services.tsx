import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classes from '../MainPage.module.scss';

import { ReactComponent as IconFedProject } from '../assets/partners/fedProject.svg';
import { ReactComponent as IconNacProject } from '../assets/partners/nacProject.svg';
import { ReactComponent as IconMinTrans } from '../assets/partners/mintransrf.svg';
import rosdornii from '../assets/partners/rosdornii.png';
import { ReactComponent as IconList } from '../assets/list.svg';
import { ReactComponent as IconMap } from '../assets/map.svg';
import { ReactComponent as IconAnalytics } from '../assets/analytics.svg';

import classNames from 'classnames';
// import SkdfIcon from '../../../components/SkdfIcon';

function ServicesCard({ children }: { children?: ReactNode }) {
  return (
    <div className="col-lg-4 col-sm-12">
      <div className={classNames('gb-white h-100', classes.cardServices)}>
        <div className="p-4 p-xl-2r d-grid gap-3">{children}</div>
      </div>
    </div>
  );
}

export function ServicesInfo() {
  return (
    <div className="row">
      <div className="col-lg-3 col-sm-12 m-auto" style={{ padding: '1.25rem' }}>
        <div className="d-flex justify-content-center gap-5">
          <a href="https://mintrans.gov.ru/" className="text-decoration-none" target={'_blank'} rel="noreferrer">
            <IconMinTrans width={75} height={80} />
          </a>
          <a href="https://www.rosdornii.ru/" className="text-decoration-none" target={'_blank'} rel="noreferrer">
            <img src={rosdornii} alt="rosdornii" width={75} height={80} />
          </a>
        </div>
      </div>
      <div className="col-lg-6" style={{ padding: '1.25rem' }}>
        <span>
          Согласно принятому{' '}
          <a
            href="http://actual.pravo.gov.ru/text.html#pnum=0001202203060006"
            className="text-decoration-none fw-normal"
            target={'_blank'}
            rel="noreferrer"
          >
            Федеральному закону № 39-ФЗ от 6 марта 2022 года
          </a>
          , СКДФ является федеральной государственной информационной системой (ФГИС), которая обеспечивает контроль
          дорожных фондов, что необходимо для безусловного выполнения целей и задач, поставленных федеральным проектом
          «Общесистемные меры развития дорожного хозяйства» национального проекта «Безопасные качественные дороги»
        </span>
      </div>
      <div className="col-lg-3 col-sm-12 m-auto" style={{ padding: '1.25rem' }}>
        <div className="d-flex justify-content-center gap-3">
          <IconFedProject name="nacProject" width={120} height={89} />
          <a href="https://bkdrf.ru/" className="text-decoration-none" target={'_blank'} rel="noreferrer">
            <IconNacProject name="fedProject" width={120} height={89} />
          </a>
        </div>
      </div>
    </div>
  );
}

function Anchor({ id = '', title = '' }) {
  return (
    <div>
      <div className={classes.anchor} id={id} />
      <h1>{title}</h1>
    </div>
  );
}

function ServicesBlock() {
  return (
    <div className="d-grid gap-xl-5 gap-3">
      <Anchor id="services" title="Сервисы" />

      <div className="row g-3 g-lg-4">
        <ServicesCard>
          <IconList />
          <h2 className="mb-0">Реестры</h2>
          <ul className="d-grid gap-2 text-primary" style={{ paddingLeft: '1.125rem' }}>
            <li>
              <Link to="/roads" className="text-decoration-none fw-normal">
                Автомобильные дороги
              </Link>
            </li>
            <li>
              <Link to="/traffic-accidents" className="text-decoration-none fw-normal">
                Дорожно-транспортные происшествия
              </Link>
            </li>
          </ul>
        </ServicesCard>
        <ServicesCard>
          <IconMap />
          <h2 className="mb-0">Картография</h2>
          <ul className="d-grid gap-2 text-primary" style={{ paddingLeft: '1.125rem' }}>
            <li>
              <Link to="/map" className="text-decoration-none fw-normal">
                Автомобильные дороги
              </Link>
            </li>
          </ul>
        </ServicesCard>
        <ServicesCard>
          <IconAnalytics />
          <h2 className="mb-0">Аналитика</h2>
          <ul className="d-grid gap-2 text-primary" style={{ paddingLeft: '1.125rem' }}>
            <li>
              <Link to="/indicators/Расходы" className="text-decoration-none fw-normal">
                Консолидированный бюджет
              </Link>
            </li>
            <li>
              <Link to="/indicators/Все%20дороги" className="text-decoration-none fw-normal">
                Дорожная сеть
              </Link>
            </li>
          </ul>
        </ServicesCard>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div style={{ backgroundColor: '#FCFCFC' }} className="pt-xl-6r pt-5 pb-xl-5 pb-3">
      <div className="container">
        <div className="d-grid gap-4">
          <ServicesBlock />
          <ServicesInfo />
          {/* <CapabilitiesBlock /> */}
        </div>
      </div>
    </div>
  );
}

export default Services;
