import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = () => (
  <nav className="navbar-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="navbar-logo"
    />
    <ul className="navbar-menu-list">
      <Link to="/" className="link-item">
        <li className="navbar-menu-item">Home</li>
      </Link>
      <Link to="/jobs" className="link-item">
        <li className="navbar-menu-item">Jobs</li>
      </Link>
    </ul>
    <button type="button" className="navbar-logout-button">
      Logout
    </button>
    <div className="navbar-mobile-container">
      <Link to="/" className="link-item">
        <AiFillHome className="navbar-mobile-icon" />
      </Link>
      <Link to="/jobs" className="link-item">
        <BsFillBriefcaseFill className="navbar-mobile-icon" />
      </Link>
      <Link to="/" className="link-item">
        <FiLogOut className="navbar-mobile-icon" />
      </Link>
    </div>
  </nav>
)

export default Header
