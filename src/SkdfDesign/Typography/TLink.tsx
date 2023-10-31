import THead from './_THead';

function TLink() {
  return (
    <table className="table caption-top" id="link">
      <caption>Link</caption>
      <THead />
      <tbody>
        <tr>
          <td>
            <a href="/" className="fw-medium">
              Link 16/24
            </a>
          </td>
          <td>16</td>
          <td>24</td>
          <td>Medium</td>
          <td>Ссылки</td>
        </tr>
        <tr>
          <td>
            <a href="/" className="fw-medium" style={{ textDecoration: 'underline' }}>
              Link 16/24
            </a>
          </td>
          <td>16</td>
          <td>24</td>
          <td>Medium</td>
          <td>Ссылка по ховеру</td>
        </tr>
        <tr>
          <td>
            <a href="/">Link 16/24 Regular</a>
          </td>
          <td>16</td>
          <td>24</td>
          <td>Regular</td>
          <td>Ссылки в таблицах</td>
        </tr>
        <tr>
          <td>
            <a href="/" style={{ textDecoration: 'underline' }}>
              Link 16/24 Reg Hov
            </a>
          </td>
          <td>16</td>
          <td>24</td>
          <td>Regular</td>
          <td>Ссылки в таблицах по ховеру</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TLink;
