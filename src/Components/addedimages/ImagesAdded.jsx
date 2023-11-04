import React from 'react'
import NavbarDefault from '../NavbarDefault'
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Card from './Card';
import { Link } from 'react-router-dom';
import {AiOutlineArrowRight} from 'react-icons/ai'


const ImagesAdded = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub;
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'userPhotos'));
        unsub = onSnapshot(q, (querySnapshot) => {
          const imageList = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            imageList.push(data);
          });
          setImages(imageList);
          setLoading(false);
        });

        return unsub;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => {
      unsub()
    };
  }, []);
  // console.log(images)

  return (
    <div>
      <NavbarDefault/>
      {loading ? (
        <div className='flex items-center justify-center'>
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      ) : (
        <div>
          <div className='flex items-center justify-center text-3xl font-bold mb-10'>Uploaded Images</div>
          <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 mx-8 cursor-pointer'>
            {images.map((image, index) => (
              <Card key={index} photoUrL={image.imageUrL} name={image.name} userphoto={image.userphoto} title={image.title} description={image.description} address={image.contact}/>
            ))}
            <div className='flex items-center justify-center'>
                <Link to="/upload">
                    <button className='p-3 font-bold flex gap-2 text-xl rounded-full bg-gradient-to-r from-[#6d28d9] to-[#5961f9]'>Add image <AiOutlineArrowRight color='white' size={25}/></button>
                </Link>
            </div>  
          </div>
        </div>
        
      )}
    </div>
  );
}

export default ImagesAdded