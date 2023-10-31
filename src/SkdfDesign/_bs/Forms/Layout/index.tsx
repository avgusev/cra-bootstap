import ComplexLayouts from './ComplexLayouts';
import HorizontalForm from './HorizontalForm';

function SelectPreference({ idHtml = '' }) {
  return (
    <>
      <label className="visually-hidden" htmlFor={idHtml}>
        Preference
      </label>
      <select className="form-select" id={idHtml}>
        <option defaultValue="0">Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </>
  );
}

function Layout() {
  const formGrid = (
    <>
      <div className="col">
        <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
      </div>
      <div className="col">
        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
      </div>
    </>
  );
  return (
    <>
      <h2>Layout</h2>

      <section>
        <h3>Utilities</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Example label
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Example input placeholder"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Another label
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Another input placeholder"
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Form grid</h3>
        <form>
          <div className="row">{formGrid}</div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Gutters</h3>
        <form>
          <div className="row g-3">{formGrid}</div>
        </form>
      </section>

      <hr className="my-5" />

      <ComplexLayouts />

      <hr className="my-5" />

      <HorizontalForm />

      <hr className="my-5" />

      <section>
        <h3>Column sizing</h3>
        <form>
          <div className="row g-3">
            <div className="col-sm-7">
              <input type="text" className="form-control" placeholder="City" aria-label="City" />
            </div>
            <div className="col-sm">
              <input type="text" className="form-control" placeholder="State" aria-label="State" />
            </div>
            <div className="col-sm">
              <input type="text" className="form-control" placeholder="Zip" aria-label="Zip" />
            </div>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Auto-sizing</h3>
        <form className="row gy-2 gx-3 align-items-center">
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInput">
              Name
            </label>
            <input type="text" className="form-control" id="autoSizingInput" placeholder="Jane Doe" />
          </div>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInputGroup">
              Username
            </label>
            <div className="input-group">
              <div className="input-group-text">@</div>
              <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username" />
            </div>
          </div>
          <div className="col-auto">
            <SelectPreference idHtml="Auto-sizing" />
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Remember me
              </label>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Inline forms</h3>
        <form className="row row-cols-lg-auto g-3 align-items-center">
          <div className="col-12">
            <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">
              Username
            </label>
            <div className="input-group">
              <div className="input-group-text">@</div>
              <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username" />
            </div>
          </div>

          <div className="col-12">
            <SelectPreference idHtml="Inline" />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
              <label className="form-check-label" htmlFor="inlineFormCheck">
                Remember me
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Layout;
