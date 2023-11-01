import React from 'react'
import NavbarDefault from '../NavbarDefault'
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Card from './Card';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ImagesAdded = () => {
  const {currentUser}=useContext(AuthContext)
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
          // console.log(imageList)
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

  // console.log(images[0].imageUrL)

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
            <Card key={index} photoUrL={image.imageUrL} name={image.name} userphoto={currentUser?.photoURL} title={image.title} description={image.description} address={currentUser?.email || currentUser?.phoneNumber}/>
            ))}
          </div>
        </div>
        
      )}
    </div>
  );
}

export default ImagesAdded