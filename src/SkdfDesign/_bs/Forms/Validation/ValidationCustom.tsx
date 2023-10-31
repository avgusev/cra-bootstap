function Validation() {
  function formSubmit() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event: { preventDefault: () => void; stopPropagation: () => void }) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  }

  return (
    <>
      <section>
        <h3>Custom styles</h3>
        <form className="row g-3 needs-validation" noValidate>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input type="text" className="form-control" id="validationCustom01" defaultValue="Mark" required />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input type="text" className="form-control" id="validationCustom02" defaultValue="Otto" required />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="validationCustom03" required />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom04" className="form-label">
              State
            </label>
            <select className="form-select" id="validationCustom04" required>
              <option defaultValue="0" disabled value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div className="invalid-feedback">Please select a valid state.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom05" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="validationCustom05" required />
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck" required />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">You must agree before submitting.</div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit" onClick={formSubmit}>
              Submit form
            </button>
          </div>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Validation;
