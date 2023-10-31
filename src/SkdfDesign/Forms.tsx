import { useState } from 'react';
import classNames from 'classnames';

type InputFieldType = {
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  className?: string;
  readOnly?: boolean;
  label?: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  required?: boolean;
  reverse?: boolean;
};

function InputField({
  label = 'Label',
  className = 'form-control form-control-sm',
  placeholder = 'Placeholder',
  ...props
}: InputFieldType) {
  const idRandom = (Math.random() + 1).toString(36).substring(7);
  return (
    <div className="mb-3">
      <label htmlFor={idRandom} className="form-label">
        {label}
      </label>
      <input id={idRandom} className={className} placeholder={placeholder} autoComplete="off" {...props} />
      <div className="invalid-feedback">Data entered incorrectly</div>
    </div>
  );
}

function SkdfControls({
  label = 'Label',
  className = 'form-check-input',
  type = 'switch',
  reverse = false,
  ...props
}: InputFieldType) {
  const idRandom = (Math.random() + 1).toString(36).substring(7);
  if (type === 'switch') {
    return (
      // form-check-reverse text-start
      <div className={classNames('form-check', 'form-switch', { 'form-check-reverse': reverse })}>
        <input id={idRandom} className={className} type="checkbox" role="switch" {...props} />
        <label htmlFor={idRandom} className="form-check-label">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="form-check">
      <input id={idRandom} className={className} type={type} {...props} />{' '}
      <label htmlFor={idRandom} className="form-check-label">
        {label}
      </label>
    </div>
  );
}

function Forms() {
  const [wasValidated, setWasValidated] = useState(false);

  return (
    <div className="mx-auto w-75">
      <h2>SKDF Forms</h2>
      <form>
        <h3>Режим просмотра</h3>

        <div className="mb-3">
          <InputField
            readOnly
            className="form-control-plaintext border-0 p-0"
            defaultValue="Input text"
            label="Label"
          />
        </div>
      </form>

      <form>
        <h3>Режим редактирования</h3>

        <div className="row">
          <div className="col-lg-4 offset-4 d-none d-lg-block text-center">Пустое</div>
          <div className="col-lg-4 text-center d-none d-lg-block">Заполненное</div>
        </div>

        <div className="row">
          <div className="col-lg-4">По умолчанию</div>
          <div className="col-lg-4">
            <InputField placeholder="Placeholder" />
          </div>
          <div className="col-lg-4">
            <InputField defaultValue="Input text" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">Неактивное (readOnly)</div>
          <div className="col-lg-4">
            <InputField readOnly />
          </div>
          <div className="col-lg-4">
            <InputField readOnly defaultValue="Input text" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">Disabled</div>
          <div className="col-lg-4">
            <InputField disabled />
          </div>
          <div className="col-lg-4">
            <InputField disabled defaultValue="Input text" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">Disabled readOnly</div>
          <div className="col-lg-4">
            <InputField readOnly disabled />
          </div>
          <div className="col-lg-4">
            <InputField readOnly disabled defaultValue="Input text" />
          </div>
        </div>
      </form>

      <h3>Возникновение ошибок</h3>
      <form className={classNames('row', 'g-3', { 'was-validated': wasValidated })} noValidate>
        <div className="col-lg-6">
          <InputField required />
        </div>
        <div className="col-lg-6">
          <InputField required defaultValue="Input text" />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="button" onClick={() => setWasValidated(!wasValidated)}>
            Trigger validation
          </button>
        </div>
      </form>

      <form className={`row g-3`} noValidate>
        <div className="col-lg-4">
          <InputField className="form-control form-control-sm is-invalid" />
        </div>
        <div className="col-lg-4">
          <InputField className="form-control form-control-sm is-valid" />
        </div>
        <div className="col-lg-4">
          <InputField className="form-control form-control-sm is-valid" defaultValue="Input text" />
        </div>
      </form>

      <hr className="my-5" />

      <h3>Атрибут type</h3>

      <div className="row">
        <p className="col-lg-3">Пустое</p>
        <p className="col-lg-3">Заполненное</p>
        <p className="col-lg-3">Не активно</p>
        <p className="col-lg-3">Ошибка</p>
      </div>

      <div className="col-lg-12 h4">file</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="file" />
        </form>
        <form className="col-lg-3 offset-3">
          <InputField type="file" disabled />
        </form>
        <form className="col-lg-3">
          <InputField type="file" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">password</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="password" />
        </form>
        <form className="col-lg-3">
          <InputField type="password" defaultValue="Input text" />
        </form>
        <form className="col-lg-3">
          <InputField type="password" disabled />
        </form>
        <form className="col-lg-3">
          <InputField type="password" className="form-control form-control-sm is-invalid" defaultValue="Input text" />
        </form>
      </div>

      <div className="col-lg-12 h4">number</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="number" />
        </form>
        <form className="col-lg-3">
          <InputField type="number" defaultValue="12345" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="number" />
        </form>
        <form className="col-lg-3">
          <InputField type="number" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">search</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="search" className="form-control" />
        </form>
        <form className="col-lg-3">
          <InputField type="search" className="form-control" defaultValue="Input text" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="search" className="form-control" />
        </form>
        <form className="col-lg-3">
          <InputField type="search" className="form-control is-invalid" />
        </form>
      </div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="search" />
        </form>
        <form className="col-lg-3">
          <InputField type="search" defaultValue="Input text" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="search" />
        </form>
        <form className="col-lg-3">
          <InputField type="search" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <hr className="my-5" />

      <div className="col-lg-12 h4">checkbox</div>
      <div className="row">
        <form className="col-lg-3">
          <SkdfControls type="checkbox" label="Средства фонда национального благосостояния" />
        </form>
        <form className="col-lg-3">
          <SkdfControls type="checkbox" defaultChecked />
        </form>
        <form className="col-lg-3">
          <SkdfControls disabled type="checkbox" /> <SkdfControls disabled type="checkbox" defaultChecked />
        </form>
        <form className="col-lg-3">
          <SkdfControls type="checkbox" className="form-check-input is-invalid" />{' '}
          <SkdfControls type="checkbox" defaultChecked className="form-check-input is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">radio</div>
      <div className="row">
        <form className="col-lg-3">
          <SkdfControls type="radio" />
        </form>
        <form className="col-lg-3">
          <SkdfControls type="radio" defaultChecked />
        </form>
        <form className="col-lg-3">
          <SkdfControls disabled type="radio" /> <SkdfControls disabled type="radio" defaultChecked />
        </form>
        <form className="col-lg-3">
          <SkdfControls type="radio" className="form-check-input is-invalid" />{' '}
          <SkdfControls type="radio" defaultChecked className="form-check-input is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">switch</div>
      <div className="row">
        <form className="col-lg-3">
          <SkdfControls label="Средства фонда национального благосостояния" />
        </form>
        <form className="col-lg-3">
          <SkdfControls defaultChecked />
        </form>
        <form className="col-lg-3">
          <SkdfControls disabled />
          <SkdfControls defaultChecked disabled />
        </form>
        <form className="col-lg-3">
          <SkdfControls className="form-check-input is-invalid" />
          <SkdfControls defaultChecked className="form-check-input is-invalid" />
        </form>
      </div>
      <div className="col-lg-12 h4">switch reverse</div>
      <div className="row">
        <form className="col-lg-3">
          <SkdfControls label="Средства фонда национального благосостояния" reverse />
        </form>
        <form className="col-lg-3">
          <SkdfControls defaultChecked reverse />
        </form>
        <form className="col-lg-3">
          <SkdfControls disabled reverse />
          <SkdfControls defaultChecked disabled reverse />
        </form>
        <form className="col-lg-3">
          <SkdfControls className="form-check-input is-invalid" reverse />
          <SkdfControls defaultChecked className="form-check-input is-invalid" reverse />
        </form>
      </div>

      <div className="col-lg-12 h4">range</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="range" className="form-range" />
        </form>
        <form className="col-lg-3 offset-3">
          <InputField disabled type="range" className="form-range" />
        </form>
      </div>

      <hr className="my-5" />

      <div className="col-lg-12 h4">date</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="date" />
        </form>
        <form className="col-lg-3">
          <InputField type="date" defaultValue="2022-12-05T14:45" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="date" />
        </form>
        <form className="col-lg-3">
          <InputField type="date" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">datetime-local</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="datetime-local" />
        </form>
        <form className="col-lg-3">
          <InputField type="datetime-local" defaultValue="2022-12-05T14:45" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="datetime-local" />
        </form>
        <form className="col-lg-3">
          <InputField type="datetime-local" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">month</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="month" />
        </form>
        <form className="col-lg-3">
          <InputField type="month" defaultValue="2022-12" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="month" />
        </form>
        <form className="col-lg-3">
          <InputField type="month" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">week</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="week" />
        </form>
        <form className="col-lg-3">
          <InputField type="week" defaultValue="2022-W28" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="week" />
        </form>
        <form className="col-lg-3">
          <InputField type="week" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      <div className="col-lg-12 h4">time</div>
      <div className="row">
        <form className="col-lg-3">
          <InputField type="time" />
        </form>
        <form className="col-lg-3">
          <InputField type="time" defaultValue="14:45" />
        </form>
        <form className="col-lg-3">
          <InputField disabled type="time" />
        </form>
        <form className="col-lg-3">
          <InputField type="time" className="form-control form-control-sm is-invalid" />
        </form>
      </div>

      {/* <div className="col-lg-12 h4">color</div>
        <form className="col-lg-3">
          <InputField type="color" className="form-control form-control-sm form-control-color" />
        </form>
      </div> */}

      <hr className="my-5" />
    </div>
  );
}

export default Forms;
