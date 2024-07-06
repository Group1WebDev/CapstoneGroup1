import React, { useState, useEffect } from 'react';
import './profilePage.css'
import { TagsInput } from "react-tag-input-component";
// reference : https://www.npmjs.com/package/react-tag-input-component
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import profileImage from '../../images/addProfile.png'
// image reference : https://undraw.co/search



export const AddProfileDetails = () => {
    const [skillSelected, setSkillSelected] = useState(['']);
    const [userLocation, setUserLocation] = useState(null);
    const [updatedAddress, setUpdatedAddress] = useState({
        addressLine: '',
    })

    useEffect(() => {
        if (userLocation && userLocation.label) {
            setUpdatedAddress({ addressLine: userLocation.label });
        }
    }, [userLocation])

    return (
        <>
            <section className='addProfileParent'>
                <div className="container">
                    <h1 className='p_heading'>Add Your Profile Information</h1>
                    <div className='flex_pContainer'>
                        <form action="" className=''>
                            <div className="form_groupArea">
                                <div className='input_div'>
                                    <label htmlFor="p_title">Your Designation:</label>
                                    <input type="text" id='p_title' />
                                </div>
                                <div className='input_div'>
                                    <label htmlFor="p_skills">Skills:</label>
                                    <TagsInput
                                        value={skillSelected}
                                        onChange={setSkillSelected}
                                        name="skills"
                                        placeHolder="Enter skill and press enter"
                                    />
                                </div>
                                <div className='input_div'>
                                    <label htmlFor="">Location Detail:</label>
                                    <GooglePlacesAutocomplete
                                        selectProps={{
                                            value: userLocation,
                                            onChange: setUserLocation,
                                        }}
                                        autocompletionRequest={{
                                            componentRestrictions: {
                                                country: ['us', 'ca'],
                                            }
                                        }}
                                    />
                                    <div className='input_parent'>
                                        <label htmlFor="">Your Location:</label>
                                        <span>{updatedAddress.addressLine}</span>
                                    </div>
                                </div>
                                <div className='input_div'>
                                    <label htmlFor="p_bio">Your Bio:</label>
                                    <textarea name="p_bio" id="p_bio"></textarea>
                                </div>
                                <div className='input_div'>
                                    <label htmlFor="p_select">Your Gender:</label>
                                    <select name="" id="">
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className='user_education'>
                                    <h1>Education Details</h1>
                                    <div className='input_div'>
                                        <label htmlFor="p_institute">Institution:</label>
                                        <input
                                            type="text"
                                            name="p_institute"
                                            id="p_institute" />
                                    </div>
                                    <div className='input_div'>
                                        <label htmlFor="p_studyField">Field of Study:</label>
                                        <input
                                            type="text"
                                            name="p_studyField"
                                            id="p_studyField" />
                                    </div>
                                    <div className='input_div'>
                                        <label htmlFor="p_completion">Completion Date:</label>
                                        <input
                                            type="date"
                                            name="p_completion"
                                            id="p_completion" />
                                    </div>
                                </div>

                                <div className='user_experience'>
                                    <h1>Experience Details</h1>
                                    <div className='input_div'>
                                        <label htmlFor="p_company">Company Name:</label>
                                        <input
                                            type="text"
                                            name="p_company"
                                            id="p_company" />
                                    </div>
                                    <div className='input_div'>
                                        <label htmlFor="p_designation">Designation:</label>
                                        <input
                                            type="text"
                                            name="p_designation"
                                            id="p_designation" />
                                    </div>

                                    <div className='input_div'>
                                        <label htmlFor="p_startdate">Start Date:</label>
                                        <input
                                            type="date"
                                            name="p_startdate"
                                            id="p_startdate" />
                                    </div>
                                    <div className='input_div'>
                                        <label htmlFor="p_enddate">End Date:</label>
                                        <input
                                            type="date"
                                            name="p_enddate"
                                            id="p_enddate" />
                                    </div>
                                </div>
                                <div className='submit_div'>
                                    <button type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </div>



                            <div className='profilePicDiv input_div'>
                                <label htmlFor="imagePicker">Choose Profile Picture</label>
                                <input
                                    type="file"
                                    id="imagePicker"
                                    accept=".png,.jpeg,.jpg" />
                            </div>
                        </form>

                        {/* <div className='image_div'>
                            <img src={profileImage} alt="Profile Page BG" />
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
