import {Component} from 'react'

import {FaStar, FaBriefcase} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {RiExternalLinkFill} from 'react-icons/ri'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Views = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const SimilarJobs = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = item
  return (
    <li className="similarListItem">
      <div className="companyLogoContainer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="companyLogo"
        />
        <div>
          <h1 className="title white">{title}</h1>
          <div className="con">
            <FaStar className="star" />
            <p className="rating white">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="para4">Description</h1>
      <p className="para-4">{jobDescription}</p>
      <div className="locationContainer">
        <div className="starContainer">
          <IoLocationSharp className="location white" />
          <p className="locationPara">{location}</p>
          <FaBriefcase className="location white" />
          <p className="locationPara white">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

const Skills = props => {
  const {item} = props
  const {name, imageUrl} = item
  return (
    <li className="skillListItem">
      <img src={imageUrl} className="skillImg" alt={name} />
      <p className="skillName">{name}</p>
    </li>
  )
}

class JobItem extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    skills: [],
    lifeAtCompany: [],
    view: Views.loading,
  }

  componentDidMount = () => {
    this.getJobDetail()
  }

  getJobDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      let updatedData = data.job_details
      updatedData = {
        companyWebsiteUrl: updatedData.company_website_url,
        companyLogoUrl: updatedData.company_logo_url,
        employmentType: updatedData.employment_type,
        jobDescription: updatedData.job_description,
        id: updatedData.id,
        location: updatedData.location,
        packagePerAnnum: updatedData.package_per_annum,
        rating: updatedData.rating,
        title: updatedData.title,
      }
      const updatedSkills = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const similar = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      let updatedLifeAtCompany = data.job_details.life_at_company
      updatedLifeAtCompany = {
        description: updatedLifeAtCompany.description,
        imageUrl: updatedLifeAtCompany.image_url,
      }
      this.setState({
        similarJobs: similar,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        jobDetails: updatedData,
        view: Views.success,
      })
    } else {
      this.setState({view: Views.failure})
    }
  }

  retryJobButton = () => {
    console.log('faillure')
    this.setState({view: Views.loading}, this.getJobDetail)
  }

  renderJobItemSuccessView = () => {
    const {jobDetails, skills, similarJobs, lifeAtCompany} = this.state
    console.log(skills)
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <>
        <Header />
        <div className="JobItemContainer">
          <div className="JobIteminsideContainer">
            <div className="companyLogoContainer">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="companyLogo"
              />
              <div>
                <h1 className="title white">{title}</h1>
                <div className="con">
                  <FaStar className="star" />
                  <p className="rating white">{rating}</p>
                </div>
              </div>
            </div>
            <div className="locationContainer">
              <div className="starContainer">
                <IoLocationSharp className="location white" />
                <p className="locationPara">{location}</p>
                <FaBriefcase className="location white" />
                <p className="locationPara white">{employmentType}</p>
              </div>
              <div className="starContainer">
                <p className="PackagePara white">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="line" />
            <div className="descriptionJobItem">
              <h1 className="para4">Description</h1>
              <a
                href={`${jobDetails.companyWebsiteUrl}`}
                rel="nofollow"
                className="anchorElement"
              >
                <button
                  className="visitButton"
                  onClick={this.visitClicked}
                  type="button"
                >
                  <p className="visitPara">Visit</p>
                  <RiExternalLinkFill className="visit white" />
                </button>
              </a>
            </div>
            <p className="para-4">{jobDescription}</p>
            <h1 className="para4">Skills</h1>
            <ul className="unorderedSkills">
              {skills.map(each => (
                <Skills item={each} key={each.imageUrl} />
              ))}
            </ul>
            <h1 className="para4">Life at Company</h1>
            <div className="lifeatcompany">
              <p className="jobItemDetailDescription lifeDescription">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="lifeAtCompanyImg"
              />
            </div>
          </div>
          <div className="similarJobsContainer">
            <h1 className="para4">Similar Jobs</h1>
            <ul className="similarJobsUnordered">
              {similarJobs.map(each => (
                <SimilarJobs item={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderJobItemFailureView = () => (
    <div className="JobItemContainer failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobFailure"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="para-4">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failureButton"
        type="button"
        onClick={this.retryJobButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => {
    console.log('loading')

    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderJobItem = () => {
    const {view} = this.state
    switch (view) {
      case Views.success:
        return this.renderJobItemSuccessView()
      case Views.failure:
        return this.renderJobItemFailureView()
      case Views.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderJobItem()
  }
}

export default JobItem
