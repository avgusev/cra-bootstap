function TypographyShort() {
  return (
    <section>
      <h1>H1 32/40 Semibold (600)</h1>
      <h2>H2 24/32 Semibold (600)</h2>
      <h3>H3 20/28 Semibold (600)</h3>
      <h4>H4 18/24 Medium (500)</h4>
      <h5>H5 16/24 Medium (500)</h5>
      <h6>H6 Default</h6>
      <hr />
      <p>
        B1 16/24 Regular (400). Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos harum error sapiente
        commodi suscipit minima vero illum sit beatae cum! Obcaecati ipsum quis, iusto incidunt sapiente doloremque!
        Iure, temporibus id!
        <strong> Strong text </strong>
        <b>Bold text </b>
        <i>Italic text </i>
        <b>
          <i>Bold Italic text </i>
        </b>
        <i>
          <b>Italic Bold text </b>
        </i>
      </p>
      <p>
        Единая цифровая среда для получения информации о дорожной деятельности в Российской Федерации и взаимодействия
        всех ее участников: от подрядных и эксплуатирующих организаций до граждан, использующих дорожно-транспортную
        инфраструктуру в повседневной жизни.
      </p>
      <p>
        <small>B2 14/20 Regular (400) {'<small>'}</small>
        <br />
        <span className="small">B2 14/20 Regular (400) {'.small'}</span>
        <br />
        <span className="text-sm">B2 14/20 Regular (400) {'.text-sm'}</span>
      </p>
      <p>
        <span className="text-caption">C1 14/20 Regular (400) {'.text-caption'}</span>
        <br />
        <span className="text-muted">C1 14/20 Regular (400) {'.text-muted'}</span>
        <br />
        <span className="text-caption text-xs">C2 12/18 Regular (400) {'.text-caption.text-xs'}</span>
      </p>
      <p>
        <span className="btn">Button 16/24 L (500)</span>
        <span className="btn btn-sm">Button 14/24 S (500) (несоответствие в Buttons)</span>
      </p>
      <div>
        <a href="/">Link 16/24 Medium (500)</a>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <a href="/">Link 16/24 Regular (400)</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TypographyShort;
