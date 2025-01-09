import React from 'react'
import { testimonials } from '../constants';
import google from "../assets/google.png";
import { forwardRef } from "react";

const Testimonials = forwardRef((props, ref) => {
  return (
    // letter spacing wide
    <div ref={ref} className='mt-10 tracking-wide'>
      <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-30'>What people are saying</h2>
      {/* testimonials */}
      <div className='flex flex-wrap justify-center mb-20'>
        {testimonials.map((testimonial, index) => (
            <div key={index} className='w-full sm:w-1/2 lg:w-1/2 px-4 py-2'>
                {/* container outline */}
                <div className='bg-neutral rounded-md p-6 text-md border border-neutral-800 font-thin '>
                    <p>{testimonial.text}</p>
                    <div className='flex mt-8 items-start'>
                        <img className='w-10 h-10  '
                        src ={google}
                        />
                        <div className='mt-2'>{testimonial.user}</div>
                    </div>
                    

                </div>
            </div>
        ))}
      </div>
    </div>
  );
});

export default Testimonials