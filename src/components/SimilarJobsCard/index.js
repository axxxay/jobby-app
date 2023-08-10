import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsCard = ({similarJob}) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    rating,
    title,
  } = similarJob
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="similar-job-item">
        <div className="similar-job-img-title-con">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-job-logo"
          />
          <div className="similar-job-title-rating-con">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-job-rating-con">
              <AiFillStar className="job-details-star" />
              <p className="job-details-rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-job-desc-heading">Description</h1>
        <p className="similar-job-desc">{jobDescription}</p>
        <div className="job-details-location-type-con">
          <div className="job-details-location-type">
            <TiLocation className="job-details-location-icon" />
            <p className="job-details-location">{location}</p>
          </div>
          <div className="job-details-location-type">
            <BsFillBriefcaseFill className="job-details-location-icon" />
            <p className="job-details-location">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobsCard
