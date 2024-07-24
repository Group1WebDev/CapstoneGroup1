import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';



export default function JobsPosted() {
  return (
    <div>
      <h1>Jobs Posted</h1>
      <div className='jobs_listings'>
        <div className='card_holder'>
          <div className='job_card_header'>
            <div className='job_info'>
              <h3>Job Title</h3>
              <span className='job_type'>Job type</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
