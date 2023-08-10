import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import EmploymentTypeList from '../EmploymentTypeList'
import SalaryRangeList from '../SalaryRangeList'
import './index.css'

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

const FilterJobs = props => {
  const {
    onSelectEmploymentType,
    onChangeSalaryRange,
    onKeyEnter,
    onChangeInput,
    onClickButton,
  } = props
  return (
    <div className="profile-filters-container">
      <div className="search-box-mobile-con">
        <input
          type="search"
          placeholder="Search"
          className="search-box"
          onChange={onChangeInput}
          onKeyDown={onKeyEnter}
        />
        <button
          type="button"
          className="search-icon-con"
          onClick={onClickButton}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      <Profile />
      <hr className="line" />
      <h1 className="filter-jobs-heading">Type of Employment</h1>
      <ul className="filter-jobs-employment-type-list">
        {employmentTypesList.map(eachItem => (
          <EmploymentTypeList
            key={eachItem.employmentTypeId}
            employmentTypeItem={eachItem}
            onSelectEmploymentType={onSelectEmploymentType}
          />
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filter-jobs-heading">Salary Range</h1>
      <ul className="filter-jobs-employment-type-list">
        {salaryRangesList.map(eachItem => (
          <SalaryRangeList
            key={eachItem.salaryRangeId}
            onChangeSalaryRange={onChangeSalaryRange}
            salaryRangeItem={eachItem}
          />
        ))}
      </ul>
    </div>
  )
}

export default FilterJobs
