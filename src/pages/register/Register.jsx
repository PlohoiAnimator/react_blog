import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const handler = async (e) => {
    e.preventDefault();
    setErrors(false);
    try {
      setErrors(false);
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      console.log(res);
    } catch (err) {
      setErrors(true);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Регистрация</span>
      <form className="registerForm" onSubmit={handler}>
        {/* Username */}
        <label htmlFor="userInput">Ник</label>
        <input
          type="text"
          placeholder="Введите свой логин..."
          id="userInput"
          className="registerInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Email */}
        <label htmlFor="emailInput">Email</label>
        <input
          type="text"
          placeholder="Введите свой email..."
          id="emailInput"
          className="registerInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password */}
        <label htmlFor="passwordInput">Пароль</label>
        <input
          type="password"
          placeholder="Введите свой пароль..."
          id="passwordInput"
          className="registerInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Button register */}
        <button type="submit" className="registerRegisterButton">
          Регистрация
        </button>
      </form>
      <Link to="/login" className="link">
        <button type="submit" className="registerButton">
          Войти
        </button>
      </Link>

      {errors && <span className="error">Что-то пошло не так</span>}
    </div>
  );
}
