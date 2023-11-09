import React, { useState, useEffect } from 'react';
import NavbarDefault from '../NavbarDefault';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import EnlargePic from '../homesection/EnlargePic';
import ScrollToTop from 'react-scroll-to-top';
import ReactPaginate from 'react-paginate';
import { useSwipeable } from 'react-swipeable';

const ImagesAdded = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageenlarge, setImageEnlarge] = useState('');
  const [enlarged, setEnlarged] = useState(false);

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

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 11;
  const totalPages = Math.ceil(images?.length / perPage);
  const navigate = useNavigate();

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    navigate(`/addedphotos/${selectedPage.selected + 1}`);
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
        navigate(`/addedphotos/${currentPage + 1}`);
      }
    },
    onSwipedRight: () => {
      if (currentPage > 1) {
        navigate(`/addedphotos/${currentPage - 1}`);
      }
    },
  });

  return (
    <div>
      <NavbarDefault />
      <ScrollToTop smooth color='#f97316' width='35' height='25' />
      {loading ? (
        <div className='flex items-center justify-center'>
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      ) : (
        <div>
          <div className='flex items-center justify-center text-3xl font-bold mb-10'>Uploaded Images</div>
          <div className=' absolute right-3 top-32'>
                  <Link to="/upload">
                    <button className='p-3 font-bold flex gap-2 text-xl rounded-full bg-gradient-to-r from-[#6d28d9] to-[#5961f9]'>Add image <AiOutlineArrowRight color='white' size={25} /></button>
                  </Link>
            </div>
          <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 md:mx-8' {...swipeHandlers}>
            {currentProducts && currentProducts.map((image, index) => (
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
};

export default ImagesAdded;
