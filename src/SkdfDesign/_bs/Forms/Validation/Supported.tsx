function Supported() {
  return (
    <>
      <section>
        <h3>Supported</h3>

        <form className="was-validated">
          <div className="mb-3">
            <label htmlFor="validationTextarea" className="form-label">
              Textarea
            </label>
            <textarea
              className="form-control is-invalid"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
            ></textarea>
            <div className="invalid-feedback">Please enter a message in the textarea.</div>
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="validationFormCheck1" required />
            <label className="form-check-label" htmlFor="validationFormCheck1">
              Check this checkbox
            </label>
            <div className="invalid-feedback">Example invalid feedback text</div>
          </div>

          <div className="form-check">
            <input type="radio" className="form-check-input" id="validationFormCheck2" name="radio-stacked" required />
            <label className="form-check-label" htmlFor="validationFormCheck2">
              Toggle this radio
            </label>
          </div>
          <div className="form-check mb-3">
            <input type="radio" className="form-check-input" id="validationFormCheck3" name="radio-stacked" required />
            <label className="form-check-label" htmlFor="validationFormCheck3">
              Or toggle this other radio
            </label>
            <div className="invalid-feedback">More example invalid feedback text</div>
          </div>

          <div className="mb-3">
            <select className="form-select" required aria-label="select example">
              <option value="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="invalid-feedback">Example invalid select feedback</div>
          </div>

          <div className="mb-3">
            <input type="file" className="form-control" aria-label="file example" required />
            <div className="invalid-feedback">Example invalid form file feedback</div>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" type="submit" disabled>
              Submit form
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Supported;
