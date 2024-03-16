import React from 'react'
import JobDescription from '../Components/Jobs/JobDescription'
import JobHeader from '../Components/Jobs/JobHeader'
import JobListing from '../Components/Jobs/JobListing'
import JobBar from '../Components/Jobs/JobBar'
const Job = () => {
  return (
    <div>
      <JobHeader />
      <JobBar />
      <div className="flex">
      <JobListing />
      <JobDescription />
      </div>

    </div>
  )
}

export default Job