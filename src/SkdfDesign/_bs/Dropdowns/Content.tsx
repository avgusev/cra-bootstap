import { Dropdown } from 'react-bootstrap';
import { separatedItems, staticBlockStyles } from './Helpers';

const textBlockStyles = {
  maxWidth: '200px',
  ...staticBlockStyles,
} as React.CSSProperties;

function ExampleForm({ uniq = 1 }) {
  return (
    <form className="px-4 py-3">
      <div className="mb-3">
        <label htmlFor={`exampleDropdownFormEmail${uniq}`} className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id={`exampleDropdownFormEmail${uniq}`}
          placeholder="email@example.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`exampleDropdownFormPassword${uniq}`} className="form-label">
          Password
        </label>
        <input
          type="password"
          autoComplete="off"
          className="form-control"
          id={`exampleDropdownFormPassword${uniq}`}
          placeholder="Password"
        />
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id={`dropdownCheck${uniq}`} />
          <label className="form-check-label" htmlFor={`dropdownCheck${uniq}`}>
            Remember me
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
}

function Content() {
  return (
    <>
      <h2>Menu content</h2>
      <h3>Headers</h3>
      <Dropdown.Menu show style={staticBlockStyles}>
        <Dropdown.Header>Dropdown header</Dropdown.Header>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
      </Dropdown.Menu>

      <h3>Dividers</h3>
      <Dropdown.Menu show style={staticBlockStyles}>
        {separatedItems}
      </Dropdown.Menu>
      <h3>Text</h3>
      <Dropdown.Menu show className="p-4 text-muted" style={textBlockStyles}>
        <p>Some example text that's free-flowing within the dropdown menu.</p>
        <p>And this is more example text.</p>
      </Dropdown.Menu>
      <h3>Forms</h3>
      <Dropdown.Menu show style={staticBlockStyles}>
        <ExampleForm />
        <Dropdown.Divider />
        <Dropdown.Item href="/">New around here? Sign up</Dropdown.Item>
        <Dropdown.Item href="/">Forgot password?</Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown autoClose="inside">
        <Dropdown.Toggle variant="primary">Dropdown form</Dropdown.Toggle>
        <Dropdown.Menu>
          <ExampleForm uniq={2} />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Content;
