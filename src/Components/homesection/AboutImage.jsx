import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { motion } from 'framer-motion';
import EnlargePic from "./EnlargePic";

function AboutImage({image,title,description}) {
  const [enlarged, setEnlarged] = useState(false);
  function toggleEnlargedView() {
    setEnlarged(!enlarged);
  }

  return (
    <div className="p-12">
      <ScrollToTop smooth color='#f97316' width='35' height='25' />
      <div className="bg-gradient-to-r from-[#3c7fd0] to-[#3730a3] text-white py-10 px-2 lg:p-10 rounded-2xl">
        <Link to="/about" className="text-3xl float-left my-4 text-red-500 hover:underline">
          <AiOutlineHome />
        </Link>
          <div>
            <h1 className="text-center text-yellow-600 underline decoration-dashed my-6 mt-20 sm:my-14 text-3xl md:text-5xl">
              Your Image
            </h1>
            <div className="flex flex-col sm:flex-row mt-1 sm:mt-14 w-full md:w-11/12">
              <div onClick={toggleEnlargedView}>
                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} src={image} alt={title} className="custom-box-shadow sm:h-60 xl:h-96 rounded-3xl mx-4 p-1" />
              </div>
              <div className="flex flex-col justify-center mt-5 ml-4 lg:ml-20">
                <p className="text-2xl  lg:text-4xl md:text-3xl tracking-wider p-3">{title}</p>
                <p className="mt-5 text-xl tracking-wider leading-snug font-semibold">
                  {description}
                </p>
              </div>
            </div>
          </div>
      </div>
      {enlarged && <EnlargePic url={image} onClose={toggleEnlargedView} />}
    </div>
  );
}

export default AboutImage;
