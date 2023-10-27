import React, { useState } from 'react'
import NavbarDefault from '../NavbarDefault'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { db, storage } from '../../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

function AddImage() {
  const [file,setFile]=useState(null)
  const [title,setTitle]=useState('')
  const [upload,setUpload]=useState(false)
  const [description,setDescription]=useState("")
  const [fileformat,setFileformat]=useState('uploadtype')
  const [progress,setProgress]=useState(0)
  const [err,setErr]=useState(false)
  const [url,setUrl]=useState('')
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpload(true)
    if (file) {
      const fileId = currentUser.uid;
      setFileformat(file.type.split('/')[1]);
      const storageRef = ref(storage, `image/${title}.${fileformat}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pro);
      },(err)=>{
        setErr(err)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setUrl(downloadURL)
          setProgress(100)
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
          <div className="card card-compact w-96 shadow-xl ml-10 bg-blue-400 m-6">
          <figure>
            <img src={url} alt="Shoes" className='h-[400px] w-[400px] p-5'/>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}{fileformat}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{currentUser?.displayName}</button>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
    
  )
}

export default AddImage