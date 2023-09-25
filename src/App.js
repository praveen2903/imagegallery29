import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ImageCards from "./Components/ImageCard";
import ImageCardDetails from "./Components/ImageCardDetails";

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ImageCards heading=" My Collections"/>}/>
        <Route path="/detailPage/:id" element={<ImageCardDetails/>}/>
      </Routes>
    </div>
      
  )
}