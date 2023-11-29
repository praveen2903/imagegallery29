import React from 'react'
import NavbarDefault from '../NavbarDefault'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from './Card'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import EnlargePic from '../homesection/EnlargePic'
import ScrollToTop from 'react-scroll-to-top'
import { useSwipeable } from 'react-swipeable'
import ReactPaginate from 'react-paginate'
import img from '../../assets/iron.jpeg'
import { IoMdArrowRoundBack } from "react-icons/io";

const SelectedCards = () => {
    const {address}=useParams()
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageenlarge, setImageEnlarge] = useState('');
    const [enlarged, setEnlarged] = useState(false);
    const [photo,setPhoto]=useState('')

    useEffect(() => {
    let unsub;
    const fetchData = async () => {
        try {
            const q = query(collection(db, 'userPhotos'));
            unsub = onSnapshot(q, (querySnapshot) => {
                const imageList = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.contact===address){
                        imageList.push(data);
                        setPhoto(data.userphoto)
                    }
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
    }, [address]);

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;
    const totalPages = Math.ceil(images?.length / perPage);
    const navigate = useNavigate();

    useEffect(() => {
    window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
        navigate(`/addedphotos/filter/${address}/${selectedPage.selected + 1}`);
    };

    const currentProducts = images?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
    );

    const handleImageClick = (imageUrl) => {
    setImageEnlarge(imageUrl);
    toggleEnlargedView();
    };

    function toggleEnlargedView() {
    setEnlarged(!enlarged);
    }

    const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
        if (currentPage < totalPages) {
        navigate(`/addedphotos/filter/${address}/${currentPage + 1}`);
        }
    },
    onSwipedRight: () => {
        if (currentPage > 1) {
        navigate(`/addedphotos/filter/${address}/${currentPage - 1}`);
        }
    },
    });

    return (
    <div>
        <NavbarDefault />
        <ScrollToTop smooth color='#f97316' width='35' height='25' />
        <Link to='/addedphotos' className='flex gap-2'>
            <IoMdArrowRoundBack size={25} color='#ea580c' className='mt-1'/> 
            <p className='text-[20px]'>return</p>
        </Link>
        {loading ? (
        <div className='flex items-center justify-center'>
            <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
        ) : (
        <div>
            <div className='flex items-center justify-center gap-7 mb-7'>
                <img src={photo} alt={img} className='h-[100px] w-[100px] rounded-full'/>
                <div className='lg:text-3xl font-bold'>{address}</div>
            </div>
            <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 md:mx-8' {...swipeHandlers}>
            {currentProducts && currentProducts.filter(image => address === image.contact || address === image.contact)
            .map((image, index) => (
                <Card
                    key={index}
                    photoUrL={image.imageUrL}
                    name={image.name}
                    userphoto={image.userphoto}
                    title={image.title}
                    description={image.description}
                    address={image.contact}
                    onImageClick={() => handleImageClick(image.imageUrL)}
                />
            ))}
            </div>
        </div>
        )}
        {enlarged && <EnlargePic url={imageenlarge} onClose={toggleEnlargedView} />}
        <div className="m-8 text-xl">
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="flex mt-4 justify-center"
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageClassName="px-4 cursor-pointer"
            previousClassName="px-4 cursor-pointer"
            nextClassName="px-4 cursor-pointer"
            breakClassName="px-4"
            activeClassName="bg-blue-500 text-white rounded-full px-4 cursor-pointer" // Active page styling
            disabledClassName="text-gray-500 cursor-not-allowed"
        />
        </div>
    </div>
    );
}

export default SelectedCards