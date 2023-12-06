import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { fadeIn } from '../Variants'

const HeroPage = () => {
  return (
    <div>
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.jpg?s=612x612&w=0&k=20&c=sFn6FwTJR0TpX3rP_W4VHrbkTB__6l5kr-lkkqdYrtE=)'}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <motion.div variants={fadeIn("right",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Welcome to image gallery, View, contribute and enjoy the experience of image gallery..</p>
                    <Link to="/login" className="bg-[#4f46e5] p-3 font-bold">Login</Link>
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default HeroPage