import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetchDataDetails from '../../utils/fetchDataDetails';
import axios from "axios";
import { AiOutlineHome } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { motion } from 'framer-motion';
import EnlargePic from "./EnlargePic";

function ImageCardDetails() {
  const [photo, setPhoto] = useState({});
  const [enlarged, setEnlarged] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchDataDetails(setPhoto, id);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [id]);

  function handleDownload() {
    axios({
      url: "https://source.unsplash.com/random/500x500",
      method: "GET",
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${photo.title}.jpeg`);
        document.body.appendChild(link);
        link.click();
      });
  }

  function toggleEnlargedView() {
    setEnlarged(!enlarged);
  }

  return (
    <div className="p-12">
      <ScrollToTop smooth color='#f97316' width='35' height='25' />
      <div className="bg-gradient-to-r from-[#3c7fd0] to-[#3730a3] text-white py-10 px-2 lg:p-10 rounded-2xl">
        <Link to="/home" className="text-3xl float-left my-4 text-red-500 hover:underline">
          <AiOutlineHome />
        </Link>
        {Object.keys(photo).length > 0 && (
          <div>
            <h1 className="text-center text-yellow-600 underline decoration-dashed my-6 mt-20 sm:my-14 text-3xl md:text-5xl">
              Details Page
            </h1>
            <div className="flex flex-col sm:flex-row mt-1 sm:mt-14 w-full md:w-11/12">
              <div onClick={toggleEnlargedView}>
                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} src={photo.url} alt={photo.title} className="custom-box-shadow cursor-pointer sm:h-60 xl:h-96 rounded-3xl md:mx-4 p-1 md:h-[600px] md:w-[600px]" />
              </div>
              <div className="flex flex-col justify-center mt-5 md:ml-4 lg:ml-20">
                <p className="text-2xl font-bold lg:text-4xl text-yellow-600 md:text-white md:text-3xl tracking-wider md:p-3">{photo.title}</p>
                <p className="mt-5 text-xl tracking-wider leading-snug font-semibold">
                  {photo.description}
                </p>
                <button onClick={handleDownload} className="px-4 py-3 mt-5 bg-blue-600 hover:bg-black rounded">
                  Download Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {enlarged && <EnlargePic url={photo.url} onClose={toggleEnlargedView} />}
    </div>
  );
}

export default ImageCardDetails;
