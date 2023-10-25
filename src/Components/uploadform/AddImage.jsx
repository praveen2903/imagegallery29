import React, { useState } from 'react'
import NavbarDefault from '../NavbarDefault'

function AddImage() {
  const [file,setFile]=useState(null)
  const [err,setErr]=useState(false)

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(file){
      
    }
    else{
      setFile(null)
    }
  }

  return (
    <div>
      <NavbarDefault/>
      <div className='text-center mt-10'>
        <form className='flex items-center flex-col'>
          <input type="file" accept="image/*" id="profile-photo" className="file-input file-input-bordered file-input-info w-full max-w-xs" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleSubmit} className='btn mt-10 bg-blue-600 text-white font-bold font-serif capitalize p-4 rounded-2xl gap-10'>Upload 🚀</button>
        </form>
        {file &&
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            {file && <img src={file} alt="Shoes" />}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes, whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
    
  )
}

export default AddImage