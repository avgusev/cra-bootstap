function Alignments() {
  return (
    <>
      <h2>Vertical alignment</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col" className="w-25">
                Heading 1
              </th>
              <th scope="col" className="w-25">
                Heading 2
              </th>
              <th scope="col" className="w-25">
                Heading 3
              </th>
              <th scope="col" className="w-25">
                Heading 4
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate
                how the vertical alignment works in the preceding cells.
              </td>
            </tr>
            <tr className="align-bottom">
              <td>
                This cell inherits <code>vertical-align: bottom;</code> from the table row
              </td>
              <td>
                This cell inherits <code>vertical-align: bottom;</code> from the table row
              </td>
              <td>
                This cell inherits <code>vertical-align: bottom;</code> from the table row
              </td>
              <td>
                This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate
                how the vertical alignment works in the preceding cells.
              </td>
            </tr>
            <tr>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td className="align-top">This cell is aligned to the top.</td>
              <td>
                This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate
                how the vertical alignment works in the preceding cells.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Alignments;
