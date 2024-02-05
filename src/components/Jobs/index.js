import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'
import Header from '../Header'
import Profile from '../Profile'

import './index.css'

const positionView = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const CheckBoxItem = props => {
  const {item1, onClickCheck} = props
  const {label, employmentTypeId} = item1
  const onFilter = event => {
    onClickCheck(event.target.value)
  }

  return (
    <li className="checkbox-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onClick={onFilter}
      />
      <label htmlFor={employmentTypeId} className="checkItem">
        {label}
      </label>
    </li>
  )
}

const RadioItem = props => {
  const {item2, onClickRadio} = props
  const {salaryRangeId, label} = item2
  const onFilter2 = event => {
    onClickRadio(event.target.value)
  }
  return (
    <li className="checkbox-item">
      <input
        type="radio"
        name="salary"
        id={salaryRangeId}
        value={salaryRangeId}
        onClick={onFilter2}
      />
      <label htmlFor={salaryRangeId} className="checkItem">
        {label}
      </label>
    </li>
  )
}

class Jobs extends Component {
  state = {
    inputSearch: '',
    jobsList: [],
    status: positionView.loading,
    checkArray: [],
    radioArray: '',
    search: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {radioArray, checkArray, inputSearch} = this.state
    const checkList = checkArray.join()
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status: positionView.loading})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkList}&minimum_package=${radioArray}&search=${inputSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        title: eachItem.title,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        rating: eachItem.rating,
      }))
      this.setState({jobsList: updatedData, status: positionView.success})
    } else {
      this.setState({status: positionView.failure})
    }
  }

  changeInput = event => {
    this.setState({search: event.target.value})
  }

  getFinalInput = () => {
    const {search} = this.state
    this.setState({inputSearch: search}, this.getJobs)
  }

  onSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.noJobsView()
    }
    return (
      <div className="job-list-container">
        <ul className="jobs-items">
          {jobsList.map(eachItem => (
            <JobCard itemsList={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  onRetry = () => {
    console.log('fail')
    this.setState({status: positionView.loading}, this.getJobs)
  }

  onFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="heading2">Oops! Something Went Wrong</h1>
      <p className="para2">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failure-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  onLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noJobsView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-image"
      />
      <h1 className="heading2">No Jobs Found</h1>
      <p className="para2">We could not find any jobs. Try other filters</p>
    </div>
  )

  showJobView = () => {
    const {status} = this.state
    switch (status) {
      case positionView.loading:
        return this.onLoadingView()
      case positionView.success:
        return this.onSuccessView()
      case positionView.failure:
        return this.onFailureView()
      default:
        return null
    }
  }

  onClickCheck = Cid => {
    const {checkArray} = this.state
    const result = checkArray.includes(Cid)
    if (result === false) {
      this.setState({checkArray: [...checkArray, Cid]}, this.getJobs)
    } else {
      const updated = checkArray.filter(each => {
        if (each !== Cid) {
          return each
        }
        return null
      })
      this.setState({checkArray: updated}, this.getJobs)
    }
  }

  onClickRadio = Rid => {
    this.setState({radioArray: Rid}, this.getJobs)
  }

  getFilterItems = () => (
    <div className="filter-cont">
      <h1 className="p-4">Type of Employment</h1>
      <ul className="checkbox-cont">
        {employmentTypesList.map(eachItem => (
          <CheckBoxItem
            item1={eachItem}
            key={eachItem.employmentTypeId}
            onClickCheck={this.onClickCheck}
          />
        ))}
      </ul>
      <hr className="line1" />
      <h1 className="p-4">Salary Range</h1>
      <ul className="checkbox-cont">
        {salaryRangesList.map(each => (
          <RadioItem
            item2={each}
            key={each.salaryRangeId}
            onClickRadio={this.onClickRadio}
          />
        ))}
      </ul>
    </div>
  )

  render() {
    const {search} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="container">
          <div className="conty">
            <Profile />
            <hr className="line1" />
            {this.getFilterItems()}
          </div>
          <div className="job">
            <div className="input-cont">
              <input
                type="search"
                className="search-item"
                placeholder="Search"
                value={search}
                onChange={this.changeInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getFinalInput}
              >
                <BsSearch className="search-icon" />.
              </button>
            </div>
            {this.showJobView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
