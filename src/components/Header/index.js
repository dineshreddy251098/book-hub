import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  onClickMenu = () => {
    this.setState(prevState => ({displayNavbar: !prevState.displayNavbar}))
  }

  onClickCross = () => {
    this.setState({displayNavbar: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  onClickWebsiteLogo = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {home, shelves} = this.props
    const activeHome = home ? 'active-tab' : ''
    const activeShelves = shelves ? 'active-tab' : ''
    const {displayNavbar} = this.state

    return (
      <div>
        <div className="header-container">
          <div>
            <Link to="/">
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645024322/Group_7731_v0p1nt.png"
                alt="website logo"
              />
            </Link>
          </div>
          <ul className="tabs-container">
            <Link className="link" to="/">
              <li className={`list-item home-tab ${activeHome}`}>Home</li>
            </Link>
            <Link className="link" to="/shelf">
              <li className={`list-item bookshelves-tab ${activeShelves}`}>
                Bookshelves
              </li>
            </Link>
            <li className="list-item">
              <button
                onClick={this.onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-navbar-responsive-container">
          <div className="header-navbar-container">
            <img
              className="header-nav-bar-website-logo"
              src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645024322/Group_7731_v0p1nt.png"
              alt="login website logo"
            />
            <button
              onClick={this.onClickMenu}
              className="cross-icon-btn"
              type="button"
            >
              <FiMenu className="menu-icon" />
            </button>
          </div>
          {displayNavbar && (
            <div className="header-navbar-tabs-container">
              <Link className="link" to="/">
                <h1 className={`home-tab ${activeHome}`}>Home</h1>
              </Link>
              <Link className="link" to="/shelf">
                <h1 className={`bookshelves-tab ${activeShelves}`}>
                  Bookshelves
                </h1>
              </Link>
              <button
                onClick={this.onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
              <button
                onClick={this.onClickCross}
                className="cross-icon-btn"
                type="button"
              >
                <RiCloseCircleFill className="cross-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
