import { useEffect, useState } from "react";
import fetchData from '../../utils/fetchdata';
import Image from "./Image";
import ScrollToTop from "react-scroll-to-top";
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import NavbarDefault from "../NavbarDefault";
import { useSwipeable } from "react-swipeable";

function ImageCard({ heading, id, setPhoto }) {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleNextClick = () => {
    setOffset(offset + 8);
  }

  const handlePreviousClick = () => {
    if (offset >= 8) {
      setOffset(offset - 8);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePreviousClick,
  });

  useEffect(() => {
    fetchData(setData, offset);
  }, [offset]);

  return (
    <div>
      <NavbarDefault />
      <ScrollToTop smooth color='#f97316' width='35' height='25' />
      <h1 className="font-semibold text-center my-6 mt-8 sm:my-14 text-3xl md:text-5xl hover:text-blue-800">{heading}</h1>

      <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 mx-8 cursor-pointer" {...handlers}>
        {data.photos && data.photos.map(photo => (
          <Image key={photo.id} id={photo.id} url={photo.url} title={photo.title} author={photo.author} location={photo.location} category={photo.category} />
        ))}
      </div>

      <div className="p-4 flex justify-center gap-20 cursor-pointer">
        <button onClick={handlePreviousClick} disabled={offset === 0} className="bg-blue-700 p-4 text-4xl hover:text-2xl mr-2 rounded-full text-[#eab308]">
          <GrLinkPrevious />
        </button>
        <button onClick={handleNextClick} disabled={!data.photos || data.photos.length < 8} className="bg-blue-700 p-4 mr-2 text-4xl hover:text-2xl rounded-full text-[#eab308]">
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
}

export default ImageCard;