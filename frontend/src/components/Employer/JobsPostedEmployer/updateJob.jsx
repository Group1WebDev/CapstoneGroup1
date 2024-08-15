import React, { useEffect, useState } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigate, useParams } from 'react-router-dom';
import CustomLoadFunction from '../../CustomLoader/customLoader';

function UpdatePreviousJob() {
  const [minSalary, set_minSalary] = useState(25);
  const [maxSalary, set_maxSalary] = useState(75);
  const [locationSelected, setLocationSelected] = useState(null);
  const [responseLoading, setResponseLoading] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();
  console.log('Job id', jobId);

  const [jobPostErrors, setJobPostErrors] = useState({});

  const jobPostValidations = () => {
    const errors = {};
    const regexCheck = /[^a-zA-Z\s]/;

    if (!formValues.jobTitle) {
      errors.jobTitle = 'Job title can not be empty';
    } else if (formValues.jobTitle.length < 4) {
      errors.jobTitle = 'Minimum 4 character are required for Job title';
    } else if (regexCheck.test(formValues.jobTitle)) {
      errors.jobTitle = 'Job title must be text only';
    } else if (formValues.jobTitle.length > 50) {
      errors.jobTitle = 'Job title must be less than 50 chars';
    }

    if (!formValues.jobCategory) {
      errors.jobCategory = 'Job category selection required';
    }

    if (!formValues.jobType) {
      errors.jobType = 'Job type selection required';
    }

    if (!formValues.experienceLevel) {
      errors.experienceLevel = 'Experience level selection required';
    }

    if (maxSalary < 10000) {
      errors.salary = 'Maximum salary selection should be more than 10000$';
    } else if (minSalary > maxSalary) {
      errors.salary = 'Min salary must be smaller than Max salary';
    }

    if (languageSelected.length === 0) {
      errors.languageSelection = 'Please select language required';
    }

    if (!formValues.jobDescription) {
      errors.jobDescription = 'Job description is required';
    } else if (formValues.jobDescription.length < 100) {
      errors.jobDescription = 'Job Description should be more than 100 chars';
    }


    if (!formValues.jobVacancies) {
      errors.jobVacancies = 'Please select Job Vacancies';
    } else if (formValues.jobVacancies < 1) {
      errors.jobVacancies = 'Job vacancies cannot be in minus or zero';
    }
    if (!exactLocation.addressLine1 || !exactLocation.city || !exactLocation.province || !exactLocation.country) {
      errors.location = 'Please select a valid location';
    }

    setJobPostErrors(errors);
    return Object.keys(errors).length === 0;
  }

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
    jobVacancies: '',
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
    const fetchViewJob = async () => {
      setResponseLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('no job data');
          alert('no data');
          setResponseLoading(false);
        }
        const data = await response.json();
        console.log(data,'sdjvs')
        setFormValues({
          jobTitle: data.jobTitle,
          jobCategory: data.jobCategory,
          jobType: data.jobType,
          experienceLevel: data.experienceLevel,
          jobDescription: data.jobDescription,
          jobVacancies: data.jobVacancies,
        });
        set_minSalary(data.minSalary);
        set_maxSalary(data.maxSalary);
        setlanguageSelected(data.languageRequirement);
        setExactLocation({
          addressLine1: data.addressLine,
          city: data.city,
          province: data.province,
          country: data.country,
        });
        setResponseLoading(false);
      } catch (error) {
        console.error('no job data', error);
        setResponseLoading(false);
      }
    };

    fetchViewJob();
  }, [jobId])



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
  let user = JSON.parse(sessionStorage.getItem('userInfo'))



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobPostValidations()) {
      setResponseLoading(true);
      const jobData = {
        ...formValues,
        minSalary,
        maxSalary,
        languageRequirement: languageSelected,
        addressLine: exactLocation.addressLine1,
        city: exactLocation.city,
        province: exactLocation.province,
        country: exactLocation.country,
        posted_by: user?.user.id
      };

      try {
        const response = await fetch(`http://localhost:5001/jobs/${jobId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobData),
        });

        if (!response.ok) {
          console.log('ERR 93');
          setResponseLoading(false);
        }

        const result = await response.json();
        console.log('posting updated:', result);
        navigate('/employer/dashboard');
        setResponseLoading(false);
      } catch (error) {
        console.error('err updating job posting:', error);
        alert('Error in updating job post. Please try again')
        setResponseLoading(false);
      }
    }

  };

  return (
    <>
      {responseLoading ? (
        <CustomLoadFunction />
      ) : (
        <div>
          <h1 className='heading_top'>Update Job</h1>
          <section className='jobPostPage'>
            <form onSubmit={handleSubmit}>
              <div className='oneline_input'>
                <div className='input_parent'>
                  <label>Job Title:</label>
                  <input type='text' name='jobTitle' value={formValues.jobTitle} onChange={handleChange} />
                  {jobPostErrors.jobTitle && <span className='error'>{jobPostErrors.jobTitle}</span>}
                </div>
                <div className='input_parent'>
                  <label>Job Category:</label>
                  <select name='jobCategory' value={formValues.jobCategory} onChange={handleChange}>
                    <option value='' disabled>
                      Select Job Category
                    </option>
                    <option value='technology'>Tech</option>
                    <option value='finance'>Finance</option>
                    <option value='marketing'>Marketing</option>
                    <option value='food'>Food</option>
                    <option value='construction'>Construction</option>
                    <option value='construction'>Other</option>
                  </select>
                  {jobPostErrors.jobCategory && <span className='error'>{jobPostErrors.jobCategory}</span>}
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
                  {jobPostErrors.jobType && <span className='error'>{jobPostErrors.jobType}</span>}
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
                  {jobPostErrors.experienceLevel && <span className='error'>{jobPostErrors.experienceLevel}</span>}
                </div>
              </div>
              <div className='oneline_input'>
                <div className='input_parent'>
                  <label>Salary Range (per annum)</label>
                  <MultiRangeSlider min={0} max={500000} step={100} minValue={minSalary} maxValue={maxSalary} ruler={false} label={true} onInput={handleSliderInput} />
                  {jobPostErrors.salary && <span className='error salaryError'>{jobPostErrors.salary}</span>}
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
                  {jobPostErrors.languageSelection && <span className='error'>{jobPostErrors.languageSelection}</span>}
                  <div className='result'>Selected languages: {languageSelected.join(', ')}</div>
                </div>
              </div>
              <div className='oneline_input'>
                <div className='input_parent'>
                  <label>Job Description</label>
                  <textarea cols='4' rows='12' name='jobDescription' value={formValues.jobDescription}
                    onChange={handleChange} />
                  {jobPostErrors.jobDescription && <span className='error'>{jobPostErrors.jobDescription}</span>}
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
                {jobPostErrors.location && <span className='error'>{jobPostErrors.location}</span>}
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
              <div>
                <div className='input_parent vacancies'>
                  <label>Total Vacancies</label>
                  <input type='number' name='jobVacancies' value={formValues.jobVacancies} onChange={handleChange} />
                  {jobPostErrors.jobVacancies && <span className='error'>{jobPostErrors.jobVacancies}</span>}
                </div>
              </div>
              <div className='submit_btn'>
                <input type='submit' value='Update Job Posting' />
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default UpdatePreviousJob;
