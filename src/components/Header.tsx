import logotyp from "../assets/logotyp.png";
import { NavLink } from "react-router-dom";

function header() {
  return (
    <>
      <header>
        <ul>
          <li><NavLink to="/">Startsida</NavLink></li>
          <li><NavLink to="/login">Loginsida</NavLink></li>
        </ul>
        <img src={`${logotyp}`} alt="logotyp" />
      </header>
    </>
  )
}

export default header