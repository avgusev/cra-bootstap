import SkdfIcon from '../components/SkdfIcon';

const breadcrumbs = (
  <>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor">
            <SkdfIcon name="arrow-left" width={16} height={16} />
            Текст
          </a>
        </li>
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor">Текст</a>
        </li>
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor">Текст</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Текст
        </li>
      </ol>
    </nav>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor" className="text-primary">
            <SkdfIcon name="arrow-left" width={16} height={16} />
            Текст
          </a>
        </li>
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor" className="text-primary">
            Текст
          </a>
        </li>
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor" className="text-primary">
            Текст
          </a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Текст
        </li>
      </ol>
    </nav>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item" aria-current="page">
          <a href="#/anchor" className="text-primary">
            <SkdfIcon name="arrow-left" width={16} height={16} />
            Текст
          </a>
        </li>
      </ol>
    </nav>
  </>
);

function Breadcrumbs() {
  return (
    <>
      <h1>SKDF Breadcrumbs</h1>
      <h2>Breadcrumbs basic</h2>
      {breadcrumbs}
      <hr />
      <h2>Divider 12px weight</h2>
      <div className="divider-12-weight">{breadcrumbs}</div>
      <hr />
      <h2>Divider 12px center</h2>
      <div className="divider-12-center">{breadcrumbs}</div>

      <hr />
      <h2>Divider 10px weight</h2>
      <div className="divider-10-weight">{breadcrumbs}</div>
      <hr />
      <h2>Divider 10px center</h2>
      <div className="divider-10-center">{breadcrumbs}</div>
      <hr />
    </>
  );
}
export default Breadcrumbs;
