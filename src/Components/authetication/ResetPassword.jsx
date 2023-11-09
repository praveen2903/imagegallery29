import React from 'react'
import img from '../../assets/reset.png'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineArrowBack } from 'react-icons/md'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

function ResetPassword() {
  const navigate=useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const emailvalue=e.target.email.value;
    sendPasswordResetEmail(auth,emailvalue).then(data=>{
      toast.success(`check your email :- ${emailvalue}`)
      navigate('/')
    }).catch(err=>{
      alert(err.code)
    })

  }

  return (
    <div className="hero min-h-screen bg-base-200" style={{backgroundImage:`url(${img})`}}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold font-serif text-[#2563eb]">Register now!</h1>
          <p className="py-6 font-mono text-[#22d3ee]">Our collection is a showcase of creativity, and we're excited to have you join us. To access the gallery, please log in with your credentials or register if you're new here.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-75">
          <Link to="/" className='text-3xl float-left my-4 text-black flex gap-3'>
            <MdOutlineArrowBack size={20}/>
            <span className='text-sm'>Cancel</span>
          </Link>
          <form className="card-body" onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-control">
                <label className="label">
                <span className="label-text text-black">Enter new password</span>
                </label>
                <input type="email" name="email" placeholder="Enter your email ...." className="input input-bordered bg-white text-black bg-opacity-75" required />
            </div>
            <div className="form-control mt-8">
                <button className="btn btn-primary rounded-3xl bg-blue-500 hover:bg-blue-700 text-white uppercase">Reset Password</button>
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword