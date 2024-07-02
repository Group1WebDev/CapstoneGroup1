import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './footer.css'

function footer() {
  return (
    <>
      <footer>
        <div className='container'>
          <div className="footer-container">
            <div className="footer_sec1">
              <h2>Talent Hunt</h2>
              <p>Est class vel si sit orci rutrum at morbi commodo pellentesque. Faucibus sociosqu suspendisse integer id justo enim letiuse leifend volutpat suscipit consectetur.</p>
              <div className="social-icons">
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
              </div>
            </div>
            <div className="footer_sec2">
              <h3>Categories</h3>
              <ul>
                <li><a href="#">Development</a></li>
                <li><a href="#">IT</a></li>
                <li><a href="#">Accounting</a></li>
                <li><a href="#">Medical</a></li>
                <li><a href="#">All</a></li>
              </ul>
            </div>
            <div className="footer_sec3">
              <h3>Company</h3>
              <ul>
              <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Employer Portal</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2024 Talent Hunt, All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default footer