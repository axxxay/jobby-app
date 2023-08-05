import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import './index.css'
import JobsSection from '../JobsSection'

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

class FilterJobs extends Component {
  render() {
    const {onChangeSearchInput} = this.props
    const onChangeEmploymentType = event => {
      console.log(event.target.value)
    }
    let checked = false
    const isChecked = () => {
      checked = !checked
      console.log(checked)
    }
    let searchInput = ''
    const onChangeInput = event => {
      searchInput = event.target.value
    }

    const onClickSubmit = () => {
      onChangeSearchInput(searchInput)
    }
    return (
      <div className="jobs-filter-container">
        <div className="profile-filters-container">
          <div className="search-box-mob-con">
            <input
              type="text"
              placeholder="Search"
              className="search-box"
              onChange={onChangeInput}
            />
            <div className="search-icon-con">
              <BsSearch className="search-icon" onClick={onClickSubmit} />
            </div>
          </div>
          <Profile />
          <hr className="line" />
          <h1 className="filter-jobs-heading">Types of Employment</h1>
          {employmentTypesList.map(eachItem => (
            <div
              key={eachItem.employmentTypeId}
              className="job-filter-employment-type-con"
            >
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                className="job-filter-input-checkbox"
                value={eachItem.employmentTypeId}
                onChange={onChangeEmploymentType}
                onClick={isChecked}
              />
              <label
                htmlFor={eachItem.employmentTypeId}
                className="job-filter-input-label"
              >
                {eachItem.label}
              </label>
            </div>
          ))}
          <hr className="line" />
          <h1 className="filter-jobs-heading">Salary Range</h1>

          {salaryRangesList.map(eachItem => (
            <div
              key={eachItem.employmentTypeId}
              className="job-filter-employment-type-con"
            >
              <input
                type="radio"
                id={eachItem.salaryRangeId}
                className="job-filter-input-checkbox"
              />
              <label
                htmlFor={eachItem.salaryRangeId}
                className="job-filter-input-label"
              >
                {eachItem.label}
              </label>
            </div>
          ))}
        </div>
        <div className="jobs-search-box-job-card-con">
          <div className="search-box-desk-con">
            <input
              type="text"
              placeholder="Search"
              className="search-box"
              onChange={onChangeInput}
            />
            <div className="search-icon-con">
              <BsSearch className="search-icon" onClick={onClickSubmit} />
            </div>
          </div>

          <div className="job-section-desk-comp-con">
            <JobsSection />
          </div>
        </div>
        <div className="job-section-mobile-comp-con">
          <JobsSection />
        </div>
      </div>
    )
  }
}

export default FilterJobs
