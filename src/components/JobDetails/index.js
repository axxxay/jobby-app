import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {jobDetails: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: data.job_details.title,
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      similarJobs,
    } = jobDetails
    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-details-logo-title-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-logo"
            />
            <div className="job-details-title-rating-con">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating-con">
                <AiFillStar className="job-details-star" />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-location-type-salary-con">
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
            <p className="job-details-salary">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="job-details-desc-visit-con">
            <h1 className="job-details-desc-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="job-details-visit-con"
              target="_blank"
              rel="noreferrer"
            >
              <p className="job-details-visit">Visit</p>
              <HiOutlineExternalLink />
            </a>
          </div>
          <p className="job-details-desc">{jobDescription}</p>
          <h1 className="job-details-desc-heading">Skills</h1>
          <ul className="job-details-skills-con">
            {skills.map(eachItem => (
              <Skills key={eachItem.name} skill={eachItem} />
            ))}
          </ul>
          <h1 className="job-details-desc-heading">Life at Company</h1>
          <div className="job-details-life-con">
            <p className="job-details-desc life-at-company">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="job-details-life-img"
            />
          </div>
        </div>

        <div className="similar-job-container">
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-job-list">
            {similarJobs.map(eachItem => (
              <SimilarJobsCard key={eachItem.id} similarJob={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsFailure = () => (
    <div className="jobs-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-details-failure-image"
      />
      <h1 className="jobs-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobs-details-failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-details-failure-retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderJobDetails()
      case apiStatusConstant.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderSwitchCase()}
      </div>
    )
  }
}

export default JobDetails
