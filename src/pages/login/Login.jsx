import "./login.scss";
import { useContext, useRef, useState } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const email = useRef();
  const password = useRef();
  // const [loading, setLoading] = useState(false);
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {

    // setLoading(true)
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    // setLoading(false)
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Application Leave System</h3>
          <span className="loginDesc">
            Leave management system is the software that manages student
            time-off requests in a smooth, fair, accurate, transparent and
            efficient way.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              className="loginInput"
              required
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>
              Log In
            </button>
            <p className="loginErr">
              {error ? "*Either username or password is incorrect*" : " "}
            </p>
          </form>
          {isFetching ? (
            <div className="loading-ring">
              Loading
              <span></span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
