import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  function handleLogout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className="top">
      <div className="topLeft">
        <i className="fab fa-vk"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-youtube"></i>
        <i className="fab fa-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              Домой
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              О нас
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              Контакты
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              Написать
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/login" className="link" onClick={handleLogout}>
              {user && "Выйти"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img src={PF + user.profilePic} alt="" className="topImg" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                Войти
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                Регистрация
              </Link>
            </li>
          </ul>
        )}

        <i className="fas fa-search topSeartchIcon"></i>
      </div>
    </div>
  );
}
