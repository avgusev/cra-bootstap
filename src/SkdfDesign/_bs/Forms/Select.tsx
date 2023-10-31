function Select() {
  const option = (
    <>
      <option defaultValue="0">Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </>
  );
  return (
    <>
      <h2>Select</h2>

      <section>
        <h3>Default</h3>
        <form>
          <select className="form-select" aria-label="Default select example">
            {option}
          </select>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Sizing</h3>
        <form>
          <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            {option}
          </select>
          <select className="form-select form-select-sm" aria-label=".form-select-sm example">
            {option}
          </select>
          <h4>Multiple</h4>
          <select className="form-select" multiple aria-label="multiple select example">
            {option}
          </select>
          <h4>Size attribute</h4>
          <select className="form-select" size={3} aria-label="size 3 select example">
            {option}
          </select>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Disabled</h3>
        <form>
          <select className="form-select" aria-label="Disabled select example" disabled>
            {option}
          </select>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Select;
