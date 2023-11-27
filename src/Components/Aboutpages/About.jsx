import React, { useEffect, useState } from 'react';
import NavbarDefault from '../NavbarDefault';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { auth, db } from '../../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import photo from '../../assets/iron.jpeg';
import ContactCard from './ContactCard';
import { signOut } from 'firebase/auth';
import ScrollToTop from 'react-scroll-to-top';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {motion} from 'framer-motion'
import 'react-slideshow-image/dist/styles.css'
import Slider from 'react-slick';
import EnlargePic from '../homesection/EnlargePic';
import { fadeIn } from '../../Variants';

const About = () => {
    const { currentUser } = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enlarged, setEnlarged] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);

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
            unsub();
        };
    }, []);

    useEffect(() => {
        setUploadCount(images.filter(image => currentUser?.email === image.contact || currentUser?.phoneNumber === image.contact).length);
    }, [images, currentUser]);
    

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        focusOnSelect:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            },
        },
        {
            breakpoint:768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        },
        ],
    };

    function toggleEnlargedView() {
        setEnlarged(!enlarged);
      }

    return (
        <div>
            <NavbarDefault />
            <ScrollToTop smooth color='#f97316' width='35' height='25' />
            <div className='flex items-center justify-center'>
                <p className='text-3xl font-bold'>Contact Info</p>
            </div>
            <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-3'>
                <div className='bg-gradient-to-r from-[#dbcdda] to-[#5961f9] rounded-xl rounded-br-80px md:p-9 px-4 py-9'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
                        <motion.div variants={fadeIn("right",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} onClick={toggleEnlargedView}>
                            <img src={currentUser?.photoURL || photo} alt='img' className='lg:h-[400px] lg:w-[400px] rounded-full cursor-pointer' />
                        </motion.div>
                        <motion.div variants={fadeIn("down",0.2)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className='md:w-3/5 '>
                            <h2 className='md:text-4xl text-xl font-semibold text-[#09090b] mb-6 leading-relaxed'>{currentUser?.email || currentUser?.phoneNumber}</h2>
                            <p className='text-[#fbbf24] font-bold font-serif text-2xl'>
                                {currentUser?.displayName}
                            </p>
                            {!loading && <p className='text-xl text-black md:text-3xl font-semibold mt-5 font-mono '>Upload Count : {uploadCount}</p>}
                        </motion.div>
                    </div>
                    <div className='text-white gap-5 text-xl flex items-end justify-end'>
                        <button className='bg-[#dc2626] hover:bg-[#ea580c] p-4 rounded-2xl'><Link to="/" onClick={()=>signOut(auth)}>Logout</Link></button>
                    </div>  
                </div>
            </div>
            
            <div className='mt-5'>
                <div>
                    <div className='flex items-center justify-center'>
                        <p className='text-3xl font-bold'>Your Uploads</p>
                    </div>
                    <div className='flex items-center justify-center m-10'>
                        <Link to="/upload">
                            <button className='p-3 font-bold flex gap-2 md:text-xl rounded-full bg-gradient-to-r from-[#6d28d9] to-[#5961f9] uppercase'>add image <AiOutlineArrowRight color='white' size={25}/></button>
                        </Link>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <span className="loading loading-spinner loading-lg text-info"></span>
                        </div>
                    ) : (
                        <div className='m-2 mx-16 px-12 slide-container'>
                            {images.some(image => currentUser?.email === image.contact || currentUser?.phoneNumber === image.contact) ? (
                                <Slider {...sliderSettings} className='pl-5'>
                                    {images
                                        .filter(image => currentUser?.email === image.contact || currentUser?.phoneNumber === image.contact)
                                        .map((image, index) => (
                                            <div key={index} className='slider-item'>
                                                <Link to={`/profile/${image.title}`}>
                                                    <motion.div variants={fadeIn("right",0.3)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className="group relative hover:scale-110 ease-out duration-300 flex items-center justify-center">
                                                        <div>
                                                            <img src={image.imageUrL} alt={image.title} className="rounded-3xl h-[400px] w-[400px] md:h-[500px] md:w-[500px] px-4 gap-4" />
                                                        </div>
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
                                                            <h3 className="text-2xl font-medium mb-2">{image.title}</h3>
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        ))}
                                </Slider>
                                ) : (
                                    <p className='text-center text-xl'>No matching images for the current user.</p>
                                )}
                            </div>
                    )}
                </div>
            </div>
            <div className="mt-10">
                <ContactCard />
            </div>
            <div className='bg-[#312e81] p-4 text-2xl flex items-center justify-center font-mono rounded-lg m-5'>
                Website made and Maintained by ❤️ Rokkam Sai Praveen
            </div>
            {enlarged && <EnlargePic url={currentUser?.photoURL||photo} onClose={toggleEnlargedView} />}
            <style>{`
                /* Left Arrow */
                .slick-prev:before {
                    color: #0369a1;
                    font-size:30px;
                    margin-left:8px;
                }

                /* Right Arrow */
                .slick-next:before {
                    color: #0369a1;
                    font-size:30px;
                    margin-right:8px;
                }
            `}</style>
        </div>
    );
};

export default About;
