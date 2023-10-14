import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavbarDefault";
import ImageCards from "./Components/ImageCard";
import ImageCardDetails from "./Components/ImageCardDetails";
import AddImage from "./Components/AddImage";

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ImageCards/>}/>
        <Route path="/detailPage/:id" element={<ImageCardDetails/>}/>
        <Route path="/additions" element={<AddImage/>} />
      </Routes>
    </div>
      
  )
}