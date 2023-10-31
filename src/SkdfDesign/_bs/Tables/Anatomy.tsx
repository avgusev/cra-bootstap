const theadRow = (
  <tr>
    <th scope="col">#</th>
    <th scope="col">First</th>
    <th scope="col">Last</th>
    <th scope="col">Handle</th>
  </tr>
);

const tbody = (
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
);

function TablesAnatomy() {
  return (
    <>
      <h2>Anatomy</h2>
      <h3>Table head</h3>
      <table className="table">
        <thead className="table-light">{theadRow}</thead>
        {tbody}
      </table>
      <table className="table">
        <thead className="table-dark">{theadRow}</thead>
        {tbody}
      </table>

      <h3>Table foot</h3>
      <table className="table">
        <thead className="table-light">{theadRow}</thead>
        {tbody}
        <tfoot>
          <tr>
            <td>Footer</td>
            <td>Footer</td>
            <td>Footer</td>
            <td>Footer</td>
          </tr>
        </tfoot>
      </table>

      <h3>Captions</h3>
      <table className="table">
        <caption>List of users</caption>
        <thead>{theadRow}</thead>
        {tbody}
      </table>
      <table className="table caption-top">
        <caption>List of users</caption>
        <thead>{theadRow}</thead>
        {tbody}
      </table>
    </>
  );
}
export default TablesAnatomy;
