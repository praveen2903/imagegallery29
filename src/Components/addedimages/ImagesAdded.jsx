import React, { useState, useEffect } from 'react';
import NavbarDefault from '../NavbarDefault';
import Card from './Card';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

function ImagesAdded(collectionName ) {
  const [docs, setDocs] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy('createAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const name = doc.data().name;
            images.push(name);
          });
          setDocs(images);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData(); 
    return () => {
    };
  }, [collectionName]);

  return (
    <div>
      <NavbarDefault />
      <Card/>
      <div>
        <h2>Images Data</h2>
        <ul>
          {docs.map((image, index) => (
            <li key={index}>{image}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImagesAdded;
