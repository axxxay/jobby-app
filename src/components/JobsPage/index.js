import Header from '../Header'
import './index.css'
import JobsSection from '../JobsSection'

const JobsPage = () => (
  <>
    <Header />
    <div className="jobs-container">
      <JobsSection />
    </div>
  </>
)

export default JobsPage
