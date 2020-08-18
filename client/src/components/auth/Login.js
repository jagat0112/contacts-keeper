import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, error, login } = authContext;

  const { email, password } = user;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated === true) {
      history.push("/");
    }

    if (error !== null) {
      alertContext.setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div className="form-container">
      <h1>
        User <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            id="password"
          />
        </div>

        <button className="btn btn-primary btn-block" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};
export default Login;
