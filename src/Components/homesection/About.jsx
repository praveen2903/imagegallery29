import React, { useEffect, useState } from 'react';
import NavbarDefault from '../NavbarDefault';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {AiOutlineArrowRight} from 'react-icons/ai'
import photo from '../../assets/photo.jpg'
import ContactCard from './ContactCard';

const About = () => {
    const { currentUser } = useContext(AuthContext);
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

    return (
        <div>
            <NavbarDefault />
            <div className='flex items-center justify-center'>
                <p className='text-3xl font-bold'>Contact Info</p>
            </div>
            <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-3'>
                <div className='bg-gradient-to-r from-[#dbcdda] to-[#5961f9] rounded-xl rounded-br-80px md:p-9 px-4 py-9'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
                        <div>
                            <img src={currentUser?.photoURL || photo} alt='img' className='lg:h-[400px] lg:w-[400px] rounded-full' />
                        </div>
                        <div className='md:w-3/5 '>
                            <h2 className='md:text-4xl text-xl font-semibold text-[#09090b] mb-6 leading-relaxed'>{currentUser?.email || currentUser?.phoneNumber}</h2>
                            <p className='text-[#fbbf24] font-bold font-serif text-2xl'>
                                {currentUser?.displayName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-center'>
                    <p className='text-3xl font-bold'>Your Uploads</p>
                </div>
                <div>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <span className="loading loading-spinner loading-lg text-info"></span>
                        </div>
                    ) : (
                        <div className='m-2'>
                            {images.map((image, index) => {
                            if(currentUser?.email===image.contact){
                                return (
                                    <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 mx-10 cursor-pointer'>
                                        <div key={index} className="group relative hover:scale-110 ease-out duration-300">
                                            <img src={image.imageUrL} alt={image.title} className="rounded-3xl h-[100px] w-[100px] md:h-[400px] md:w-[400px]" />
                                            
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-center">
                                                <h3 className="text-2xl font-medium mb-2">{image.title}</h3>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <Link to="/upload">
                                                <button className='p-3 font-bold flex gap-2 text-xl rounded-full bg-gradient-to-r from-[#6d28d9] to-[#5961f9]'>Add image <AiOutlineArrowRight color='white' size={25}/></button>
                                            </Link>
                                        </div>                                   
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div className='flex items-center justify-center mt-10'>
                                        <Link to="/upload">
                                            <button className='p-3 font-bold flex gap-2 text-xl rounded-full bg-gradient-to-r from-[#6d28d9] to-[#5961f9]'>Upload an image <AiOutlineArrowRight color='white' size={25}/></button>
                                        </Link>
                                    </div>                                    
                                )
                            }
                        }                        
                        )}
                        </div>                    
                    )}                    
            </div>
        </div>
        <ContactCard/>
    </div>
    );
};

export default About;
