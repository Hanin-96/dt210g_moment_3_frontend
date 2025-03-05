import logotyp from "../../assets/logotyp.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HeaderModuleStyle from "../Header/HeaderStyle.module.css";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setMenu] = useState(false);

  //Toggla meny
  const toggleMenuBar = () => {

    setMenu(value => !value)
  }

  return (
    <>
      <header className={HeaderModuleStyle.header}>
        <div className={HeaderModuleStyle.headerContainer}>

          <NavLink to="/"><img src={`${logotyp}`} alt="logotyp" style={{ display: "block" }} /></NavLink>

          <nav className={`${HeaderModuleStyle.navMain} ${showMenu ? HeaderModuleStyle.navMobil : ""}`}>
            <ul>
              <li><NavLink to="/" onClick={toggleMenuBar} className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Startsida</NavLink></li>
              {user &&
                <li>
                  <NavLink to="/mypage" onClick={toggleMenuBar} className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Min sida</NavLink>
                </li>
              }
              <li>
                {
                  !user ? <NavLink to="/login" onClick={toggleMenuBar} className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Logga in</NavLink> : <NavLink to="/login" onClick={() => { toggleMenuBar(); logout(); }} className={({ isActive }) => isActive ? HeaderModuleStyle.active : ""}>Logga ut</NavLink>
                }
              </li>
            </ul>
            <div className={`${HeaderModuleStyle.hamburger} ${showMenu ? HeaderModuleStyle.hamburger && HeaderModuleStyle.active : ""}`} onClick={toggleMenuBar}>
              <span className={HeaderModuleStyle.bar}></span>
              <span className={HeaderModuleStyle.bar}></span>
              <span className={HeaderModuleStyle.bar}></span>
            </div>
          </nav>


        </div>
      </header>
    </>
  )
}

export default Header