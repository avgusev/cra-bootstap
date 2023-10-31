function Range() {
  return (
    <>
      <h2>Range</h2>

      <section>
        <h3>Overview</h3>
        <form>
          <label htmlFor="customRange1" className="form-label">
            Example range
          </label>
          <input type="range" className="form-range" id="customRange1" />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Disabled</h3>
        <form>
          <label htmlFor="disabledRange" className="form-label">
            Example range
          </label>
          <input type="range" className="form-range" id="disabledRange" disabled></input>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Min and max</h3>
        <form>
          <label htmlFor="customRange2" className="form-label">
            Example range
          </label>
          <input type="range" className="form-range" min="0" max="5" id="customRange2" />
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Steps</h3>
        <form>
          <label htmlFor="customRange3" className="form-label">
            Example range
          </label>
          <input type="range" className="form-range" min="0" max="5" step="0.5" id="customRange3" />
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Range;
