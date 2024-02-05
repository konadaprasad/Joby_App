import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <div className="content-cont">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="para1">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits abilities and potential.
          </p>
          <Link to="/jobs" className="items">
            <button className="jobs-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
