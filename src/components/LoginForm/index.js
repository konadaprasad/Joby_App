import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errMsg: ''}

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errMsg: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.setState({username: '', password: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
    this.setState({showSubmitError: false, errMsg: ''})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
    this.setState({showSubmitError: false, errMsg: ''})
  }

  render() {
    const {username, password, showSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form className="form-cont" onSubmit={this.submitForm}>
            <label htmlFor="inputId" className="labelId">
              USERNAME
            </label>
            <input
              className="input-item"
              type="text"
              placeholder="Username"
              value={username}
              id="inputId"
              onChange={this.changeUsername}
            />
            <label htmlFor="inputId2" className="labelId">
              PASSWORD
            </label>
            <input
              className="input-item"
              type="password"
              placeholder="Password"
              value={password}
              id="inputId2"
              onChange={this.changePassword}
            />
            <button className="btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="err-para">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
