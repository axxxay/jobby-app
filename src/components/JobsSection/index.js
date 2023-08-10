import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import JobsCard from '../JobsCard'
import './index.css'
import FilterJobs from '../FilterJobs'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class JobsSection extends Component {
  state = {
    jobsList: [],
    employmentTypeList: [],
    minimumPackage: '',
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobsCard()
  }

  onSelectEmploymentType = event => {
    const {employmentTypeList} = this.state
    if (employmentTypeList.includes(event.target.value)) {
      const newEmploymentTypeList = employmentTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      this.setState(
        {employmentTypeList: newEmploymentTypeList},
        this.getJobsCard,
      )
    } else {
      this.setState(
        {
          employmentTypeList: [...employmentTypeList, event.target.value],
        },
        this.getJobsCard,
      )
    }
  }

  onChangeSalaryRange = event => {
    this.setState({minimumPackage: event.target.id}, this.getJobsCard)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsCard()
    }
  }

  onClickButton = () => {
    this.getJobsCard()
  }

  getJobsCard = async () => {
    const {employmentTypeList, minimumPackage, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeList.join()}&minimum_package=${minimumPackage}&search=${searchInput}`
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
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobsCards = () => {
    const {jobsList} = this.state
    const noJobs = jobsList.length === 0

    return (
      <div className="jobs-section-container">
        {noJobs ? (
          this.renderNoJobFound()
        ) : (
          <ul className="jobs-card-list">
            {jobsList.map(eachJob => (
              <JobsCard key={eachJob.id} jobsItem={eachJob} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderNoJobFound = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">No Jobs Found</h1>
      <p className="jobs-failure-desc">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for
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

  renderAllSections = () => {
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

  render() {
    return (
      <div className="jobs-section-container">
        <div className="jobs-section-profile-filter-con">
          <FilterJobs
            onSelectEmploymentType={this.onSelectEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
            onChangeInput={this.onChangeInput}
            onKeyEnter={this.onKeyEnter}
            onClickButton={this.onClickButton}
          />
        </div>
        <div className="job-section-search-card-con">
          <div className="search-box-desk-con">
            <input
              type="search"
              placeholder="Search"
              className="search-box"
              onChange={this.onChangeInput}
              //   value={searchInput}
              onKeyDown={this.onKeyEnter}
            />
            <button
              type="button"
              className="search-icon-con"
              onClick={this.onClickButton}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderAllSections()}
        </div>
      </div>
    )
  }
}

export default JobsSection
