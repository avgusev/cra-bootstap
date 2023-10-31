const table = (
  <>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
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
        <td colSpan={2}>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </>
);

function TableBorders() {
  return (
    <>
      <h2>Table borders</h2>
      <h3>Bordered tables</h3>
      <table className="table table-bordered">{table}</table>
      <table className="table table-bordered border-primary">{table}</table>

      <h3>Tables without borders</h3>
      <table className="table table-borderless">{table}</table>
      <table className="table table-dark table-borderless">{table}</table>
    </>
  );
}

export default TableBorders;
