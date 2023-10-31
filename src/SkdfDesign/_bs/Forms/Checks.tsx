import { useEffect, useRef } from 'react';

function ControlBox({
  id = 'flexCheckDefault',
  className = 'form-check-input',
  name = '',
  value = '',
  label = '',
  type = 'checkbox',
  role = '',
  disabled = false,
  defaultChecked = false,
  indeterminate = false,
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (indeterminate && ref.current) {
      ref.current.indeterminate = true;
    }
  }, [indeterminate]);

  return (
    <>
      <input
        ref={ref}
        id={id}
        className={className}
        name={name}
        defaultValue={value}
        type={type}
        role={role}
        disabled={disabled}
        defaultChecked={defaultChecked}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </>
  );
}

function Checks() {
  return (
    <>
      <h2>Checks and Radios</h2>

      <section>
        <h3>Checks</h3>
        <form>
          <div className="form-check">
            <ControlBox id="flexCheckDefault" label="Default checkbox" type="checkbox" />
          </div>
          <div className="form-check">
            <ControlBox id="flexCheckDefault2" label="Default checkbox" type="checkbox" defaultChecked />
          </div>
          <h3>Indeterminate</h3>
          <div className="form-check">
            <ControlBox
              indeterminate
              id="flexCheckIndeterminate"
              label="Indeterminate checkbox"
              type="checkbox"
              defaultChecked
            />
          </div>
          <h4>Disabled</h4>
          <div className="form-check">
            <ControlBox id="flexCheckDefaultDisabled" label="Default checkbox" type="checkbox" disabled />
          </div>
          <div className="form-check">
            <ControlBox
              id="flexCheckCheckedDisabled"
              label="Default checkbox"
              type="checkbox"
              defaultChecked
              disabled
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Radios</h3>
        <form>
          <div className="form-check">
            <ControlBox id="flexRadioDefault1" label="Default radio" name="flexRadioDefault" type="radio" />
          </div>
          <div className="form-check">
            <ControlBox
              id="flexRadioDefault2"
              label="Default checked radio"
              name="flexRadioDefault"
              type="radio"
              defaultChecked
            />
          </div>
          <h4>Disabled</h4>
          <div className="form-check">
            <ControlBox id="flexRadioDisabled" label="Default radio" name="flexRadioDefault2" type="radio" disabled />
          </div>
          <div className="form-check">
            <ControlBox
              id="flexRadioDisabledChecked"
              label="Default checked radio"
              type="radio"
              name="flexRadioDefault2"
              disabled
              defaultChecked
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Switches</h3>
        <form>
          <div className="form-check form-switch">
            <ControlBox
              id="flexSwitchCheckDefault"
              label="Default switch checkbox input"
              role="switch"
              type="checkbox"
            />
          </div>
          <div className="form-check form-switch">
            <ControlBox
              id="flexSwitchCheckDefault2"
              label="Checked switch checkbox input"
              role="switch"
              type="checkbox"
              defaultChecked
            />
          </div>
          <div className="form-check form-switch">
            <ControlBox
              id="flexSwitchCheckDisabled"
              label="Disabled switch checkbox input"
              role="switch"
              type="checkbox"
              disabled
            />
          </div>
          <div className="form-check form-switch">
            <ControlBox
              id="flexSwitchCheckCheckedDisabled"
              label="Disabled checked switch checkbox input"
              role="switch"
              type="checkbox"
              defaultChecked
              disabled
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Inline</h3>
        <form>
          <div className="form-check form-check-inline">
            <ControlBox id="inlineCheckbox1" label="1" type="checkbox" value="option1" />
          </div>
          <div className="form-check form-check-inline">
            <ControlBox id="inlineCheckbox2" label="2" type="checkbox" value="option2" />
          </div>
          <div className="form-check form-check-inline">
            <ControlBox id="inlineCheckbox3" label="3 (disabled)" type="checkbox" value="option3" disabled />
          </div>
        </form>
        <form>
          <div className="form-check form-check-inline">
            <ControlBox id="inlineRadio1" label="1" name="inlineRadioOptions" type="radio" value="option1" />
          </div>
          <div className="form-check form-check-inline">
            <ControlBox id="inlineRadio2" label="2" name="inlineRadioOptions" type="radio" value="option2" />
          </div>
          <div className="form-check form-check-inline">
            <ControlBox
              id="inlineRadio3"
              label="3 (disabled)"
              name="inlineRadioOptions"
              type="radio"
              value="option3"
              disabled
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Reverse</h3>
        <form>
          <div className="form-check form-check-reverse">
            <ControlBox id="reverseCheck1" label="Reverse checkbox" type="checkbox" value="option1" />
          </div>
          <div className="form-check form-check-reverse">
            <ControlBox id="reverseCheck2" label="Disabled reverse checkbox" type="checkbox" disabled />
          </div>

          <div className="form-check form-switch form-check-reverse">
            <ControlBox
              id="flexSwitchCheckReverse"
              label="Reverse switch checkbox input"
              type="checkbox"
              value="option1"
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h2>Toggle buttons</h2>
        <h3>Checkbox toggle buttons</h3>
        <form>
          <input type="checkbox" className="btn-check" id="btn-check" autoComplete="off" />
          <label className="btn btn-primary" htmlFor="btn-check">
            Single toggle
          </label>
          <input type="checkbox" className="btn-check" id="btn-check-2" defaultChecked autoComplete="off" />
          <label className="btn btn-primary" htmlFor="btn-check-2">
            Checked
          </label>
          <input type="checkbox" className="btn-check" id="btn-check-3" autoComplete="off" disabled />
          <label className="btn btn-primary" htmlFor="btn-check-3">
            Disabled
          </label>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Radio toggle buttons</h3>
        <form>
          <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" defaultChecked />
          <label className="btn btn-secondary" htmlFor="option1">
            Checked
          </label>

          <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
          <label className="btn btn-secondary" htmlFor="option2">
            Radio
          </label>

          <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" disabled />
          <label className="btn btn-secondary" htmlFor="option3">
            Disabled
          </label>

          <input type="radio" className="btn-check" name="options" id="option4" autoComplete="off" />
          <label className="btn btn-secondary" htmlFor="option4">
            Radio
          </label>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Outlined styles</h3>
        <form>
          <input type="checkbox" className="btn-check" id="btn-check-outlined" autoComplete="off" />
          <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">
            Single toggle
          </label>
          <br />

          <input type="checkbox" className="btn-check" id="btn-check-2-outlined" defaultChecked autoComplete="off" />
          <label className="btn btn-outline-secondary" htmlFor="btn-check-2-outlined">
            Checked
          </label>
          <br />

          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="success-outlined"
            autoComplete="off"
            defaultChecked
          />
          <label className="btn btn-outline-success" htmlFor="success-outlined">
            Checked success radio
          </label>

          <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
          <label className="btn btn-outline-danger" htmlFor="danger-outlined">
            Danger radio
          </label>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Checks;
