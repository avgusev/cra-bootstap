const stringDivider = {
  '--skdf-breadcrumb-divider': "'>'",
} as React.CSSProperties;
const SVGDivider = {
  '--skdf-breadcrumb-divider':
    "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><path d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/></svg>\")",
} as React.CSSProperties;
const noDivider = {
  '--skdf-breadcrumb-divider': 'none',
} as React.CSSProperties;

function BreadcrumbItem({ name, active }: { name: string; active?: boolean }) {
  if (active) {
    return (
      <li className="breadcrumb-item active" aria-current="page">
        {name}
      </li>
    );
  }

  return (
    <li className="breadcrumb-item">
      <a href="/">{name}</a>
    </li>
  );
}

const crumbs = (
  <>
    <BreadcrumbItem name="Home" />
    <BreadcrumbItem name="Library" />
    <BreadcrumbItem name="Data" active />
  </>
);

function Breadcrumbs() {
  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/breadcrumb/" target="_blank" rel="noreferrer">
          Breadcrumbs
        </a>
      </h1>
      <h2>Example</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <BreadcrumbItem name="Home" active />
        </ol>
      </nav>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <BreadcrumbItem name="Home" />
          <BreadcrumbItem name="Library" active />
        </ol>
      </nav>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">{crumbs}</ol>
      </nav>

      <h2>Dividers</h2>
      <nav style={stringDivider} aria-label="breadcrumb">
        <ol className="breadcrumb">{crumbs}</ol>
      </nav>
      <nav style={SVGDivider} aria-label="breadcrumb">
        <ol className="breadcrumb">{crumbs}</ol>
      </nav>
      <nav style={noDivider} aria-label="breadcrumb">
        <ol className="breadcrumb">{crumbs}</ol>
      </nav>
    </>
  );
}
export default Breadcrumbs;
