import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">Обо мне</span>
        <img src="https://html5css.ru/howto/img_avatar.png" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem aspernatur reprehenderit ex?
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Категории</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Следите за нами</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-vk"></i>
          <i className="sidebarIcon fab fa-twitter"></i>
          <i className="sidebarIcon fab fa-youtube"></i>
          <i className="sidebarIcon fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
