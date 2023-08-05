import {Component} from 'react'
import Header from '../Header'
import Profile from '../Profile'
import FilterJobs from '../FilterJobs'
import JobsCard from '../JobsCard'
import JobsSection from '../JobsSection'
import './index.css'

class JobsPage extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = input => {
    this.setState({searchInput: input})
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-profile-filter-container">
            <FilterJobs />
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
