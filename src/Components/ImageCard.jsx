import { useEffect, useState } from "react"
import fetchData from '../utils/fetchdata'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import Image from "./Image";
import ScrollToTop from "react-scroll-to-top";


function ImageCard({heading,id,setPhoto}) {
    const [data,setData]=useState([]);
    const [offset,setOffset]=useState(0);

    const handleNextClick=()=>{
        setOffset(offset+10);
    }

    const handlePreviousClick=()=>{
        if (offset>=10){
            setOffset(offset-10);
        }
    };

    useEffect(()=>{
        fetchData(setData,offset)
    },[offset])

  return (
    <div>
        <ScrollToTop smooth color='#f97316' width='35' height='25' />
        <h1 className="font-semibold text-center my-6 mt-10 sm:my-14 text-3xl md:text-5xl hover:text-blue-1000">{heading}</h1>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            {data.photos &&  data.photos.map(photo=>(
                <Image key={photo.id} id={photo.id} url={photo.url} title={photo.title} author={photo.author} location={photo.location} category={photo.category}/>
            ))}
        </div>
        <div className="fixed bottom-100 top-96 flex justify-between right-1 left-1">
            <button onClick={handlePreviousClick} disabled={offset===0}  className="px-4 text-4xl hover:text-2xl mr-2 rounded-e-3xl text-[#4f46e5]">
                <AiOutlineDoubleLeft/>
            </button>
            <button onClick={handleNextClick} disabled={!data.photos || data.photos.length<10} className="px-4 mr-2 text-4xl hover:text-2xl rounded-e-3xl text-[#4f46e5]">
                <AiOutlineDoubleRight />
            </button>
        </div>
    </div>
  )
}

export default ImageCard
