import React from 'react'
import NavbarDefault from '../NavbarDefault'

function AddImage() {
  // const [file,setFile]=useState(null)
  // const [err,setErr]=useState(false)
  // const types=['image/png','image/jpg','image/jpeg']
  
  // const handleFileChange=(e)=>{
  //   const selected=e.target.files[0]
  //   if(selected && types.includes(selected.type)){
  //     setFile(selected)
  //   }
  //   else{
  //     setFile(null)
  //     alert("invalid file type")
      
  //   }
  // }

  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  // }

  return (
    <div>
      <NavbarDefault/>
      <div className='text-center mt-10'>
        {/* <form className='flex items-center flex-col'>
          <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" onChange={handleFileChange} />
          <button onClick={handleSubmit} className='btn mt-10 bg-blue-600 text-white font-bold font-serif capitalize p-4 rounded-2xl gap-10'>Upload 🚀</button>
          <div>
            {file && <div>{file.name}</div>}
          </div>
        </form> */}
      </div>
    </div>
    
  )
}

export default AddImage