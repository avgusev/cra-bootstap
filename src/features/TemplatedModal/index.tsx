import { observer } from 'mobx-react-lite';

import Modal from '../../components/Modal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import { modalStoreInstance } from './store';

const TemplatedModal = () => {
  const { template, fields, isOpened, closeModal, withFooter } = modalStoreInstance;

  return withFooter ? (
    <Modal
      show={isOpened}
      onHide={closeModal}
      size="lg"
      header={<Header template={template} fields={fields} />}
      body={<Body template={template} fields={fields} />}
      footer={<Footer template={template} fields={fields} />}
    />
  ) : (
    <Modal
      show={isOpened}
      onHide={closeModal}
      size="lg"
      header={<Header template={template} fields={fields} />}
      body={<Body template={template} fields={fields} />}
    />
  );
};

export default observer(TemplatedModal);
