import THead from './_THead';

function TCaption() {
  return (
    <table className="table caption-top">
      <caption>Caption</caption>
      <THead />
      <tbody>
        <tr>
          <td>
            <span className="text-caption">C1 14/20 Regular (400)</span>
          </td>
          <td>14</td>
          <td>20</td>
          <td>Regular</td>
          <td>Подпись полей ввода, хлебные крошки</td>
        </tr>
        <tr>
          <td>
            <span className="text-xs text-caption">C2 12/18 Regular (400)</span>
          </td>
          <td>12</td>
          <td>18</td>
          <td>Regular</td>
          <td>Текст тултипов</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TCaption;
