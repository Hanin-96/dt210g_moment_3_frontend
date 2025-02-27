import logotyp from "../assets/logotyp.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function header() {

  const { user, logout } = useAuth();
  return (
    <>
      <header>
        <ul>
          <li><NavLink to="/">Startsida</NavLink></li>
          <li>
            {
              !user ? <NavLink to="/login">Logga in</NavLink> : <NavLink to="/login" onClick={logout}>Logga ut</NavLink>
            }
          </li>
          <li><NavLink to="/mypage">Min sida</NavLink></li>
        </ul>
        <img src={`${logotyp}`} alt="logotyp" />
      </header>
    </>
  )
}

export default header