import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { fadeIn } from '../Variants'
import { MdContactPage } from 'react-icons/md'

const HeroPage = () => {
  const [showMore, setShowMore] = useState(false); // Initialize the showMore state

  const toggleShowMore = () => {
    setShowMore(!showMore); 
  };
  return (
    <div>
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.jpg?s=612x612&w=0&k=20&c=sFn6FwTJR0TpX3rP_W4VHrbkTB__6l5kr-lkkqdYrtE=)'}}>
          <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className='absolute right-3 top-3 mt-5'>
            <Link to="/contact" className='bg-[#ea580c] text-xl text-white p-3 rounded-lg font-semibold font-mono flex gap-4 hover:bg-[#dc2626]'>Contact<MdContactPage size={25}/></Link>
          </motion.div>
            <div className="hero-overlay bg-opacity-60"></div>
            <motion.div variants={fadeIn("right",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                      Welcome to a visual feast that transcends boundaries and captures the essence of Favorite Images.
                      {showMore && (
                        <>
                          ❤️ Our curated collection of images takes you on a journey through describe the key elements or subjects featured. Each photograph is a unique story frozen in time, inviting you to explore the beauty, emotion, and diversity that Images has to offer.                         
                        </>
                      )} 
                    </p>
                    <button onClick={toggleShowMore} className='text-[#f59e0b] font-serif hover:bg-blue-gray-300 w-fit mx-auto p-1 rounded-lg mt-2 text-xl'>
                      {showMore ? 'Read Less' : 'Read More'}
                    </button>
                    <Link to="/login" className="bg-[#4f46e5] p-3 font-bold w-fit ml-10 rounded-xl hover:bg-[#3730a3] hover:text-black">Login</Link>
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default HeroPage