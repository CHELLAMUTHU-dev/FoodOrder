import admin_logo from '../../assets/admin_logo.png'
import { CgProfile } from "react-icons/cg";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={admin_logo} alt="" className='logo' />
        <CgProfile className='profile'/>
    </div>
  )
}

export default Navbar
