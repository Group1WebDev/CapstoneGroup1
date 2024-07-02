

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/footer';
import './contactus.css';

function ContactUs() {
  return (
    <>
      <Header />
      <section className="contactSection">
        <div className="container">
          <h1>Contact Us</h1>
          <p>If you have any questions, feel free to reach out to us. We're here to help!</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactUs;
