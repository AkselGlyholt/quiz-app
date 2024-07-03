import { Link } from "react-router-dom";
import "./nav.css";

const index = () => {
  return (
    <nav>
      <div className="row">
        <div className="nav--left left"></div>
        <div className="nav--right right">
          <ul className="nav__links">
            <li className="nav__link">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="nav__link">
              <Link to={"/question"}>Random</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default index;
