function Shadows() {
  const shadowCol = (variant: string, size: string) => (
    <div className="col-4 col-md-4 col-lg-2">
      <div className={`m-4 p-3 rounded text-center text-muted skdf-shadow-${variant}-${size}`}>{size}</div>
    </div>
  );

  const shadow = (variant: string) => (
    <section className="container-fluid">
      <h3>skdf-{variant}</h3>
      <div className="row">
        {shadowCol(variant, '2dp')}
        {shadowCol(variant, '4dp')}
        {shadowCol(variant, '8dp')}
        {shadowCol(variant, '16dp')}
        {shadowCol(variant, '24dp')}
        {shadowCol(variant, '32dp')}
      </div>
    </section>
  );

  return (
    <>
      <h2>SKDF Shadows</h2>
      {shadow('up')}
      {shadow('down')}
      {shadow('right')}
    </>
  );
}

export default Shadows;
