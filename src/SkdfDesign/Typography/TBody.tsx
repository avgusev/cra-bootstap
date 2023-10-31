import THead from './_THead';

function TBody() {
  return (
    <table className="table caption-top">
      <caption>Body</caption>
      <THead />
      <tbody>
        <tr>
          <td>B1 16/24 Regular (400)</td>
          <td>16</td>
          <td>24</td>
          <td>Regular</td>
          <td>Основной текстовый стиль</td>
        </tr>
        <tr>
          <td>
            <small>B2 14/20 Regular (400)</small>
            <br />
            <span className="small">B2 14/20 Regular (400)</span>
            <br />
            <span className="text-sm">B2 14/20 Regular (400)</span>
          </td>
          <td>14</td>
          <td>20</td>
          <td>Regular</td>
          <td>Заголовки разделов на странице</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TBody;
