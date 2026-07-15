function Register() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">

            <div className="card-header bg-success text-white">
              <h3>Register</h3>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                />
              </div>

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

              <button className="btn btn-success w-100">
                Register
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;