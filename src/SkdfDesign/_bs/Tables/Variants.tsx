function TRow({ className = '', name = 'Default' }) {
  return (
    <tr className={className}>
      <th scope="row">{name}</th>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
  );
}

function Variants() {
  return (
    <>
      <h2>Variants</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Class</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
          </tr>
        </thead>
        <tbody>
          <TRow />
          <TRow className="table-primary" name="Primary" />
          <TRow className="table-secondary" name="Secondary" />
          <TRow className="table-success" name="Success" />
          <TRow className="table-danger" name="Danger" />
          <TRow className="table-warning" name="Warning" />
          <TRow className="table-info" name="Info" />
          <TRow className="table-light" name="Light" />
          <TRow className="table-dark" name="Dark" />
        </tbody>
      </table>
    </>
  );
}

export default Variants;
