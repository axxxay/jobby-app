import './index.css'

const SalaryRangeList = ({onChangeSalaryRange, salaryRangeItem}) => {
  const {salaryRangeId, label} = salaryRangeItem
  return (
    <li className="job-filter-employment-type-con">
      <input
        type="radio"
        id={salaryRangeId}
        className="job-filter-input-checkbox"
        name="salary"
        onChange={onChangeSalaryRange}
      />
      <label htmlFor={salaryRangeId} className="job-filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeList
