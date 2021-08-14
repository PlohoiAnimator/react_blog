import axios from "axios";
import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    dispatch({ type: "UPDATE_START" });
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      setSuccess(true);
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          {/* settingsPP Start*/}
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
              className="settingsImg"
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              className="settingsPPInput"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {/* settingsPP Close */}
          <label htmlFor="userInput">Username</label>
          <input
            type="text"
            id="userInput"
            className="settingsInput"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
          <label htmlFor="emailInput">Email</label>
          <input
            type="text"
            id="emailInput"
            className="settingsInput"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <label htmlFor="passInput">Password</label>
          <input
            type="password"
            id="passInput"
            className="settingsInput"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="settingsSubmitButton">
            Обновить
          </button>
          {success && (
            <span
              style={{
                color: "green",
                fontSize: "20px",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
