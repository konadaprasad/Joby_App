import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const statusViews = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileList: {}, statusView: statusViews.loading}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({statusView: statusViews.loading})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(profileUrl, options)

    if (profileResponse.ok) {
      const profileData = await profileResponse.json()
      const item = profileData.profile_details
      const updatedProfileData = {
        name: item.name,
        profileImageUrl: item.profile_image_url,
        shortBio: item.short_bio,
      }
      this.setState({
        profileList: updatedProfileData,
        statusView: statusViews.success,
      })
    } else {
      this.setState({statusView: statusViews.failure})
    }
  }

  showLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  showSuccessView = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList

    return (
      <div className="profile-cont">
        <img src={profileImageUrl} alt="profile" className="img" />
        <h1 className="head">{name}</h1>
        <p className="p1">{shortBio}</p>
      </div>
    )
  }

  onRetry1 = () => {
    this.setState({statusView: statusViews.loading}, this.getProfileDetails)
  }

  showFailureView = () => (
    <div className="failure-cont">
      <button className="failure-btn" type="button" onClick={this.onRetry1}>
        Retry
      </button>
    </div>
  )

  render() {
    const {statusView} = this.state

    switch (statusView) {
      case statusViews.loading:
        return this.showFailureView()
      case statusViews.success:
        return this.showSuccessView()
      case statusViews.failure:
        return this.showFailureView()
      default:
        return null
    }
  }
}

export default Profile
