import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ImageCards from "./Components/ImageCard";
import ImageCardDetails from "./Components/ImageCardDetails";

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ImageCards/>}/>
        <Route path="/detailPage/:id" element={<ImageCardDetails/>}/>
      </Routes>
    </div>
      
  )
}