function FormSelect({ idHtml = '' }) {
  return (
    <>
      <select className="form-select" id={idHtml} aria-label="Floating label select example">
        <option defaultValue="0">Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <label htmlFor={idHtml}>Works with selects</label>
    </>
  );
}
function InputEmail({ id = '', className = '', label = '', readOnly = false }) {
  return (
    <>
      <input
        type="email"
        className={className}
        id={id}
        readOnly={readOnly}
        placeholder="name@example.com"
        defaultValue="test@example.com"
      />
      <label htmlFor="floatingInputValue">{label}</label>
    </>
  );
}

function Floating() {
  return (
    <>
      <h2>Floating</h2>

      <section>
        <h3>Example</h3>
        <form className="form-floating">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="off"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
        </form>
        <h3>value</h3>
        <form className="form-floating">
          <InputEmail id="floatingInputValue" className="form-control" label="Input with value" />
        </form>
        <form className="form-floating">
          <InputEmail id="floatingInputInvalid" className="form-control is-invalid" label="Invalid input" />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Textareas</h3>
        <form>
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea">Comments</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: '100px' }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Comments</label>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Selects</h3>
        <form className="form-floating">
          <FormSelect idHtml="Selects" />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Readonly plaintext</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            readOnly
            className="form-control-plaintext"
            id="floatingEmptyPlaintextInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingEmptyPlaintextInput">Empty input</label>
        </div>
        <div className="form-floating mb-3">
          <InputEmail
            id="floatingPlaintextInput"
            readOnly
            className="form-control-plaintext"
            label="Input with value"
          />
        </div>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Layout</h3>
        <form>
          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInputValue1"
                  placeholder="name@example.com"
                  defaultValue="test@example.com"
                />
                <label htmlFor="floatingInputValue1">Input with value</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <FormSelect idHtml="Layout" />
              </div>
            </div>
          </div>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Floating;
