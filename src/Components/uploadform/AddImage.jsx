import React, { useState } from 'react'
import NavbarDefault from '../NavbarDefault'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { db, storage } from '../../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import photo from '../../assets/photo.jpg'
import { Link } from 'react-router-dom'

function AddImage() {
  const [file,setFile]=useState(null)
  const [title,setTitle]=useState('')
  const [upload,setUpload]=useState(false)
  const [description,setDescription]=useState('')
  const [fileformat,setFileformat]=useState('uploadtype')
  const [progress,setProgress]=useState(0)
  const [err,setErr]=useState(false)
  const [url,setUrl]=useState('')
  const { currentUser } = useContext(AuthContext);
  const [imagetitle,setImageTitle]=useState('')
  const [imagedescription,setImageDescription]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpload(true)
    if (file) {
      const fileId = currentUser?.uid;
      setFileformat(file.type.split('/')[1]);
      const storageRef = ref(storage, `image/${title}.${fileformat}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pro);
      },(err)=>{
        setErr(err)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
          setUrl(downloadURL)
          setImageDescription(description)
          setImageTitle(title)
          setProgress(100)
          toast.success("Photo added succesfully");

          await addDoc(collection(db,"userPhotos"),{
            uid:fileId,
            imageUrL:downloadURL,
            createdAt:new Date(),
            contact:currentUser?.email || currentUser?.phoneNumber,
            name:currentUser?.displayName,
            title:title,
            description,
            username:currentUser?.displayName,
            userphoto:currentUser?.photoURL||photo,
          })
        })
      });

    } else {
      setFile(null);
    }
  };

  return (
    <div>
      <NavbarDefault/>
      <div className='text-center mt-10'>
        <form className='flex items-center flex-col gap-10'>
          <div className='flex gap-5'>
            <label className='font-bold'>Image Title</label>
            <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='flex gap-5'>
            <label className='font-bold'>Image Description</label>
            <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <input type="file" accept="image/*" id="profile-photo" className="file-input file-input-bordered file-input-info w-full max-w-xs" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleSubmit} className='btn mt-5 bg-blue-600 hover:bg-blue-800 text-white font-bold font-serif capitalize p-4 rounded-2xl gap-10'>Upload 🚀</button>
        </form>
        
        {progress > 0 && progress < 100 && (
          <progress className="progress progress-error w-56" value={progress} max="100"></progress>
        )}        
        {upload && progress === 100  &&
          <div>
            <Card className="w-full max-w-[48rem] flex-row p-4 mt-10 bg-blue-400 mt">
              <CardHeader
                shadow={true}
                floated={true}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
              >
                <img
                  src={url}
                  alt="/not found"
                  className="object-cover h-[400px] w-[400px]"
                />
              </CardHeader>
              <CardBody className="px-4 gap-10 w-3/5">
                <Typography variant="h6" color="white" className="mb-4 uppercase flex gap-10">
                  <span>User Name-- </span>{currentUser?.displayName}
                </Typography>
                <Typography variant="h6" color="white" className="mb-4 flex gap-10">
                  <span className='uppercase'>User email-- </span>{currentUser?.email}
                </Typography>

                <Typography variant="h4" color="black" className="mb-2 uppercase mt-10">
                  <span>Image Title: </span>{imagetitle}
                </Typography>
                <Typography color="black" className="mb-8 font-normal mt-10">
                  {imagedescription}
                </Typography>
                <Link to="/addedphotos/:index" className="inline-block">
                  <Button variant="text" className="flex items-center gap-2">
                    View More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </CardBody>
            </Card> 
          </div>
        }
        {err && <span>some thing went wrong</span>}
        </div>
      </div>
    
  )
}

export default AddImage