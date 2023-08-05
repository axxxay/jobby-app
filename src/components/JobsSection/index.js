import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import JobsCard from '../JobsCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class JobsSection extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobsCard()
  }

  getJobsCard = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${searchInput}`
    console.log(apiUrl)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  changeEmploymentType = employmentId => {
    const {employmentType} = this.state
    const isEmploymentTypeIncluded = employmentType.includes(employmentId)
    console.log(isEmploymentTypeIncluded)
  }

  renderJobsCards = () => {
    const {jobsList} = this.state
    return (
      <div className="jobs-section-container">
        <ul className="jobs-card-list">
          {jobsList.map(eachJob => (
            <JobsCard key={eachJob.id} jobsItem={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-retry-button"
        onClick={this.getJobsCard}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderJobsCards()
      case apiStatusConstant.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }
}

export default JobsSection
