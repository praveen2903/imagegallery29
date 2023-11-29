import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineHome } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { motion } from 'framer-motion';
import EnlargePic from "./EnlargePic";
import img from '../../assets/iron.jpeg'

function ImageCardDetails() {
  const [image, setImage] = useState([]);
  const [enlarged, setEnlarged] = useState(false);
  const { id } = useParams();
  // console.log(id)

  const [theme,setTheme]=useState(localStorage.getItem("theme")? localStorage.getItem("theme"):"light");
  const handleToggle=(e)=>{
      if(e.target.checked){
          setTheme("black");
      }
      else{
          setTheme("light");
      }
  }

  useEffect(()=>{
      localStorage.setItem("theme",theme)
      const localTheme=localStorage.getItem("theme");

      document.querySelector("html").setAttribute("data-theme",localTheme);
  },[theme])


  const fetchdatadetails=async ()=>{
    try {
      const response =await axios.get('https://api.slingacademy.com/v1/sample-data/photos?offset=0&limit=132');
      const data = response.data;
      const photosArray = data.photos.map((photo) => ({
          id:photo.id,
          url: photo.url,
          title: photo.title,
          description: photo.description,
      }));
      setImage(photosArray)
    } catch (error) {
      console.error('Error fetching data:', error);
    };
  }

  // console.log(image)

  useEffect(() => {
    fetchdatadetails()
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
        link.setAttribute('download', `${image.title}.jpeg`);
        document.body.appendChild(link);
        link.click();
      });
  }

  function toggleEnlargedView() {
    setEnlarged(!enlarged);
  }

  // console.log(image)

  const selectedImage = image.find((photo) => photo.id === parseInt(id));
  // console.log(selectedImage)

  return (
    <div className="p-12">
      <ScrollToTop smooth color='#f97316' width='35' height='25' />
      <div className="bg-gradient-to-r from-[#3c7fd0] to-[#3730a3] text-white py-10 px-2 lg:p-10 rounded-2xl">
        <Link to="/home" className="text-3xl float-left my-4 text-red-500 hover:underline">
          <AiOutlineHome />
        </Link>
          <div>
            <h1 className="text-center text-yellow-600 underline decoration-dashed my-6 mt-20 sm:my-14 text-3xl md:text-5xl">
              Details Page
            </h1>
            <div className="form-control text-white absolute right-20 top-24">
              <label className="swap swap-rotate">
                <input type="checkbox" onChange={handleToggle} checked={theme==="light"? false: true}/>
                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
              </label>
            </div>

            {selectedImage && (
                <div key={selectedImage.id} className="flex flex-col sm:flex-row mt-1 sm:mt-14 w-full md:w-11/12">
                    <div onClick={toggleEnlargedView}>
                      <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} src={selectedImage.url || img} alt={selectedImage.title} className="custom-box-shadow cursor-pointer sm:h-60 xl:h-96 rounded-3xl md:mx-4 p-1 md:h-[600px] md:w-[600px]" />
                    </div>
                    <div className="flex flex-col justify-center mt-5 md:ml-4 lg:ml-20">
                      <p className="text-2xl font-bold font-serif lg:text-4xl text-yellow-600 md:text-white md:text-3xl tracking-wider md:p-3">{selectedImage.title}</p>
                      <p className="mt-5 text-xl tracking-wider leading-snug font-mono font-semibold text-justify">
                        {selectedImage.description}
                      </p>
                      <div className="flex items-center justify-center">
                        <button onClick={handleDownload} className="w-1/2 rounded-lg px-4 py-3 mt-5 bg-blue-600 hover:bg-black">
                          Download Image
                        </button>
                      </div>
                    </div>
                </div>
              )}
            </div>
          </div>   
      {enlarged && <EnlargePic url={selectedImage.url} onClose={toggleEnlargedView} />}
    </div>
  );
}

export default ImageCardDetails;
