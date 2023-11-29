import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { motion } from 'framer-motion';
import EnlargePic from "../homesection/EnlargePic";
import { useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { fadeIn } from "../../Variants";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlinePublishedWithChanges } from "react-icons/md"
import { deleteObject, ref } from "firebase/storage";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

function AboutImage() {
  const [enlarged, setEnlarged] = useState(false);
  const [images, setImages] = useState([]);
  const { name }=useParams()
  const navigate=useNavigate();

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

  const handleDelete = async () => {
    try {
      const selectedRecord = images.find((image) => image.title === name);
      if (selectedRecord) {
        const recordId = selectedRecord.id;
        await deleteDoc(doc(db, 'userPhotos', recordId));
        const imageRef = ref(storage, `image/${selectedRecord.title}.uploadtype`);
        await deleteObject(imageRef);
        toast.success("Deleted successfully.")
        navigate(`/profile`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  

  const handleUpdate=()=>{
    navigate(`/profile/update/${name}`)
  }

  useEffect(() => {
      let unsub;
      const fetchData = async () => {
          try {
              const q = query(collection(db, 'userPhotos'));
              unsub = onSnapshot(q, (querySnapshot) => {
                  const imageList = [];
                  querySnapshot.forEach((doc) => {
                      const data = doc.data();
                      const id=doc.id;
                      imageList.push({...data,id});
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
            <div className="form-control text-white absolute right-20 top-24">
              <label className="swap swap-rotate">
                <input type="checkbox" onChange={handleToggle} checked={theme==="light"? false: true}/>
                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
              </label>
            </div>
            {images.map((image,index)=>{
              if(image.title===name){
                return (
                  <div className="flex flex-col sm:flex-row mt-1 sm:mt-14 w-full md:w-11/12" key={index}>
                    <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} onClick={toggleEnlargedView}>
                      <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} src={image.imageUrL} alt={image.title} className="custom-box-shadow h-[300px] w-[300px] md:h-[600px] md:w-[600px] sm:h-60 xl:h-96 rounded-3xl md:mx-4 p-1" />
                    </motion.div>
                    <motion.div variants={fadeIn("up",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="flex flex-col justify-center mt-5 ml-4 lg:ml-20">
                      <p className="text-2xl lg:text-4xl md:text-3xl tracking-wider text-[#ca8a04] font-bold capitalize p-3 font-serif">{image.title}</p>
                      <p className="mt-5 text-xl tracking-wider leading-snug font-mono font-semibold text-justify">
                        {image.description}
                      </p>
                      <div className="mt-10">
                        <span className="text-xl font-semibold font-serif">Uploaded By</span>
                      </div>
                      <motion.div variants={fadeIn("left",0.9)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className='flex gap-4 items-center justify-center'>
                        <img src={image.userphoto} alt='/' className='h-[50px] w-[50px] rounded-full'/>
                        <span className="text-xl font-bold mt-3">{image.name}</span>
                      </motion.div>

                      <motion.div variants={fadeIn("left",0.3)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.4}} className="flex items-center justify-center gap-8 mt-10 -mb-10 m-4">
                        <button onClick={handleUpdate} className="bg-[#ea580c] hover:bg-[#dc2626] rounded-lg p-3 font-mono font-semibold">
                          <div className="flex gap-2">
                            <span className="text-[18px]">Update</span>
                            <MdOutlinePublishedWithChanges size={25} />
                          </div>
                        </button>
                        <button onClick={handleDelete} className="bg-[#ea580c] hover:bg-[#dc2626] rounded-lg p-3 font-mono font-semibold">
                          <div className="flex gap-2">
                            <span className="text-[18px]">Delete</span>
                            <RiDeleteBinLine  size={25}/>
                          </div>
                        </button>
                      </motion.div>
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
