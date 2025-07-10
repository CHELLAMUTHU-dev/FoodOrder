import { FaFacebook ,FaWhatsapp,FaTwitter,FaLinkedin   } from "react-icons/fa";



import logo_white from '../../assets/logo_white.png'
import './Footer.css'

const Footer = () => {
    return (
    <div className='footer' id='footer'>
        <div className="footer-content">
        <div className="footer-content-left">
            <img src={logo_white} alt="" className="footer-logo" />
            <p className="logo-text">Restaurant</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam blanditiis, adipisci, ipsum neque ex placeat distinctio, officiis ut nihil architecto possimus labore aliquam odit voluptatibus nam odio sint et perspiciatis. Porro similique nisi facilis id eligendi esse nobis numquam deserunt?</p>
            <div className="footer-social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={13} color='white'/></a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={13} color='white'/></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={13} color='white'/></a>
                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={13} color='white'/></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 8870926742</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
    </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © Tomato.com - All Right Reserved.</p>
    </div>
    )
}

export default Footer
