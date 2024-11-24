import React from 'react'
import JobDescription from '../Components/Jobs/JobDescription'
import JobHeader from '../Components/Jobs/JobHeader'
import JobListing from '../Components/Jobs/JobListing'
import JobBar from '../Components/Jobs/JobBar'
const Job = () => {
  return (
    <div style={{backgroundColor:"#f4f2ee"}}>
      <JobHeader />
      <JobBar />
      <div className="grid gap-0 grid-cols-2">
      <JobListing />
      <JobDescription />
      </div>

    </div>
  )
}

export default Job