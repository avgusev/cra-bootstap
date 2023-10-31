function ListItem({ className = '', name = '' }) {
  return (
    <li className={className}>
      <a className="page-link" href="/">
        {name}
      </a>
    </li>
  );
}

function Pagination() {
  const numbers = (
    <>
      <ListItem className="page-item" name="1" />
      <ListItem className="page-item" name="2" />
      <ListItem className="page-item" name="3" />
    </>
  );
  const numbersActive = (
    <>
      <ListItem className="page-item active" name="1" />
      <ListItem className="page-item " name="2" />
      <ListItem className="page-item " name="3" />
    </>
  );

  const alignmentList = (
    <>
      <ListItem className="page-item disabled" name="Previous" />
      {numbers}
      <ListItem className="page-item" name="Next" />
    </>
  );

  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/pagination" target="_blank" rel="noreferrer">
          Pagination
        </a>
      </h1>
      <section>
        <h3>Overview</h3>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <ListItem className="page-item" name="Previous" />
            {numbers}
            <ListItem className="page-item" name="Next" />
          </ul>
        </nav>
      </section>
      <section>
        <h3>Working with icons</h3>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {numbers}
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section>
        <h3>Disabled and active states</h3>
        <nav aria-label="...">
          <ul className="pagination">
            <ListItem className="page-item disabled" name="Previous" />
            <ListItem className="page-item" name="1" />
            <ListItem className="page-item active" name="2" />
            <ListItem className="page-item" name="3" />
            <ListItem className="page-item" name="Next" />
          </ul>
        </nav>
        <h4>Span</h4>
        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
            <ListItem className="page-item" name="1" />
            <li className="page-item active" aria-current="page">
              <span className="page-link">2</span>
            </li>
            <ListItem className="page-item" name="3" />
            <ListItem className="page-item" name="Next" />
          </ul>
        </nav>
      </section>
      <section>
        <h3>Sizing</h3>
        <h4>pagination-lg</h4>
        <nav aria-label="...">
          <ul className="pagination pagination-lg">{numbersActive}</ul>
        </nav>
        <h4>pagination-sm</h4>
        <nav aria-label="...">
          <ul className="pagination pagination-sm">{numbersActive}</ul>
        </nav>
      </section>
      <section>
        <h3>Alignment</h3>
        <h4>justify-content-center</h4>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">{alignmentList}</ul>
        </nav>
        <h4>justify-content-end</h4>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">{alignmentList}</ul>
        </nav>
      </section>
    </>
  );
}

export default Pagination;
