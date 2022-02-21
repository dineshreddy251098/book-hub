import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const userLoginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(userLoginApi, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = fetchedData.error_msg
      this.setState({error: true, errorMsg})
    }
  }

  render() {
    const {error, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-bg-container">
        <div className="website-login-image-container-lg">
          <img
            className="website-login-image-lg"
            src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645024257/Rectangle_1467_ycjlhl.png"
            alt="website login"
          />
        </div>
        <div className="website-login-responsive-container">
          <div className="website-login-container">
            <div className="website-login-image-container-sm">
              <img
                className="website-login-image-sm"
                src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645024335/Ellipse_99_lojvwo.png"
                alt="website login"
              />
            </div>
            <form
              onSubmit={this.onSubmitUserDetails}
              className="login-form-container"
            >
              <div className="login-website-logo-container">
                <img
                  className="login-website-logo"
                  src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645024322/Group_7731_v0p1nt.png"
                  alt="login website logo"
                />
              </div>
              <div className="login-input-container">
                <label className="login-label" htmlFor="username">
                  Username<sup>*</sup>
                </label>
                <input
                  className="login-input"
                  onChange={this.onChangeUsername}
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                />
              </div>
              <div>
                <label className="login-label" htmlFor="password">
                  Password<sup>*</sup>
                </label>
                <input
                  onChange={this.onChangePassword}
                  className="login-input login-input-error-msg"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                />
                {error && <p className="error-msg">{errorMsg}</p>}
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
