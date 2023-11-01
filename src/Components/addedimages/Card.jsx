import React from 'react'

function Card({photoUrL,userphoto, name,title,description,address}) {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={photoUrL} alt="/" className='h-[200px] w-[200px]' /></figure>
        <div className="card-body">
          <h2 className="card-title gap-4">
            <img src={userphoto} alt='/' className='rounded-full w-10'/>
            {name}
          </h2>
          <p className='text-center font-semibold m-3'>{title}</p>
          <p>{description}</p>
          <div className="card-actions justify-end m-2">
            <div className="badge badge-outline rounded-full bg-[#38bdf8] p-3 font-mono">{address}</div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card