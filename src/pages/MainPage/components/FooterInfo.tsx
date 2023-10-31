import { ReactComponent as IconTelegram } from '../assets/telegram.svg';

function FooterInfo() {
  return (
    <div className="d-grid gap-2">
      <span className="text-caption">Техническая поддержка</span>
      <a className="lh-base text-decoration-none" href="tel:8 800 444-66-22">
        8 800 444-66-22
      </a>
      <a className="lh-base text-decoration-none" href="mailto:skdf@rosdornii.ru">
        skdf@rosdornii.ru
      </a>
      <div className="pt-3 pb-2 mb-2r">
        <a href="https://t.me/SKDFRF" target="_blank" rel="noreferrer">
          <IconTelegram />
        </a>
      </div>
    </div>
  );
}

export default FooterInfo;
