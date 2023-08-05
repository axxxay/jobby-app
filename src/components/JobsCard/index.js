import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsCard = props => {
  const {jobsItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsItem
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobs-list-item-container">
        <div className="jobs-logo-name-con">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="jobs-logo"
          />
          <div className="jobs-title-con">
            <h1 className="job-title">{title}</h1>
            <div className="job-company-rating">
              <AiFillStar className="job-rating-icon" />
              <p className="job-rating-number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobs-loc-type-salary-con">
          <div className="jobs-loc-type-con">
            <div className="jobs-location-con">
              <TiLocation className="job-location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="jobs-location-con">
              <BsFillBriefcaseFill className="job-type-icon" />
              <p className="job-location">{employmentType}</p>
            </div>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>
        <hr className="jobs-line" />
        <p className="job-desc-heading">Description</p>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
