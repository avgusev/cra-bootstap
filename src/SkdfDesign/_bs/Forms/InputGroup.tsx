import ButtonsDropdowns from './ButtonsDropdowns';

function InputGroup() {
  const inputElement = (
    <>
      <span className="input-group-text" id="inputGroup-sizing-sm">
        Input
      </span>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
    </>
  );
  const optionSelect = (
    <>
      <option defaultValue="0">Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </>
  );
  const segmentedList = (
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
      <h2>Input group</h2>

      <section>
        <h3>Basic example</h3>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
              @example.com
            </span>
          </div>

          <label htmlFor="basic-url" className="form-label">
            Your vanity URL
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              https://example.com/users/
            </span>
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
            <span className="input-group-text">.00</span>
          </div>

          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" />
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" placeholder="Server" aria-label="Server" />
          </div>

          <div className="input-group">
            <span className="input-group-text">With textarea</span>
            <textarea className="form-control" aria-label="With textarea"></textarea>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Wrapping</h3>
        <form>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Sizing</h3>
        <form>
          <div className="input-group input-group-sm mb-3">{inputElement}</div>

          <div className="input-group mb-3">{inputElement}</div>

          <div className="input-group input-group-lg">{inputElement}</div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Checkboxes and radios</h3>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                defaultValue=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <input type="text" className="form-control" aria-label="Text input with checkbox" />
          </div>

          <div className="input-group">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="radio"
                defaultValue=""
                aria-label="Radio button for following text input"
              />
            </div>
            <input type="text" className="form-control" aria-label="Text input with radio button" />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Multiple inputs</h3>
        <form>
          <div className="input-group">
            <span className="input-group-text">First and last name</span>
            <input type="text" aria-label="First name" className="form-control" />
            <input type="text" aria-label="Last name" className="form-control" />
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Multiple addons</h3>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <span className="input-group-text">0.00</span>
            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
          </div>

          <div className="input-group">
            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
            <span className="input-group-text">$</span>
            <span className="input-group-text">0.00</span>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Button addons</h3>
        <form>
          <div className="input-group mb-3">
            <button className="btn btn-sm btn-outline-secondary" type="button" id="button-addon1">
              Button
            </button>
            <input
              type="text"
              className="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-sm btn-outline-secondary" type="button" id="button-addon2">
              Button
            </button>
          </div>

          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
            <input
              type="text"
              className="form-control"
              placeholder=""
              aria-label="Example text with two button addons"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username with two button addons"
            />
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Buttons with dropdowns...</h3>
        <ButtonsDropdowns />
      </section>

      <hr className="my-5" />

      <section>
        <h3>Segmented buttons...</h3>
        <form>
          <div className="input-group mb-3">
            <button type="button" className="btn btn-outline-secondary">
              Action
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">{segmentedList}</ul>
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
          </div>

          <div className="input-group">
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
            <button type="button" className="btn btn-outline-secondary">
              Action
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">{segmentedList}</ul>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Custom select</h3>
        <form>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Options
            </label>
            <select className="form-select" id="inputGroupSelect01">
              {optionSelect}
            </select>
          </div>

          <div className="input-group mb-3">
            <select className="form-select" id="inputGroupSelect02">
              {optionSelect}
            </select>
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Options
            </label>
          </div>

          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
            <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
              {optionSelect}
            </select>
          </div>

          <div className="input-group">
            <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
              {optionSelect}
            </select>
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Custom file input</h3>
        <form>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupFile01">
              Upload
            </label>
            <input type="file" className="form-control" id="inputGroupFile01" />
          </div>

          <div className="input-group mb-3">
            <input type="file" className="form-control" id="inputGroupFile02" />
            <label className="input-group-text" htmlFor="inputGroupFile02">
              Upload
            </label>
          </div>

          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03">
              Button
            </button>
            <input
              type="file"
              className="form-control"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
            />
          </div>

          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
            />
            <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">
              Button
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default InputGroup;
