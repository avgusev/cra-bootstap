import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { newsletterStoreInstance } from './store';

function NewsletterPage() {
  const { mail, setTo, setSubject, setFullName, sendNotification, setUpdateFeatures, clearMail } =
    newsletterStoreInstance;

  return (
    <div className="m-4 w-50">
      <h1>Рассылка на электронную почту</h1>
      <Form>
        {/* <div className="mb-3">
          <label htmlFor="select-component" className="form-label">
            Получатель
          </label>
          <Select
            inputId="select-component"
            placeholder="Выберите..."
            options={options}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </div> */}
        <Form.Group className="mb-3" controlId="to">
          <Form.Label>E-mail получателя</Form.Label>
          <Form.Control
            size="sm"
            className="mb-3"
            type="text"
            value={mail.To}
            placeholder="E-mail получателя"
            onChange={(e) => setTo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fio">
          <Form.Label>ФИО получателя</Form.Label>
          <Form.Control
            size="sm"
            className="mb-3"
            type="text"
            value={mail.Model.To.FullName}
            placeholder="ФИО"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        {/* <div className="d-flex gap-3 mb-3">
          <Form.Check id={`all`} label={`Все пользователи`} />
          <Form.Check id={`owner`} label={`Владельцы дорог`} />
          <Form.Check id={`company`} label={`Строительные организации`} />
        </div> */}

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Тема письма</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Тема письма"
            value={mail.Subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="updateFeatures">
          <Form.Label>В новом обновлении мы добавили:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            // placeholder=""
            value={mail.Model.UpdateFeatures.join('\n')}
            onChange={(e) => setUpdateFeatures(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button
            className="me-3"
            onClick={() => {
              sendNotification().then(() => {
                toast.success('Отправлено успешно');
              });
            }}
          >
            Отправить
          </Button>
          <Button variant="stroke" onClick={() => clearMail()}>
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default observer(NewsletterPage);
