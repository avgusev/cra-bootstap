import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CloseButton from '../../components/CloseButton';
import SkdfIcon from '../../components/SkdfIcon';

export const logo = (
  <svg
    className="flex-shrink-0"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4014_176278)">
      <path
        d="M56.166 23.5957C48.2305 26.8921 41.9886 35.9137 40.4886 47.2486C40.4402 47.6534 40.6821 48.0004 41.0208 48.0004H47.3596C49.537 48.0004 51.4241 46.2076 51.9563 43.7209L56.166 23.5957Z"
        fill="#FF5100"
      />
      <path
        d="M16.9237 47.0744C16.7785 47.4792 17.0205 47.9997 17.4076 47.9997H30.5205C30.9076 47.9997 31.2463 47.7105 31.3431 47.2479C34.6818 33.8889 43.1979 23.248 56.214 20.0673C56.6011 19.9517 56.9398 19.6047 57.0366 19.142L57.7624 15.5565C41.1173 16.5397 24.4237 26.4287 16.9237 47.0744ZM60.4237 3.06504L61.1011 0H5.21402C2.74628 0 0.617244 2.02408 0.0365989 4.8578L-2.33437 16.3662C-2.47953 17.1758 -1.8505 17.8119 -1.22146 17.5228C15.3753 8.73247 36.5689 4.106 59.4076 4.04817C59.8914 4.04817 60.3269 3.64335 60.4237 3.06504Z"
        fill="#FF5100"
      />
      <path
        d="M-5.81854 32.9057L-7.89919 42.9105C-8.43144 45.455 -6.78628 47.9418 -4.60886 47.9418H5.2621C5.69759 47.9418 6.13307 47.6526 6.32662 47.1321C14.6492 26.8335 31.9234 13.3588 57.8589 11.9709C58.2944 11.9709 58.7299 11.5661 58.8266 11.0456L59.504 7.69141C31.9718 8.03839 11.6976 15.9612 -4.60886 30.766C-5.2379 31.2864 -5.67338 32.0382 -5.81854 32.9057Z"
        fill="#FF5100"
      />
    </g>
    <defs>
      <clipPath id="clip0_4014_176278">
        <path
          d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export const mockBody = (
  <div className="container-fluid px-0">
    <div className="row">
      <div className="col-lg-4">
        <div className="mt-3">
          <label className="form-label">ИНН/КПП</label>
          <input
            readOnly
            type="text"
            className="form-control-plaintext border-0 p-0"
            defaultValue="7717151380 / 770701001"
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mt-3">
          <label className="form-label">Телефон</label>
          <input readOnly type="text" className="form-control-plaintext border-0 p-0" defaultValue="+7 (8732) 226209" />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mt-3">
          <label className="form-label">Сайт</label>
          <input
            readOnly
            type="text"
            className="form-control-plaintext border-0 p-0"
            defaultValue="http://russianhighways.ru"
          />
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-lg-8">
        <div className="mt-3">
          <label className="form-label">Адрес</label>
          <input
            readOnly
            type="text"
            className="form-control-plaintext border-0 p-0"
            defaultValue="127006, г Москва, б-р Страстной, дом 9"
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mt-3">
          <label className="form-label">E-mail</label>
          <input
            readOnly
            type="text"
            className="form-control-plaintext border-0 p-0"
            defaultValue="zakupki@russianhighways.ru"
          />
        </div>
      </div>
    </div>
  </div>
);

function ModalOwner() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>Owner</h3>

      <Button variant="skdf-primary" onClick={show}>
        Owner
      </Button>

      <Modal centered scrollable show={isShow} onHide={close} contentClassName="skdf-shadow-down-16dp" size="lg">
        <Modal.Body className="px-5">
          <CloseButton absolute onClick={close} />
          <div className="mt-2 mb-3 d-flex gap-3">
            {logo}
            <section>
              <h3 className="mb-0">Государственная компания «Российские автомобильные дороги»</h3>
              <small className="text-caption">ГК Автодор</small>
            </section>
          </div>
          {mockBody}
        </Modal.Body>
        <Modal.Footer className="px-5">
          <Button variant="skdf-ghost" className="px-0 d-inline-flex gap-2" onClick={close}>
            <SkdfIcon name={'text_version'} />В карточку организации
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalOwner;
