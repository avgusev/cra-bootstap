import THead from './_THead';

function THeadline() {
  return (
    <table className="table caption-top">
      <caption>Headline</caption>
      <THead />
      <tbody>
        <tr>
          <td>
            <h1>H1 32/40 Semibold (600)</h1>
          </td>
          <td>32</td>
          <td>40</td>
          <td>Semibold</td>
          <td>Заголовки на странице</td>
        </tr>
        <tr>
          <td>
            <h2>H2 24/32 Semibold (600)</h2>
          </td>
          <td>24</td>
          <td>32</td>
          <td>Semibold</td>
          <td>Заголовки разделов на странице</td>
        </tr>
        <tr>
          <td>
            <h3>H3 20/28 Semibold (600)</h3>
          </td>
          <td>20</td>
          <td>28</td>
          <td>Semibold</td>
          <td>Заголовки в меню, заголовки подразделов на странице</td>
        </tr>
        <tr>
          <td>
            <h4>H4 18/24 Medium (500)</h4>
          </td>
          <td>18</td>
          <td>24</td>
          <td>Medium</td>
          <td>Заголовки в карточках, заголовки подразделов на странице</td>
        </tr>
        <tr>
          <td>
            <h5>H5 16/24 Medium (500)</h5>
          </td>
          <td>16</td>
          <td>24</td>
          <td>Medium</td>
          <td>Подзаголовки в меню, заголовки таблиц</td>
        </tr>
        <tr>
          <td>
            <h6>H6 Default</h6>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default THeadline;
