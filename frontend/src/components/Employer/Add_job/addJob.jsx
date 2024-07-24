import React, { useEffect, useState } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom';

function AddNewJob() {
  const [minSalary, set_minSalary] = useState(25);
  const [maxSalary, set_maxSalary] = useState(75);
  const [locationSelected, setLocationSelected] = useState(null);
  const navigate = useNavigate();

  const [exactLocation, setExactLocation] = useState({
    addressLine1: '',
    city: '',
    province: '',
    country: '',
  });
  const [languageSelected, setlanguageSelected] = useState([]);
  const [formValues, setFormValues] = useState({
    jobTitle: '',
    jobCategory: '',
    jobType: '',
    experienceLevel: '',
    jobDescription: '',
  });

  const handleSliderInput = (e) => {
    set_minSalary(e.minValue);
    set_maxSalary(e.maxValue);
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setlanguageSelected([...languageSelected, value]);
    } else {
      setlanguageSelected(languageSelected.filter((lang) => lang !== value));
    }
  };

  useEffect(() => {
    if (locationSelected && locationSelected.value && locationSelected.value.terms) {
      const locationValues = locationSelected.value.terms;
      if (locationValues.length === 4) {
        setExactLocation({
          addressLine1: '',
          city: locationValues[0] ? locationValues[0].value : '',
          province: locationValues[1] ? locationValues[1].value : '',
          country: locationValues[2] ? locationValues[2].value : '',
        });
      } else if (locationValues.length === 5) {
        setExactLocation({
          addressLine1: `${locationValues[0] ? locationValues[0].value : ''} ${locationValues[1] ? locationValues[1].value : ''}`,
          city: locationValues[2] ? locationValues[2].value : '',
          province: locationValues[3] ? locationValues[3].value : '',
          country: locationValues[4] ? locationValues[4].value : '',
        });
      }
    }
  }, [locationSelected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      ...formValues,
      minSalary,
      maxSalary,
      languageRequirement: languageSelected,
      addressLine: exactLocation.addressLine1,
      city: exactLocation.city,
      province: exactLocation.province,
      country: exactLocation.country,
    };

    try {
      const response = await fetch('http://localhost:5001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        console.log('ERR 93');
      }

      const result = await response.json();
      console.log('posting created:', result);
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('err creating job posting:', error);
    }
  };

  return (
    <>
      <h1 className='heading_top'>Add New Job</h1>
      <section className='jobPostPage'>
        <form onSubmit={handleSubmit}>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Job Title:</label>
              <input type='text' name='jobTitle' value={formValues.jobTitle} onChange={handleChange} />
            </div>
            <div className='input_parent'>
              <label>Job Category:</label>
              <select name='jobCategory' value={formValues.jobCategory} onChange={handleChange}>
                <option value='' disabled>
                  Select Job Category
                </option>
                <option value='Web Developer'>Web Developer</option>
                <option value='Web Designer'>Web Designer</option>
                <option value='Content Writer'>Content Writer</option>
              </select>
            </div>
          </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Job Type:</label>
              <select name='jobType' value={formValues.jobType} onChange={handleChange}>
                <option value='' disabled>
                  Select Job Type
                </option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Full-Time'>Full-Time</option>
              </select>
            </div>
            <div className='input_parent'>
              <label>Experience Level</label>
              <select name='experienceLevel' value={formValues.experienceLevel} onChange={handleChange}>
                <option value='' disabled>
                  Select Experience level
                </option>
                <option value='Beginner'>Beginner</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Expert'>Expert</option>
              </select>
            </div>
          </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Salary Range (per annum)</label>
              <MultiRangeSlider min={0} max={500000} step={100} minValue={minSalary} maxValue={maxSalary} ruler={false} label={true} onInput={handleSliderInput} />
            </div>
            <div className='input_parent'>
              <label>Language Requirement</label>
              <div className='oneline_input'>
                <div className='language_selection'>
                  <input type='checkbox' id='language1' name='language' value='English' checked={languageSelected.includes('English')} onChange={handleLanguageChange} />
                  English
                </div>
                <div className='language_selection'>
                  <input type='checkbox' id='language2' name='language' value='Spanish' checked={languageSelected.includes('Spanish')} onChange={handleLanguageChange} />
                  Spanish
                </div>
                <div className='language_selection'>
                  <input type='checkbox' id='language3' name='language' value='French' checked={languageSelected.includes('French')} onChange={handleLanguageChange} />
                  French
                </div>
              </div>
              <div className='result'>Selected languages: {languageSelected.join(', ')}</div>
            </div>
          </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Job Description</label>
              <textarea cols='4' rows='12' name='jobDescription' value={formValues.jobDescription} onChange={handleChange} />
            </div>
          </div>
          <h2>Job Location Details</h2>
          <div className='input_parent'>
            <label className='google_autocomplete'>Search a location</label>
            <GooglePlacesAutocomplete
              selectProps={{
                value: locationSelected,
                onChange: setLocationSelected,
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['us', 'ca'],
                },
              }}
            />
          </div>
          <div className='oneline_input'>
            <div className='input_parent'>
              <label>Address Line</label>
              <input type='text' value={exactLocation.addressLine1} readOnly />
            </div>
            <div className='input_parent'>
              <label>City</label>
              <input type='text' value={exactLocation.city} readOnly />
            </div>
            <div className='input_parent'>
              <label>Province</label>
              <input type='text' value={exactLocation.province} readOnly />
            </div>
            <div className='input_parent'>
              <label>Country</label>
              <input type='text' value={exactLocation.country} readOnly />
            </div>
          </div>
          <div className='submit_btn'>
            <input type='submit' value='Add Job Posting' />
          </div>
        </form>
      </section>
    </>
  );
}

export default AddNewJob;
