import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { IoClose } from "react-icons/io5";
import {toast} from 'react-toastify';
import {motion} from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css';
import { fadeIn } from '../../Variants';

const UpdateImage = () => {
  const { name } = useParams();
  const [record, setRecords] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate()
  const [image, setImage] = useState(null);

  const handleButton=()=>{
    navigate(`/profile/${name}`)
  }

  useEffect(() => {
    let unsub;
    const fetchData = async () => {
      try {
        const q = collection(db, 'userPhotos');
        unsub = onSnapshot(q, (querySnapshot) => {
          const imageList = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            imageList.push({ ...data, id });
          });
          setRecords(imageList);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      unsub && unsub();
    };
  }, []);
  const selectedRecord = record.find((rec) => rec.title === name);

  useEffect(() => {
    if (selectedRecord) {
      setTitle(selectedRecord.title || '');
      setDescription(selectedRecord.description || '');
      setImage(selectedRecord.imageUrL || '')
    }
  }, [selectedRecord]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (selectedRecord) {
      const recordId = selectedRecord.id;
      const userPhotosRef = doc(db, 'userPhotos', recordId);
      await updateDoc(userPhotosRef, {
        title: title,
        description: description,
        imageUrL: image,
      });
      toast.success("Updated successfully.")
      navigate(`/profile/${name}`)
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#52525b] bg-no-repeat bg-cover relative">
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center flex gap-52">
            <h2 className="mt-5 text-2xl font-bold text-gray-900">Update Image!</h2>
            <button onClick={handleButton} className='cursor-pointer text-end'><IoClose size={35} /></button>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleUpdate}>
            <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className='flex items-center justify-center'>
              <img src={image} alt='/' className='h-[200px] w-[200px] rounded-full'/>
            </motion.div>
            <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </motion.div>
            <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Description</label>
              <textarea
                  className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                />
            </motion.div>
            <motion.div variants={fadeIn("left",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}}>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Update
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
