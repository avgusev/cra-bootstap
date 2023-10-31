function FileInput({ id = '', name = '', className = '', multiple = false, disabled = false }) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {name}
      </label>
      <input className={className} type="file" id={id} multiple={multiple} disabled={disabled} />
    </>
  );
}

function FormControls() {
  return (
    <>
      <h2>Form controls</h2>

      <section>
        <h3>Example</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Sizing</h3>
        <form>
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder=".form-control-lg"
            aria-label=".form-control-lg example"
          />
          <input className="form-control" type="text" placeholder="Default input" aria-label="default input example" />
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder=".form-control-sm"
            aria-label=".form-control-sm example"
          />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Disabled</h3>
        <form>
          <input
            className="form-control"
            type="text"
            placeholder="Disabled input"
            aria-label="Disabled input example"
            disabled
          />
          <input
            className="form-control"
            type="text"
            defaultValue="Disabled readonly input"
            aria-label="Disabled input example"
            disabled
            readOnly
          />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Readonly</h3>
        <form>
          <input
            className="form-control"
            type="text"
            defaultValue="Readonly input here..."
            aria-label="readonly input example"
            readOnly
          />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Readonly plain text</h3>
        <form>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                defaultValue="email@example.com"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" autoComplete="off" />
            </div>
          </div>
        </form>
        <form className="row g-3">
          <div className="col-auto">
            <label htmlFor="staticEmail2" className="visually-hidden">
              Email
            </label>
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail2"
              value="email@example.com"
            />
          </div>
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control"
              id="inputPassword2"
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Confirm identity
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>File input</h3>
        <form>
          <div className="mb-3">
            <FileInput id="formFile" name="Default file input example" className="form-control" />
          </div>
          <div className="mb-3">
            <FileInput id="formFileMultiple" name="Multiple files input example" className="form-control" multiple />
          </div>
          <div className="mb-3">
            <FileInput id="formFileDisabled" name="Disabled file input example" className="form-control" disabled />
          </div>
          <div className="mb-3">
            <FileInput id="formFileSm" name="Small file input example" className="form-control form-control-sm" />
          </div>
          <div>
            <FileInput id="formFileLg" name="Large file input example" className="form-control form-control-lg" />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Color</h3>
        <form>
          <label htmlFor="exampleColorInput" className="form-label">
            Color picker
          </label>
          <input
            type="color"
            className="form-control form-control-color"
            id="exampleColorInput"
            defaultValue="#563d7c"
            title="Choose your color"
          />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Datalists</h3>
        <form>
          <label htmlFor="exampleDataList" className="form-label">
            Datalist example
          </label>
          <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
          <datalist id="datalistOptions">
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default FormControls;
