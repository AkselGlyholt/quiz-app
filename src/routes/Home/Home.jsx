import Setting from "./components/Setting";
import "./home.css";
import settings from "../../services/Settings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [changedSettings, setChangedSettings] = useState({
    category: 9,
    difficulty: "easy",
  });

  const submit = async () => {
    navigate(
      `/question/${changedSettings.category}/${changedSettings.difficulty}`
    );
  };

  return (
    <div className="container">
      <div className="row row-center">
        <h1 className="title">Quiz</h1>
        <h2 className="sub-title">
          Generate a random quiz, or select options for it
        </h2>
        <div className="settings--container">
          <div className="settings__options--container">
            {Object.keys(settings).map((setting) => (
              <Setting
                setChangedSettings={setChangedSettings}
                key={setting}
                name={setting}
              />
            ))}
          </div>
          <button onClick={submit} className="click">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
