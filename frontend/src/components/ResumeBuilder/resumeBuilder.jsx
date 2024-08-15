import React, { useState, useEffect } from 'react';
import './resumeBuilder.scss';
import './resumeStyle.scss';
import $ from 'jquery';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import ReactQuill from 'react-quill';
import moment from 'moment';

import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../useToken';

const ResumeBuilder = () => {
  const { token, userInfo } = useAuth();
  const { register, getValues, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      first_name: 'Prashant',
      last_name: 'Tanwar',
      job_title: 'Full Stack Developer',
      address: 'Kitchener, ON',
      phone: '6478860229',
      phone: '6478860229',
      email: 'prashanttanwar124@gmail.com',
      professional_summary: '<p>As a Full Stack Engineer, I build and maintain responsive websites for various clients across different sectors, using JavaScript, VueJS, ReactJS, Laravel, NodeJS, MongoDB, MySQL, UI/UX, Shopify, and Flutter. I have consistently received high user experience scores for every web development project.</p>',
      work_experience: [
        {
          position_title: 'Software Engineer',
          company_name: 'Brandshark',
          city: 'Bangalore',
          country: 'IN',
          start_date: '',
          end_date: '',
          work_summary: `<ul><li>Developed Lanceark, a robust keyword-tracking web application tailored for digital marketing agencies.</li><li>Designed to track client data and monitor content management systems efficiently.</li><li>Implemented accurate keyword tracking and analysis, empowering agencies to make informed, data-driven decisions.</li><li>Collaborated closely with team members to gather feedback and iteratively improve the application's functionality and user experience.</li><li>Allows automated social media posting, enhancing overall marketing efficiency and effectiveness.</li></ul>`,
        },
      ],
      education: [{ school_name: 'Atharva Institute of Information Technology', degree: 'B.S Computer Application', school_location: 'Mumbai, IN', start_date: '', end_date: '', description: '<ul><li> <b>Relevant Coursework:</b> Database, Application Development, Search Engine Optimization, Software Design and Development.</li></ul>' }],
      key_skills: '<ul><li>ReactJS, VueJs</li><li>UIKIT, Bootstrap, CSS, SASS</li><li>NodeJS, Express.js</li><li>PHP, Laravel, Java</li></ul>',
    },
  });
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: 'work_experience',
  });

  async function createAndOpenPDF() {
    try {
      var data = getValues();
      data.userId = userInfo.id;
      const response = await fetch('http://localhost:5001/create-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('err creating pdf');
      }
      window.open('http://localhost:5001/get-resume', '_blank');
    } catch (error) {
      console.error(error);
    }
  }

  const [openModalId, setOpenModalId] = useState(null);

  const openModal = (id) => {
    setOpenModalId(id);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  const handleQuillChange = (name, value) => {
    setValue(name, value);
  };

  const geminiApi = async (data) => {
    try {
      const response = await fetch('http://localhost:5001/gemini-res', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log('err in submitting');
      }

      const result = await response.json();
      var output = result.output.replace('```html', '');
      output = output.replace('```', '');
      handleQuillChange(data.push_output, output);
      setOpenModalId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const [infoCard, setInfoCard] = useState(1);

  useEffect(() => {
    if (infoCard > 1) {
      $('.backBtn').css('display', 'block');

      // $('.nextBtn').css('display', 'block');
    } else {
      $('.backBtn').css('display', 'none');
    }
    if (infoCard > 5) {
      $('.nextBtn').css('display', 'none');
    } else {
      $('.nextBtn').css('display', 'block');
    }
  });

  const changeCardNext = () => {
    const currentCardIndex = infoCard;
    var nextCard = 1;

    let checkValueIsValid = true;

    if (currentCardIndex === 1) {
      const requiredCard1Data = {
        first_name: getValues('first_name'),
        last_name: getValues('last_name'),
        job_title: getValues('job_title'),
        address: getValues('address'),
        phone: getValues('phone'),
        email: getValues('email'),
      };
      checkValueIsValid = Object.values(requiredCard1Data).every((field) => field);

      console.log(nextCard);
    } else if (currentCardIndex === 2) {
      const professionalSummary = getValues('professional_summary');
      checkValueIsValid = professionalSummary && professionalSummary.trim() !== '<p><br></p>';
    } else if (currentCardIndex === 3) {
      const workExperience = getValues('work_experience');
      checkValueIsValid = workExperience.every((experience) => experience.position_title && experience.company_name && experience.city && experience.country && experience.work_summary.trim() !== '<p><br></p>');
    } else if (currentCardIndex === 4) {
      const education = getValues('education');
      checkValueIsValid = education.every((education) => education.school_name && education.degree && education.school_location && education.description.trim() != '<p><br></p>');
    } else if (currentCardIndex === 5) {
      const keySkills = getValues('key_skills');
      checkValueIsValid = keySkills && keySkills.trim() !== '<p><br></p>';
    }

    if (!checkValueIsValid) {
      $('.errorMessage').css('display', 'block');
      return;
    } else {
      $('.errorMessage').css('display', 'none');
    }

    setInfoCard((prevInfoCard) => {
      const nextCard = prevInfoCard + 1;

      $(`.card`).addClass('d-none');
      $(`.card_${nextCard}`).removeClass('d-none');

      return nextCard;
    });
  };

  const changeCardBack = () => {
    setInfoCard((prevInfoCard) => {
      const backCard = prevInfoCard - 1;
      if (backCard < 1) {
        return prevInfoCard;
      }
      $('.card').addClass('d-none');
      $(`.card_${backCard}`).removeClass('d-none');

      return backCard;
    });
  };

  return (
    <div id='main'>
      <div className='editor d-flex-justify-center'>
        <div className='container'>
          <div className='top-btns'>
            <div className='back'>
              <button className='btn btn-default backBtn d-none' onClick={changeCardBack}>
                Back
              </button>
            </div>
            <div className='next'>
              <button className='btn btn-primary nextBtn' onClick={changeCardNext}>
                Next
              </button>
            </div>
          </div>
          <div className='card card_1'>
            <div className='title'>
              <h1>Personal Details</h1>
              <p>Start by providing your name and contact details.</p>
            </div>
            <div className='row'>
              <div className='col col-6'>
                <div className='form-group'>
                  <label>First Name*</label>
                  <input type='text' {...register('first_name')} name='first_name' />
                </div>
              </div>
              <div className='col col-6'>
                <div className='form-group'>
                  <label>Last Name*</label>
                  <input type='text' {...register('last_name')} name='last_name' />
                </div>
              </div>
              <div className='col col-6'>
                <div className='form-group'>
                  <label>Job Title*</label>
                  <input type='text' {...register('job_title')} name='job_title' />
                </div>
              </div>
              <div className='col col-6'>
                <div className='form-group'>
                  <label>Address*</label>
                  <input type='text' {...register('address')} name='address' />
                </div>
              </div>

              <div className='col col-6'>
                <div className='form-group'>
                  <label>Phone*</label>
                  <input type='text' {...register('phone')} name='phone' />
                </div>
              </div>
              <div className='col col-6'>
                <div className='form-group'>
                  <label>Email*</label>
                  <input type='email' {...register('email')} name='email' />
                </div>
              </div>
              <div className='col col-12 errorMessage'>Please fill in all required fields before submitting.</div>
            </div>
          </div>
          <div className='card card_2 d-none'>
            <div className='title'>
              <h1>Professional Summary</h1>
              <p>Describe yourself and tell us about your background.</p>
            </div>
            <div className='row'>
              <div className='col col-12'>
                <div className='form-group'>
                  <label>
                    Professional Summary* <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faCircleInfo} onClick={() => openModal('professional_summary')} />
                  </label>

                  <Modal isOpen={openModalId === 'professional_summary'} onRequestClose={closeModal}>
                    <div className='form-group'>
                      <label>Professional Summary</label>
                      <textarea {...register(`professional_summary_gemini`)} name={`professional_summary_gemini`} style={{ width: '100%' }} rows='6' placeholder='Write your key responsibilities, achievements, and skills.'></textarea>
                      <button
                        className='btn btn-primary btn-small'
                        onClick={() =>
                          geminiApi({
                            prompt: watch().professional_summary_gemini,
                            type: 'professional_summary',
                            push_output: `professional_summary`,
                          })
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </Modal>

                  <Controller name='professional_summary' control={control} render={({ field }) => <ReactQuill {...field} theme='snow' onChange={(value) => handleQuillChange('professional_summary', value)} />} />

                  {/* <textarea rows={5} {...register('professional_summary')} name='professional_summary' /> */}
                </div>
              </div>
              <div className='col col-12 errorMessage'>Please fill in all required fields before submitting.</div>
            </div>
          </div>
          <div className='card card_3 d-none'>
            <div className='title'>
              <h1>Professional Experience</h1>
              <p>Tell us about your most recent job.</p>
            </div>

            <div className='scroll-content'>
              {workFields.map((item, index) => {
                return (
                  <div className='row card-line'>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>Position Title*</label>
                        <input type='text' {...register(`work_experience.${index}.position_title`)} name={`work_experience.${index}.position_title`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>Company Name*</label>
                        <input type='text' {...register(`work_experience.${index}.company_name`)} name={`work_experience.${index}.company_name`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>City*</label>
                        <input type='text' {...register(`work_experience.${index}.city`)} name={`work_experience.${index}.city`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>Country*</label>
                        <input type='text' {...register(`work_experience.${index}.country`)} name={`work_experience.${index}.country`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>Start Date</label>
                        <input type='date' {...register(`work_experience.${index}.start_date`)} name={`work_experience.${index}.start_date`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>End Date</label>
                        <input type='date' {...register(`work_experience.${index}.end_date`)} name={`work_experience.${index}.end_date`} />
                      </div>
                    </div>
                    <div className='col col-12'>
                      <div className='form-group'>
                        <label>
                          Work Summary* <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faCircleInfo} onClick={() => openModal(index + 'workSummary')} />
                        </label>

                        <Modal isOpen={openModalId === index + 'workSummary'} onRequestClose={closeModal}>
                          <div className='form-group'>
                            <label>Work summary {`${watch().work_experience[index].position_title && 'for ' + watch().work_experience[index].position_title}`}</label>
                            <textarea {...register(`work_experience.${index}.work_summary_gemini`)} name={`work_experience.${index}.work_summary_gemini`} style={{ width: '100%' }} rows='6' placeholder='Write your key responsibilities, achievements, and skills.'></textarea>
                            <button
                              className='btn btn-primary btn-small'
                              onClick={() =>
                                geminiApi({
                                  prompt: watch().work_experience[index].work_summary_gemini,
                                  type: 'work_summary',
                                  title: watch().work_experience[index].position_title,
                                  push_output: `work_experience.${index}.work_summary`,
                                })
                              }
                            >
                              Submit
                            </button>
                          </div>
                        </Modal>

                        <Controller name={`work_experience.${index}.work_summary`} control={control} render={({ field }) => <ReactQuill {...field} theme='snow' onChange={(value) => handleQuillChange(`work_experience.${index}.work_summary`, value)} />} />

                        {/* <textarea rows={5} {...register(`work_experience.${index}.work_summary`)} name='work_summary' /> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='col col-12 errorMessage' style={{ marginTop: '16px' }}>
              Please fill in all required fields before submitting.
            </div>

            <div
              style={{ marginTop: '16px' }}
              className='btn-text'
              onClick={() => {
                appendWork();
              }}
            >
              Add more work experience
            </div>
          </div>
          <div className='card card_4 d-none'>
            <div className='title'>
              <h1>Education</h1>
              <p>Include your most recent educational experience, including any courses you are enrolled in.</p>
            </div>

            <div className='scroll-content'>
              {educationFields.map((item, index) => {
                return (
                  <div className='row card-line'>
                    <div className='col col-12'>
                      <div className='form-group'>
                        <label>School Name*</label>
                        <input type='text' {...register(`education.${index}.school_name`)} name={`education.${index}.school_name`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>Degree*</label>
                        <input type='text' {...register(`education.${index}.degree`)} name={`education.${index}.degree`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>School Location*</label>
                        <input type='text' {...register(`education.${index}.school_location`)} name={`education.${index}.school_location`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>Start Date</label>
                        <input type='date' {...register(`education.${index}.start_date`)} name={`education.${index}.start_date`} />
                      </div>
                    </div>
                    <div className='col col-6'>
                      <div className='form-group'>
                        <label>End Date</label>
                        <input type='date' {...register(`education.${index}.end_date`)} name={`education.${index}.end_date`} />
                      </div>
                    </div>
                    <div className='col col-12'>
                      <div className='form-group'>
                        <label>Description*</label>

                        <Controller name={`education.${index}.description`} control={control} render={({ field }) => <ReactQuill {...field} theme='snow' onChange={(value) => setValue(`education.${index}.description`, value)} />} />

                        {/* <textarea rows={5} {...register(`work_experience.${index}.work_summary`)} name='work_summary' /> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='col col-12 errorMessage' style={{ marginTop: '16px' }}>
              Please fill in all required fields before submitting.
            </div>

            <div
              style={{ marginTop: '16px' }}
              className='btn-text'
              onClick={() => {
                appendEducation();
              }}
            >
              Add more work education
            </div>
          </div>
          <div className='card card_5 d-none'>
            <div className='title'>
              <h1>Key Skills</h1>
              <p>Add relevant professional key skills and proficiencies.</p>
            </div>

            <div className='row'>
              <div className='col col-12'>
                <div className='form-group'>
                  <label>
                    Key Skills* <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faCircleInfo} onClick={() => openModal('key_skills')} />
                  </label>

                  <Modal isOpen={openModalId === 'key_skills'} onRequestClose={closeModal}>
                    <div className='form-group'>
                      <label>Key Skills</label>
                      <textarea {...register(`key_skills_gemini`)} name={`key_skills_gemini`} style={{ width: '100%' }} rows='6' placeholder='Write your key responsibilities, achievements, and skills.'></textarea>
                      <button
                        className='btn btn-primary btn-small'
                        onClick={() =>
                          geminiApi({
                            prompt: watch().key_skills_gemini,
                            type: 'key_skills',
                            push_output: `key_skills`,
                          })
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </Modal>

                  <Controller name='key_skills' control={control} render={({ field }) => <ReactQuill {...field} theme='snow' onChange={(value) => handleQuillChange('key_skills', value)} />} />
                </div>
              </div>
              <div className='col col-12 errorMessage'>Please fill in all required fields before submitting.</div>
            </div>
          </div>
          <div className='card card_6 d-none'>
            <div className='title'>
              <h1>Final Step</h1>
              <p>You are almost there! Download your completed resume to get started on your next opportunity.</p>
            </div>

            <div className='row'>
              <div className='col col-12'>
                <button className='btn btn-primary downloadBtn' onClick={createAndOpenPDF}>
                  Download Your Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='output d-flex-justify-center'>
        <div className='print-page'>
          <div className='head'>
            <div className='full_name'>
              {watch().first_name} {watch().last_name}
            </div>
            <div className='job_title'>{watch().job_title}</div>
            <div className='basic_info_line'>
              {watch().address}
              {watch().phone && ' | ' + watch().phone} {watch().email && ' | ' + watch().email}
            </div>
          </div>
          <div className='professional_summary'>{watch().professional_summary && Parser(watch().professional_summary)}</div>
          <div className='work_experience section'>
            <div className='section_title'>WORK EXPERIENCE</div>
            {watch().work_experience?.map((data, index) => (
              <div className='section-loop' key={index}>
                <div className='dateAndInfo'>
                  <div>{Parser(`<b>${data.position_title} - ${data.company_name}</b>, ${data.city}, ${data.country}`)}</div>
                  <div>
                    {data.start_date && moment(data.start_date).format('ll')} {data.end_date && ' - '} {data.end_date && moment(data.end_date).format('ll')}
                  </div>
                </div>
                <div>{data.work_summary && Parser(data.work_summary)}</div>
              </div>
            ))}
          </div>
          <div className='education section'>
            <div className='section_title'>Education</div>
            {watch().education?.map((data, index) => (
              <div className='section-loop' key={index}>
                <div className='dateAndInfo'>
                  <div>{Parser(`<b>${data.school_name}, ${data.degree}</b> | ${data.school_location}`)}</div>
                  <div>
                    {data.start_date && moment(data.start_date).format('ll')} {data.end_date && ' - '} {data.end_date && moment(data.end_date).format('ll')}
                  </div>
                </div>

                <div>{data.description && Parser(data.description)}</div>
              </div>
            ))}
          </div>
          <div className='skills section'>
            <div className='section_title'>Key Skills</div>
            <div className='section-loop'>
              <div>{watch().key_skills && Parser(watch().key_skills)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
