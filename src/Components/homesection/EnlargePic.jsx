import React from 'react';
import {CgCloseO} from 'react-icons/cg'
import {motion} from 'framer-motion'

const EnlargePic = ({ url, onClose }) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-90">
      <motion.div initial={{y:"-100vh"}} animate={{y:0}} className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-blue-800 text-2xl cursor-pointer hover:text-red-500"
        >
          <CgCloseO/>
        </button>
        <img src={url} alt='' className="h-[300px] w-[300px] md:h-[500px] md:w-[700px]" />
      </motion.div>
    </motion.div>
  );
};

export default EnlargePic;
