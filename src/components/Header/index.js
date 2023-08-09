import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-logo"
        />
      </Link>
      <ul className="navbar-menu-list">
        <Link to="/" className="link-item">
          <li className="navbar-menu-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="navbar-menu-item">Jobs</li>
        </Link>
      </ul>

      <button
        type="button"
        className="navbar-logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>

      <ul className="navbar-mobile-container">
        <Link to="/" className="link-item">
          <li>
            <AiFillHome className="navbar-mobile-icon" />
          </li>
        </Link>

        <Link to="/jobs" className="link-item">
          <li>
            <BsFillBriefcaseFill className="navbar-mobile-icon" />
          </li>
        </Link>
        <li>
          <button
            type="button"
            className="navbar-mobile-button"
            onClick={onClickLogout}
          >
            <FiLogOut className="navbar-mobile-icon" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
