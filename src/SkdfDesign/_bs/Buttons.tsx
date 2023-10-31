function Buttons() {
  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/buttons" target="_blank" rel="noreferrer">
          Buttons
        </a>
      </h1>
      <section>
        <h2>Examples</h2>
        <p>
          <button className="btn btn-primary">Primary</button> <button className="btn btn-secondary">Secondary</button>{' '}
          <button className="btn btn-success">Success</button> <button className="btn btn-danger">Danger</button>{' '}
          <button className="btn btn-warning">Warning</button> <button className="btn btn-info">Info</button>{' '}
          <button className="btn btn-light">Light</button> <button className="btn btn-dark">Dark</button>{' '}
          <button className="btn btn-link">Link</button>{' '}
        </p>
      </section>
      <section>
        <h2>Button tags</h2>
        <p>
          <a className="btn btn-primary" href="/" role="button">
            Link
          </a>{' '}
          <button className="btn btn-primary" type="submit">
            Button
          </button>{' '}
          <input className="btn btn-primary" type="button" value="Input" />{' '}
          <input className="btn btn-primary" type="submit" value="Submit" />{' '}
          <input className="btn btn-primary" type="reset" value="Reset" />{' '}
        </p>
      </section>
      <section>
        <h2>Outline buttons</h2>
        <p>
          <button className="btn btn-outline-primary">Primary</button>{' '}
          <button className="btn btn-outline-secondary">Secondary</button>{' '}
          <button className="btn btn-outline-success">Success</button>{' '}
          <button className="btn btn-outline-danger">Danger</button>{' '}
          <button className="btn btn-outline-warning">Warning</button>{' '}
          <button className="btn btn-outline-info">Info</button>{' '}
          <button className="btn btn-outline-light">Light</button>{' '}
          <button className="btn btn-outline-dark">Dark</button>{' '}
        </p>
      </section>
      <section>
        <h2>Sizes</h2>
        <p>
          <button className="btn btn-primary btn-lg">Large button</button>{' '}
          <button className="btn btn-secondary btn-lg">Large button</button>{' '}
          <button className="btn btn-primary btn-sm">Small button</button>{' '}
          <button className="btn btn-secondary btn-sm">Small button</button>{' '}
        </p>
      </section>
      <section>
        <h2>Disabled state</h2>
        <p>
          <button type="button" className="btn btn-primary" disabled>
            Primary button
          </button>{' '}
          <button type="button" className="btn btn-secondary" disabled>
            Button
          </button>{' '}
          <button type="button" className="btn btn-outline-primary" disabled>
            Primary button
          </button>{' '}
          <button type="button" className="btn btn-outline-secondary" disabled>
            Button
          </button>{' '}
          <a href="/" className="btn btn-primary disabled" role="button" aria-disabled="true">
            Primary link
          </a>{' '}
          <a href="/" className="btn btn-secondary disabled" role="button" aria-disabled="true">
            Link
          </a>{' '}
        </p>
      </section>
      <section>
        <h2>Block buttons</h2>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Button
          </button>
          <button className="btn btn-primary" type="button">
            Button
          </button>
        </div>
        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-primary" type="button">
            Button
          </button>
          <button className="btn btn-primary" type="button">
            Button
          </button>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" type="button">
            Button
          </button>
          <button className="btn btn-primary" type="button">
            Button
          </button>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="button">
            Button
          </button>
          <button className="btn btn-primary" type="button">
            Button
          </button>
        </div>
      </section>
      <section>
        <h2>Toggle states...</h2>
      </section>
    </>
  );
}

export default Buttons;
