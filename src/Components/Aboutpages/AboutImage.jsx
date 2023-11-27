import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { motion } from 'framer-motion';
import EnlargePic from "../homesection/EnlargePic";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { fadeIn } from "../../Variants";

function AboutImage() {
  const [enlarged, setEnlarged] = useState(false);
  const [images, setImages] = useState([]);
  const { name }=useParams()

  useEffect(() => {
      let unsub;
      const fetchData = async () => {
          try {
              const q = query(collection(db, 'userPhotos'));
              unsub = onSnapshot(q, (querySnapshot) => {
                  const imageList = [];
                  querySnapshot.forEach((doc) => {
                      const data = doc.data();
                      imageList.push(data);
                  });
                  setImages(imageList);
              });

              return unsub;
          } catch (error) {
              console.error(error);
          }
      };
      fetchData();
      return () => {
          unsub();
      };
  }, []);

  function toggleEnlargedView() {
    setEnlarged(!enlarged);
  }

  return (
    <div className="p-12">
      <ScrollToTop smooth color='#f97316' width='35' height='25' />
      <div className="bg-gradient-to-r from-[#3c7fd0] to-[#3730a3] text-white py-10 px-2 lg:p-10 rounded-2xl">
        <Link to="/profile" className="text-3xl float-left my-4 text-red-500 hover:underline">
          <AiOutlineHome />
        </Link>
          <div>
            <h1 className="text-center text-yellow-600 underline decoration-dashed my-6 mt-20 sm:my-14 text-3xl md:text-5xl">
              Your Image
            </h1>
            {images.map((image,index)=>{
              if(image.title===name){
                return (
                  <div className="flex flex-col sm:flex-row mt-1 sm:mt-14 w-full md:w-11/12" key={index}>
                    <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} onClick={toggleEnlargedView}>
                      <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} src={image.imageUrL} alt={image.title} className="custom-box-shadow h-[300px] w-[300px] md:h-[600px] md:w-[600px] sm:h-60 xl:h-96 rounded-3xl md:mx-4 p-1" />
                    </motion.div>
                    <motion.div variants={fadeIn("up",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="flex flex-col justify-center mt-5 ml-4 lg:ml-20">
                      <p className="text-2xl lg:text-4xl md:text-3xl tracking-wider text-[#ca8a04] font-bold capitalize p-3 font-serif">{image.title}</p>
                      <p className="mt-5 text-xl tracking-wider leading-snug font-mono font-semibold">
                        {image.description}
                      </p>
                    </motion.div>
                    {enlarged && <EnlargePic url={image.imageUrL} onClose={toggleEnlargedView} />}
                  </div>
                )
              }
              return null 
            })}
          </div>
      </div>
      
    </div>
  );
}

export default AboutImage;
