import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import fetchDataDetails from '../utils/fetchDataDetails'
import axios from "axios";
import ImageCard from "./ImageCard";
import { AiOutlineHome } from "react-icons/ai";

function ImageCardDetails() {
    const [photo,setPhoto]=useState({});
    const {id}=useParams();

    useEffect(()=>{
        fetchDataDetails(setPhoto,id);
        window.scrollTo({top:0, left:0, behaviour:'smooth'});
    },[id]);
  
    function handleDownload(){
        axios({
            url:"https://source.unsplash.com/random/500x500",
            method:"GET",
            responseType:'blob'
        })
        .then((response)=>{
            const url=window.URL.createObjectURL(new Blob([response.data],{ type: 'image/jpeg' }))
            const link=document.createElement('a');
            link.href=url

            link.setAttribute('download',`${photo.title}.jpeg`)
            document.body.appendChild(link)
            link.click()
        
        })
    }


  return (
    <div className="p-12">
        <div className="bg-blue-900 text-white py-10 px-2 lg:p-10 rounded-2xl">
            <Link to="/" className="text-3xl float-left my-4 text-red-500 hover:underline">
                <AiOutlineHome/>
            </Link>
            {Object.keys(photo).length>0 &&(
                <div>
                    <h1 className="text-center text-yello-600 underline decoration-dashed my-6 mt-20 sm:my-14 text-3xl md:text-5xl text-orange-500">
                        Details Page
                    </h1>
                    <div className="flex flex-col sm:flex-row mt-1 sm:mt-14 w-full md:w-11/12">
                        <img src={photo.url} alt={photo.title} className="custom-box-shadow sm:h-60 xl:h-96 rounded-3xl mx-4 p-1"/>
                        <div className="flex flex-col justify-center mt-10 ml-4 lg:ml-20">
                            <p className="nt-5 text-2xl  lg:text-4xl md:text-3xl tracking-wider p-3">{photo.title}</p>
                            <p className="text-xl tracking-wider leading-snug font-semibold">
                                {photo.description}
                            </p>
                            <button onClick={handleDownload} className="px-4 py-3 mt-5 bg-blue-600 hover:bg-black rounded">
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="my-20">
            <h1 className="my-14 text-center text-5xl text-blue-800">Related Images</h1>
            <ImageCard id={id} setPhoto={setPhoto}/>
        </div>

    </div>
  )
}

export default ImageCardDetails
