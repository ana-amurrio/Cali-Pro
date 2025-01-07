import React, { useState } from 'react';
import img from "../assets/car.png"; 
import { forwardRef } from "react";

const InterestForm = forwardRef((props, ref) => {
    //tracks input
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    year: '',
    make: '',
    model: '',
    body: '',
    service: '',
    message: '',
  });

  //checks error e.g client leaves empty items
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    city: '',
    year: '',
    model: '',
    body: '',
    service: '',
  });

  //check submittion
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; //destruct format into inputs
    setFormData((prevData) => ({ //copy everything and update info
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone) {
        newErrors.phone = 'Phone is required';
      } 
    if (!formData.city) {
        newErrors.city = 'City is required';
      }
    if (!formData.year ) {
        newErrors.year = 'Year of car is required';
      }else if (formData.year < 1950) {
        newErrors.year = 'Please enter a valid year';
      }
    if (!formData.make) {
        newErrors.make = 'Make of car is required';
      }
    if (!formData.model) {
        newErrors.model = 'Model of car is required';
      }
    if (!formData.body) {
        newErrors.body = 'Body of car is required';
      }
    if (!formData.service) {
        newErrors.service = 'Service type is required';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
  
      try {
        const response = await fetch('https://messaging-to-discord-3ff6062d6c6f.herokuapp.com/interest_form', {
          method: 'POST',  
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),  
        });
      
        if (response.status >= 200 && response.status < 300) {
          const result = await response.json();
          console.log('Form successfully submitted:', result);
      
          setFormSubmitted(true);
      
          setFormData({
            name: '',
            phone: '',
            city: '',
            year: '',
            make: '',
            model: '',
            body: '',
            service: '',
            message: '',
          });
        } else {
          const error = await response.json();
          console.error('Error submitting form:', error);
        }
      } catch (error) {
        console.error('Error communicating with backend:', error);
      }
      
    }
  };
  
/* 
use state to track inputs 
use state to check for errors
function to transfer input into states
function to validate info 
function to handle submittion and reset data
*/
  
  return (
    <div ref={ref} className="min-h-screen mb-20 text-white p-6 flex flex-col items-center justify-center rounded-lg shadow-[0px_0px_9px_2px_#7a6f76]">
      <h2 className="bg-neutral-900 mb-10 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">Interest Form</h2>
      <h3 className='text-lg font-medium mb-10'>Call Us: (628) 588-4266</h3>
      
      <div className="w-full lg:w-1/2 mt-6">
        <img
          src={img}
          alt="Car"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col w-full lg:w-1/2 mt-6 p-6">
        {formSubmitted ? (
          <div className="text-center text-purple-400">
            <h3 className="text-xl ">Thank you for your interest! We'll be in touch soon.</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-lg font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 "
                required
              />
              {/* this will only show if theres an error once I've clicked the submit btn */}
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            
            <div className="form-group">
              <label htmlFor="phone" className="block text-lg font-medium text-gray-300">Phone</label>
              <input
                type="tel"
                id="phone"
                placeholder="4151234567"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required/>
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="city" className="block text-lg font-medium text-gray-300">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 "
                required
              />
              {/* this will only show if theres an error once I've clicked the submit btn */}
              {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>

            <div>
                <label htmlFor="year" className='block text-lg font-medium text-gray-300'>Year of Your Vehicle</label>
                <input 
                type="number"
                id='year'
                name='year'
                value={formData.year}
                onChange={handleChange}
                className='w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2'
                required
                />
                {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
            </div>

            <div>
                <label htmlFor="make" className='block text-lg font-medium text-gray-300'>Make of Your Vehicle</label>
                <input 
                type="text" 
                id='make'
                name='make'
                value={formData.make}
                onChange={handleChange}
                className='w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2'
                required
                />
                {errors.make && <span className="text-red-500 text-sm">{errors.make}</span>}
            </div>

            <div>
                <label htmlFor="model" className='block text-lg font-medium text-gray-300'>Model of Your Vehicle</label>
                <input 
                type="text" 
                id='model'
                name='model'
                value={formData.model}
                onChange={handleChange}
                className='w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2'
                required
                />
                {errors.model && <span className="text-red-500 text-sm">{errors.model}</span>}
            </div>
            
            <div>
                <label htmlFor="body" className='block text-lg font-medium text-gray-300'>Body Type</label>
                <dl>(Sedan, Hatchback, Van, etc)</dl>
                <input 
                type="text" 
                id='body'
                name='body'
                value={formData.body}
                onChange={handleChange}
                className='w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2'
                required
                />
                {errors.body && <span className="text-red-500 text-sm">{errors.body}</span>}
            </div>

            <div>
                <label htmlFor="service" className='block text-lg font-medium text-gray-300'>Service Requested</label>
                <select  
                name='service' 
                value={formData.service || ""}
                onChange={handleChange} 
                className='w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2'>
                    <option>Choose an option</option>
                    <option value="windshield">Windshield Replacement</option>
                    <option value="door">Door Glass Replacement</option>
                    <option value="vent">Vent Glass Replacement</option>
                    <option value="quarter">Quarter Glass Replacement</option>
                    <option value="trunk">Trunk Glass Replacement</option>
                    <option value="other">Other</option>
                </select>
                {errors.service && <span className="text-red-500 text-sm">{errors.service}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="block text-lg font-medium text-gray-300">Message (optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
});

export default InterestForm;
