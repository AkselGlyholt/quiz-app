import React from "react";
import settings from "../../../services/Settings";

const Setting = ({ name, setChangedSettings }) => {
  const options = settings[name];

  const change = (event) => {
    const value = event.target.value;
    setChangedSettings((prevData) => {
      const updated = { ...prevData };
      updated[name] = value;

      return updated;
    });
  };

  return (
    <div className="setting">
      <label className="setting__title">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <select onChange={(event) => change(event)} name="" id="">
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Setting;
