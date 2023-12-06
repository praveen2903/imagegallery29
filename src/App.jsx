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
import ResetPassword from "./Components/authetication/ResetPassword";
import About from "./Components/Aboutpages/About";
import VerifyingEmail from "./Components/authetication/VerifyingEmail";
import { ToastContainer } from "react-toastify";
import AboutImage from "./Components/Aboutpages/AboutImage";
import SelectedCards from "./Components/addedimages/SelectedCards";
import UpdateImage from "./Components/Aboutpages/UpdateImage";
import HeroPage from "./Components/HeroPage";


export default function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children
  };
  // console.log(currentUser)

  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroPage/>}/>
        <Route path="/home" element={<ProtectedRoute><ImageCards/></ProtectedRoute>}/>
        <Route path="/detailPage/:id" element={<ProtectedRoute><ImageCardDetails/></ProtectedRoute>}/>
        <Route path="/upload" element={<ProtectedRoute><AddImage/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<ProtectedRoute><About/></ProtectedRoute>} />
        <Route path="/profile/:name" element={<ProtectedRoute><AboutImage/></ProtectedRoute>} />
        <Route path="/addedphotos" element={<ProtectedRoute><ImagesAdded/></ProtectedRoute>} />
        <Route path="/addedphotos/:id" element={<ProtectedRoute><ImagesAdded/></ProtectedRoute>} />
        <Route path="/addedphotos/filter/:address" element={<ProtectedRoute><SelectedCards/></ProtectedRoute>}/>
        <Route path="/addedphotos/filter/:address/:id" element={<ProtectedRoute><SelectedCards/></ProtectedRoute>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/phonelogin" element={<PhoneLogin/>} />
        <Route path="/reset" element={<ResetPassword/>} />
        <Route path='/verifypage' element={<VerifyingEmail/>}/>
        <Route path="/yourImage" element={<AboutImage/>}/>
        <Route path="/profile/update/:name" element={<ProtectedRoute><UpdateImage/></ProtectedRoute>}/>
      </Routes>
      <ToastContainer position="top-right" bodyClassName="text-center font-bold text-blue-900"/>
    </div>
      
  )
}