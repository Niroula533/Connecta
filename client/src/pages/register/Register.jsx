import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

//A simple content

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <h3 className="loginLogo">Connecta</h3>
        <span className="loginDesc">
          Connect with your fingertips
        </span>
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Username"
            required
            ref={username}
            className="loginInput"
          />
          <input
            placeholder="Email"
            required
            ref={email}
            className="loginInput"
            type="email"
          />
          <input
            placeholder="Password"
            required
            ref={password}
            className="loginInput"
            type="password"
            minLength="6"
          />
          <input
            placeholder="Password Again"
            required
            ref={passwordAgain}
            className="loginInput"
            type="password"
          />
          <button type="submit" className="loginButton">
            Register
          </button>
          </form>
            <button className="loginRegisterButton" onClick={() => history.push('/login')}>Log into Account</button>
        </div>
      </div>
  );
}
