import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {GoBriefcase} from 'react-icons/go'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {itemsList} = props
  const {
    companyLogoUrl,
    title,
    jobDescription,
    packagePerAnnum,
    employmentType,
    location,
    rating,
    id,
  } = itemsList

  return (
    <Link to={`/jobs/${id}`} className="linked">
      <li className="product-cont">
        <div className="cont1">
          <img src={companyLogoUrl} alt="company logo" className="img-1" />
          <div className="inner-cont1">
            <h1 className="head-1">{title}</h1>
            <div className="con">
              <FaStar className="star" />
              <p className="head-1">{rating}</p>
            </div>
          </div>
        </div>
        <div className="cont-2">
          <div className="cont1">
            <div className="cont2">
              <IoLocation className="location" />
              <p className="para3">{location}</p>
            </div>
            <div className="cont2">
              <GoBriefcase className="location" />
              <p className="para3">{employmentType}</p>
            </div>
          </div>
          <p className="para-2">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="desc-cont">
          <h1 className="para4">Description</h1>
          <p className="para-4">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
