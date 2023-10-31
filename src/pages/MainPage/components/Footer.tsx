import { ReactComponent as IconMinTrans } from '../assets/partners/mintransrf.svg';
import { ReactComponent as IconStroigov } from '../assets/partners/stroigov.svg';
import { ReactComponent as IconMinstroyrf } from '../assets/partners/minstroyrf.svg';
import rosdornii from '../assets/partners/rosdornii.png';
import rosavtodor from '../assets/partners/rosavtodor.png';

import FooterInfo from './FooterInfo';

const partners = [
  { name: 'МИНТРАНС', icon: <IconMinTrans />, link: 'https://mintrans.gov.ru/' },
  {
    name: 'РОСАВТОДОР',
    icon: <img src={rosavtodor} alt="rosavtodor" height={64} />,
    link: 'https://rosavtodor.gov.ru/',
  },
  {
    name: 'РОСДОРНИИ',
    icon: <img src={rosdornii} alt="rosdornii" height={64} />,
    link: 'https://www.rosdornii.ru/',
  },

  {
    name: 'МИНСТРОЙ',
    icon: <IconMinstroyrf />,
    link: 'https://minstroyrf.gov.ru/',
  },
  {
    name: 'СТРОЙКОМПЛЕКС',
    icon: <IconStroigov width={38.4} />,
    link: 'https://stroi.gov.ru/',
  },
];

function Footer() {
  return (
    <div className="pt-5 pb-3" style={{ backgroundColor: '#F7F7F8' }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-sm-12">
            <FooterInfo />
          </div>
          <div className="col-xl-7 col-lg-7 col-sm-12">
            <div className="container-fluid p-0">
              <div className="row align-items-center">
                {partners.map((partner, index) => (
                  <div key={index} className="col-lg-4 col-sm-12 py-2">
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noreferrer"
                      className="d-flex gap-2.5 align-items-center flex-shrink-0 text-decoration-none"
                    >
                      <span className="text-center" style={{ minWidth: '4rem' }}>
                        {partner.icon}
                      </span>
                      {partner.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="d-flex gap-3 flex-wrap">
          <span className="me-auto">© Система контроля дорожных фондов, 2018 — 2022</span>
          <a href="/" className="text-decoration-none">
            Политика конфиденциальности
          </a>
          <a href="/" className="text-decoration-none">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
