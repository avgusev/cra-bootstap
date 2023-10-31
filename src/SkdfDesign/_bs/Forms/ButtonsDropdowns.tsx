/* eslint-disable jsx-a11y/anchor-is-valid */
function ButtonsDropdowns() {
  const dropdownItems = (
    <>
      <li>
        <a className="dropdown-item" href="/">
          Action
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="/">
          Another action
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="/">
          Something else here
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <a className="dropdown-item" href="/">
          Separated link
        </a>
      </li>
    </>
  );
  return (
    <>
      <section>
        <h3>Multiple inputs</h3>
        <form>
          <div className="input-group mb-3">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </button>
            <ul className="dropdown-menu">{dropdownItems}</ul>
            <input type="text" className="form-control" aria-label="Text input with dropdown button" />
          </div>

          <div className="input-group mb-3">
            <input type="text" className="form-control" aria-label="Text input with dropdown button" />
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </button>
            <ul className="dropdown-menu dropdown-menu-end">{dropdownItems}</ul>
          </div>

          <div className="input-group">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </button>
            <ul className="dropdown-menu">{dropdownItems}</ul>
            <input type="text" className="form-control" aria-label="Text input with 2 dropdown buttons" />
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </button>
            <ul className="dropdown-menu dropdown-menu-end">{dropdownItems}</ul>
          </div>
        </form>
      </section>
    </>
  );
}

export default ButtonsDropdowns;
