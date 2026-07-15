function Login() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              <h3>Login</h3>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;