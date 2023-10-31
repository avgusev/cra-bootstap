import THead from './_THead';

function TButton() {
  return (
    <table className="table caption-top">
      <caption>Button</caption>
      <THead />
      <tbody>
        <tr>
          <td>
            <span className="btn">Button 16/24 L (500)</span>
          </td>
          <td>16</td>
          <td>24</td>
          <td>Medium</td>
          <td>Текст в кнопках L</td>
        </tr>
        <tr>
          <td>
            <span className="btn btn-sm">Button 14/24 S (500)</span>
          </td>
          <td>14</td>
          <td>24</td>
          <td>Medium</td>
          <td>Текст в кнопках S</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TButton;
