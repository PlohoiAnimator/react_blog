import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Войти</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        {/* Username */}
        <label htmlFor="userInput">Логин</label>
        <input
          type="text"
          placeholder="Введите свой логин..."
          id="userInput"
          className="loginInput"
          ref={userRef}
        />
        {/* Password */}
        <label htmlFor="passwordInput">Пароль</label>
        <input
          type="password"
          placeholder="Введите свой пароль..."
          id="passwordInput"
          className="loginInput"
          ref={passRef}
        />
        {/* Button Login */}
        <button
          type="submit"
          className="loginRegisterButton"
          disabled={isFetching}
        >
          Войти
        </button>
      </form>
      <Link to="/register" className="link">
        <button type="submit" className="loginButton">
          Регистрация
        </button>
      </Link>
    </div>
  );
}
