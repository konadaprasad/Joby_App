import {Link, withRouter} from 'react-router-dom'

import {TiHome} from 'react-icons/ti'

import {FaBriefcase} from 'react-icons/fa'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    const token = Cookies.get('jwt_token')
    console.log(token)
    history.replace('/login')
  }
  return (
    <nav className="navBar">
      <ul className="unordered">
        <Link to="/" className="LinkElement">
          <li className="listItem">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogoHome"
            />
          </li>
        </Link>
        <div className="navItems bigScreen">
          <Link to="/" className="LinkElement">
            <li className="listItem item ">Home</li>
          </Link>
          <Link to="/jobs" className="LinkElement">
            <li className="listItem item ">Jobs</li>
          </Link>
        </div>
        <li className="listItem bigScreen">
          <button
            className="logoutButton "
            type="button"
            onClick={logoutButton}
          >
            Logout
          </button>
        </li>
        <div className="navItems smallScreen">
          <Link to="/" className="LinkElement">
            <li className="listItem item ">
              <TiHome className="headerIcons" />
            </li>
          </Link>
          <Link to="/jobs" className="LinkElement">
            <li className="listItem item ">
              <FaBriefcase className="headerIcons" />
            </li>
          </Link>

          <li className="listItem item " onClick={logoutButton}>
            <FiLogOut className="headerIcons" />
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
