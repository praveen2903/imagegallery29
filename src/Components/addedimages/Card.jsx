import React from 'react';
import { Link } from 'react-router-dom';

function Card({ photoUrL, userphoto, name, title, description, address, onImageClick }) {
  const handleImageClick = () => {
    onImageClick(photoUrL);
  };

  return (
    <div className='custom-box-shadow h-full rounded-3xl xl:mx-4 p-1'>
      <div className="card w-96 bg-base-100 shadow-xl p-3">
        <figure>
          <img
            src={photoUrL}
            alt="/"
            className='h-[300px] w-[300px] cursor-pointer rounded-lg'
            onClick={handleImageClick}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title gap-4 font-normal font-mono">
            <img src={userphoto} alt='/' className='rounded-full w-10'/>
            {name}
          </h2>
          <p className='text-center font-semibold m-3 text-xl'>{title}</p>
          <p className='font-serif text-justify font-light'>{description}</p>
        </div>
        <div className="card-actions justify-end mb-3">
          <Link to={`/addedphotos/filter/${address}`} className="badge badge-outline rounded-full bg-[#38bdf8] text-white text-[15px] p-4 font-mono">{address}</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
