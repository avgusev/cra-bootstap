function OverviewForm({ idHtml = 'exampleInput' }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={idHtml + 'Email'} className="form-label">
          Email address
        </label>
        <input type="email" className="form-control" id={idHtml + 'Email'} aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor={idHtml + 'Password'} className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id={idHtml + 'Password'} autoComplete="off" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id={idHtml + 'Check'} />
        <label className="form-check-label" htmlFor={idHtml + 'Check'}>
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </>
  );
}

function Overview() {
  return (
    <>
      <h2>Overview</h2>

      <section>
        <form>
          <fieldset>
            <OverviewForm />
          </fieldset>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Form text</h3>
        <form>
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            autoComplete="off"
          />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces,
            special characters, or emoji.
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="inputPassword6" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col-auto">
              <input
                type="password"
                id="inputPassword6"
                className="form-control"
                aria-describedby="passwordHelpInline"
                autoComplete="off"
              />
            </div>
            <div className="col-auto">
              <span id="passwordHelpInline" className="form-text">
                Must be 8-20 characters long.
              </span>
            </div>
          </div>
        </form>
      </section>

      <hr className="my-5" />

      <section>
        <h3>Disabled forms</h3>
        <form>
          <fieldset disabled>
            <OverviewForm idHtml="exampleInput2" />
          </fieldset>
        </form>
      </section>

      <hr className="my-5" />
    </>
  );
}

export default Overview;
