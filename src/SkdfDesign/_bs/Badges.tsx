function Badges() {
  const textBadge = (
    <>
      Example heading <span className="badge bg-secondary">New</span>
    </>
  );
  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/badge" target="_blank" rel="noreferrer">
          Badge
        </a>
      </h1>
      <section>
        <h2>Examples</h2>
        <h1>{textBadge}</h1>
        <h2>{textBadge}</h2>
        <h3>{textBadge}</h3>
        <h4>{textBadge}</h4>
        <h5>{textBadge}</h5>
        <h6>{textBadge}</h6>
      </section>
      <section>
        <h2>Buttons </h2>
        <button type="button" className="btn btn-primary">
          Notifications <span className="badge text-bg-secondary">4</span>
        </button>
      </section>
      <section>
        <h2>Positioned </h2>
        <button type="button" className="btn btn-primary position-relative">
          Inbox
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            99+
            <span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </section>
      <section>
        <h4>rounded-circle </h4>
        <button type="button" className="btn btn-primary position-relative">
          Profile
          <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
        </button>
      </section>
      <section>
        <h2>Background colors</h2>
        <span className="badge text-bg-primary">Primary</span>
        <span className="badge text-bg-secondary">Secondary</span>
        <span className="badge text-bg-success">Success</span>
        <span className="badge text-bg-danger">Danger</span>
        <span className="badge text-bg-warning">Warning</span>
        <span className="badge text-bg-info">Info</span>
        <span className="badge text-bg-light">Light</span>
        <span className="badge text-bg-dark">Dark</span>
      </section>
      <section>
        <h2>Pill badges</h2>
        <span className="badge rounded-pill text-bg-primary">Primary</span>
        <span className="badge rounded-pill text-bg-secondary">Secondary</span>
        <span className="badge rounded-pill text-bg-success">Success</span>
        <span className="badge rounded-pill text-bg-danger">Danger</span>
        <span className="badge rounded-pill text-bg-warning">Warning</span>
        <span className="badge rounded-pill text-bg-info">Info</span>
        <span className="badge rounded-pill text-bg-light">Light</span>
        <span className="badge rounded-pill text-bg-dark">Dark</span>
      </section>
    </>
  );
}

export default Badges;
