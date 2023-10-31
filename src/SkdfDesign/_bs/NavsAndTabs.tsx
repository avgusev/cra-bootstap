import classNames from 'classnames';

function UlNav({ className, isLonger }: { className?: string; isLonger?: boolean }) {
  return (
    <ul className={classNames('nav', className)}>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#/nav/nav">
          Active
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/nav">
          {isLonger ? 'Much longer nav link' : 'Link'}
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/nav">
          Link
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#/nav">
          Disabled
        </a>
      </li>
    </ul>
  );
}

function Nav({ className, isLonger }: { className?: string; isLonger?: boolean }) {
  return (
    <nav className={classNames('nav', className)}>
      <a className="nav-link active" aria-current="page" href="#/nav">
        Active
      </a>
      <a className="nav-link" href="#/nav">
        {isLonger ? 'Much longer nav link' : 'Link'}
      </a>
      <a className="nav-link" href="#/nav">
        Link
      </a>
      <a className="nav-link disabled" href="#/nav">
        Disabled
      </a>
    </nav>
  );
}

function NavsAndTabs() {
  return (
    <div className="container mb-5">
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/navs-tabs" target="_blank" rel="noreferrer">
          Navs and tabs
        </a>
      </h1>

      <h2>Base nav</h2>
      <h3>ul + li</h3>
      <UlNav />
      <h3>nav + a</h3>
      <Nav />

      <h2>Horizontal alignment</h2>
      <UlNav className="justify-content-center" />
      <UlNav className="justify-content-end" />

      <h2>Vertical</h2>
      <h3>ul + li</h3>
      <UlNav className="flex-column" />
      <h3>nav + a</h3>
      <Nav className="flex-column" />

      <h2>Tabs</h2>
      <UlNav className="nav-tabs" />

      <h2>Pills</h2>
      <UlNav className="nav-pills" />

      <h2>Fill and justify</h2>
      <h3>ul + li</h3>
      <UlNav className="nav-pills nav-fill" isLonger />
      <h3>nav + a</h3>
      <Nav className="nav-pills nav-fill" isLonger />

      <h3>same width</h3>
      <h3>ul + li</h3>
      <UlNav className="nav-pills nav-justified" isLonger />
      <h3>nav + a</h3>
      <Nav className="nav-pills nav-justified" isLonger />

      <h2>Working with flex utilities</h2>
      <nav className="nav nav-pills flex-column flex-sm-row">
        <a className="flex-sm-fill text-sm-center nav-link active" aria-current="page" href="#/nav">
          Active
        </a>
        <a className="flex-sm-fill text-sm-center nav-link" href="#/nav">
          Longer nav link
        </a>
        <a className="flex-sm-fill text-sm-center nav-link" href="#/nav">
          Link
        </a>
        <a className="flex-sm-fill text-sm-center nav-link disabled" href="#/nav">
          Disabled
        </a>
      </nav>

      <h2>Tabs with dropdowns...</h2>
      <h2>Pills with dropdowns...</h2>

      <hr className="my-5" />
    </div>
  );
}

export default NavsAndTabs;
