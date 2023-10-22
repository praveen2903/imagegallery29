import { Navigate, Route, Routes } from "react-router-dom";
import ImageCards from "./Components/homesection/ImageCard";
import ImageCardDetails from "./Components/homesection/ImageCardDetails";
import AddImage from "./Components/uploadform/AddImage";
import Login from "./Components/authetication/Login";
import ImagesAdded from "./Components/addedimages/ImagesAdded";
import Register from "./Components/authetication/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PhoneLogin from "./Components/authetication/PhoneLogin";

export default function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children
  };
  console.log(currentUser)

  return (
    <div>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><ImageCards/></ProtectedRoute>}/>
        <Route path="/detailPage/:id" element={<ProtectedRoute><ImageCardDetails/></ProtectedRoute>}/>
        <Route path="/upload" element={<ProtectedRoute><AddImage/></ProtectedRoute>} />
        <Route path="/" element={<Login/>} />
        <Route path="/addedphotos" element={<ProtectedRoute><ImagesAdded/></ProtectedRoute>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/phonelogin" element={<PhoneLogin/>} />
      </Routes>
    </div>
      
  )
}