function ValidationBrowser() {
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

          form.classNameList.add('was-validated');
        },
        false
      );
    });
  }

  return (
    <>
      <section>
        <h2>Browser defaults</h2>
        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="validationDefault01" className="form-label">
              First name
            </label>
            <input type="text" className="form-control" id="validationDefault01" defaultValue="Mark" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefault02" className="form-label">
              Last name
            </label>
            <input type="text" className="form-control" id="validationDefault02" defaultValue="Otto" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefaultUsername" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend2">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationDefaultUsername"
                aria-describedby="inputGroupPrepend2"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefault03" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="validationDefault03" required />
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault04" className="form-label">
              State
            </label>
            <select className="form-select" id="validationDefault04" required>
              <option defaultValue="0" disabled value="">
                Choose...
              </option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault05" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="validationDefault05" required />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck2" required />
              <label className="form-check-label" htmlFor="invalidCheck2">
                Agree to terms and conditions
              </label>
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

export default ValidationBrowser;
