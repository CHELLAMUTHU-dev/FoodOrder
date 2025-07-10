import { FiPlusCircle } from "react-icons/fi";
import './Sidebar.css'
import order_icon from '../../assets/order_icon.png'
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='sidebar'>
     <div className="sidebar-options">
      <NavLink  to='/' className="sidebar-option">
          <button type="button"><FiPlusCircle/></button>
          <p>Add Items</p>
      </NavLink>
      <NavLink to='/list' className="sidebar-option">
        <img src={order_icon} alt="" />
          <p>List Items</p>
      </NavLink>
      <NavLink to='/order' className="sidebar-option">
          <img src={order_icon} alt="" />
          <p>Orders</p>
      </NavLink>
     </div>
    </div>
  )
}

export default Sidebar
