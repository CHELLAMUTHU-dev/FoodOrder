import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { StoreContext } from "../../context/StoreContext";
import logo from "../../assets/logo.png";
import basket_icon from "../../assets/basket_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import bag_icon from "../../assets/bag_icon.png";
import "./Navbar.css";


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount} = useContext(StoreContext);
  const token = Cookies.get('jwt_token')
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/')
  }

 
  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <FaSearch />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("my-order")}> <img src={bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}> <FiLogOut color="tomato"/><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
