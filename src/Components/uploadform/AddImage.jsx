import React from 'react'
import NavbarDefault from '../NavbarDefault'

function AddImage() {
  return (
    <div>
      <NavbarDefault/>
      <div className='text-center mt-10'>
        <form className='flex items-center flex-col'>
          <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
          <button className='btn mt-10 bg-blue-600 text-white font-bold font-serif capitalize p-4 rounded-2xl gap-10'>Upload 🚀</button>
        </form>
      </div>
    </div>
    
  )
}

export default AddImage