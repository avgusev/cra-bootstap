const table1 = (
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

const table2 = (
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
      <tr className="table-active">
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
        <td colSpan={2} className="table-active">
          Larry the Bird
        </td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </>
);

function AccentedTables() {
  return (
    <>
      <h2>Accented Tables</h2>

      <h3>Striped rows</h3>
      <table className="table table-striped">{table1}</table>

      <h3>Striped columns</h3>
      <table className="table table-striped-columns">{table1}</table>

      <p>These classes can also be added to table variants:</p>
      <table className="table table-dark table-striped">{table1}</table>
      <table className="table table-dark table-striped-columns">{table1}</table>

      <table className="table table-success table-striped">{table1}</table>
      <table className="table table-success table-striped-columns">{table1}</table>

      <h3>Hoverable rows</h3>
      <table className="table table-hover">{table1}</table>
      <table className="table table-dark table-hover">{table1}</table>
      <table className="table table-striped table-hover">{table1}</table>

      <h3>Active tables</h3>
      <table className="table">{table2}</table>
      <table className="table table-dark">{table2}</table>
    </>
  );
}

export default AccentedTables;
