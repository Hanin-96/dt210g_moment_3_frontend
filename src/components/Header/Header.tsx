import logotyp from "../../assets/logotyp.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HeaderModuleStyle from "../Header/HeaderStyle.module.css";

function header() {
  const { user, logout } = useAuth();


  return (
    <>
      <header className={HeaderModuleStyle.header}>
        <div className={HeaderModuleStyle.headerContainer}>
          <NavLink to="/"><img src={`${logotyp}`} alt="logotyp" style={{ display: "block" }} /></NavLink>
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Startsida</NavLink></li>
            <li>
              {user ? <NavLink to="/mypage" className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Min sida</NavLink> : ""}
            </li>
            <li>
              {
                !user ? <NavLink to="/login" className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Logga in</NavLink> : <NavLink to="/login" onClick={logout}>Logga ut</NavLink>
              }
            </li>

          </ul>
        </div>
      </header>
    </>
  )
}

export default header