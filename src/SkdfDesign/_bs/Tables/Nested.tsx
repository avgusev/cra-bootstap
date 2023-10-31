function Nested() {
  return (
    <>
      <h2>Nesting</h2>
      <table className="table table-striped table-bordered">
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
            <td colSpan={4}>
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">A</th>
                    <td>First</td>
                    <td>Last</td>
                  </tr>
                  <tr>
                    <th scope="row">B</th>
                    <td>First</td>
                    <td>Last</td>
                  </tr>
                  <tr>
                    <th scope="row">C</th>
                    <td>First</td>
                    <td>Last</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default Nested;
