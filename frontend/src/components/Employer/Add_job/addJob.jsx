import React, { useState } from 'react'
import EmployerSidebar from '../sidebar'
import MultiRangeSlider from "multi-range-slider-react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function AddNewJob(sidebarCollapse, sidebarHandler) {

  // function to handle salary slider
  const [minSalary, set_minSalary] = useState(25);
  const [maxSalary, set_maxSalary] = useState(75);
  const handleSliderInput = (e) => {
    set_minSalary(e.minValue);
    set_maxSalary(e.maxValue);
  };
  console.log(minSalary, maxSalary, 'salary tracker')

  // function to handle multiple checkbox for language
  const [languageSelected, setlanguageSelected] = useState([]);

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setlanguageSelected([...languageSelected, value]);
    } else {
      setlanguageSelected(languageSelected.filter((lang) => lang !== value));
    }
  };
  console.log(languageSelected, 'sdelefvcdscv')

  return (
    <>
      <h1 className='heading_top'>Add New Job</h1>
      <section className='jobPostPage'>
        <form>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Job Title:</label>
              <input type="text" name="jobTitle" />
            </div>
            <div className='input_parent'>
              <label>Job Category:</label>
              <select
                name="select"
                id=""
              // value={selectedOption}
              // onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" disabled>Select Job Category</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="Content Writer">Content Writer</option>
              </select>
            </div>
          </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Job Type:</label>
              <select
                name="select"
                id=""
              // value={selectedOption}
              // onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" disabled>Select Job Type</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
              </select>
            </div>
            <div className='input_parent'>
              <label>Experience Level</label>
              <select
                className='exp_lvl'
                name="select"
                id=""
              // value={selectedOption}
              // onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" disabled>Select Experience level</option>
                <option value="">Beginner</option>
                <option value="">Intermediate</option>
                <option value="">Expert</option>
              </select>
            </div>
          </div>

          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Salary Range (per annum)</label>
              <MultiRangeSlider
                min={0}
                max={500000}
                step={100}
                minValue={minSalary}
                maxValue={maxSalary}
                ruler={false}
                label={true}
                onInput={(e) => {
                  handleSliderInput(e);
                }}
              />
            </div>
            <div className='input_parent'>
              <label>Language Requirement</label>
              <div className='oneline_input'>
                <div className="language_selection">
                  <input
                    type="checkbox"
                    id="language1"
                    name="language"
                    value="English"
                    checked={languageSelected.includes("English")}
                    onChange={handleLanguageChange}
                  />
                  English
                </div>
                <div className="language_selection">
                  <input
                    type="checkbox"
                    id="language2"
                    name="language"
                    value="Spanish"
                    checked={languageSelected.includes("Spanish")}
                    onChange={handleLanguageChange}
                  />
                  Spanish
                </div>
                <div className="language_selection">
                  <input
                    type="checkbox"
                    id="language3"
                    name="language"
                    value="French"
                    checked={languageSelected.includes("French")}
                    onChange={handleLanguageChange}
                  />
                  French
                </div>
              </div>
              <div className="result">
                Selected languages: {languageSelected.join(", ")}
              </div>
            </div>
          </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Job Description</label>
              <textarea cols="4" rows="12" />
            </div>
          </div>


          <h2>Job Location Details</h2>
          <div className='input_parent'>
              <label className='google_autocomplete'>Search a location</label>
              <GooglePlacesAutocomplete />
            </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>City</label>
              <input type="text" />
            </div>
            <div className='input_parent'>
              <label>Provience</label>
              <input type="text" />
            </div>
            <div className='input_parent'>
              <label>Country</label>
              <input type="text" value='Canada' disabled/>
            </div>
          </div>
          <div className='submit_btn'>
            <input type="submit" value="Add Job Posting" />
          </div>
        </form>
      </section >
    </>
  )
}

export default AddNewJob