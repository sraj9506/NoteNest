import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp(props) {
  const emailRef = useRef("");
  const passRef = useRef("");
  const nameRef = useRef("");
  const cPassRef = useRef("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let password = passRef.current.value;
    let cpass = cPassRef.current.value;
    if (cpass === password) {
      let email = emailRef.current.value;
      let name = nameRef.current.value;
      const response = await fetch(
        "http://localhost:5000/api/auth/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, password }),
        }
      );
      const json = await response.json();
      if (json.success) {
        navigate("/Login");
        props.showAlert("Account Created Successfully !", "success");
      } else {
        props.showAlert(json.error, "danger");
      }
    }
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100 pt-5 ">
        <div className="col-md-4 border-0 shadow p-4 card">
          <h2 className="text-center m-0 mb-3">SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="mt-3">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Type your name"
                ref={nameRef}
                required
                minLength={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="mt-3">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="Type your email"
                ref={emailRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Type your password"
                ref={passRef}
                required
                minLength={5}
              />
            </div>
            <div className="form-group">
              <label htmlFor="conpassword" className="mt-3">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control mb-3"
                id="conpassword"
                placeholder="Re-type your password"
                ref={cPassRef}
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary my-3 w-100"
              value="Register"
            />
            <div className="text-center">
              Already have an account ? <Link to="/Login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
