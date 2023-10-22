import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/loginpage.jpg';
import google from '../../assets/google.png';
import github from '../../assets/github.png';
import facebook from '../../assets/facebook.avif'
import phone from '../../assets/telephone.png';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleprovider, githubprovider, facebookprovider } from "../../firebase/config";
import { useState, useEffect } from "react";


export default function Login() {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [googlevalue,setGoogleValue]=useState('');
  const [githubvalue,setGithubValue]=useState('');
  const [facebookvalue,setFacebookValue]=useState("")

  const handleGoogleLogin=()=>{
    signInWithPopup(auth,googleprovider).then((data)=>{
      setGoogleValue(data.user.email);
      localStorage.setItem("email",data.user.email);
      navigate("/home")
      alert(`logged in through google with ${data.user.email}`)
    })
    .catch((err)=>{
      if (err.code === "auth/popup-closed-by-user") {
        console.log("Authentication popup was closed by the user.");
      } else {
        console.error("Authentication error:", err);
      }
    })
  }

  const handleGithubLogin=()=>{
    signInWithPopup(auth,githubprovider).then((data)=>{
      setGithubValue(data.user.email);
      localStorage.setItem("email",data.user.email);
      navigate("/home")
      alert(`logged in through github with ${data.user.email}`)
    })
    .catch((err)=>{
      if (err.code === "auth/popup-closed-by-user") {
        console.log("Authentication popup was closed by the user.");
      } else {
        console.error("Authentication error:", err);
      }
    })
  }
  
  const handleFacebookLogin=()=>{
    signInWithPopup(auth,facebookprovider).then((data)=>{
      setFacebookValue(data.user.email);
      localStorage.setItem("email",data.user.email);
      navigate("/home")
      alert(`logged in through facebook with ${data.user.email}`)
    })
    .catch((err)=>{
      if (err.code === "auth/popup-closed-by-user") {
        console.log("Authentication popup was closed by the user.");
      } else {
        console.error("Authentication error:", err);
      }
    })
  }


  useEffect(()=>{
    setGoogleValue(localStorage.getItem('email'))
    setGithubValue(localStorage.getItem("email"))
    setFacebookValue(localStorage.getItem("email"))
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = email;
    const userPassword = password;

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate("/home");
      alert(`logged with ${email}`)
    } catch (error) {
      setErr(true);
      setEmail('');
      setPassword(''); 
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${img})` }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold font-serif text-[#f97316]">Login now!</h1>
          <p className="py-6 text-[#f59e0b] font-mono">Our collection is a showcase of creativity, and we're excited to have you join us. To access the gallery, please log in with your credentials or register if you're new here.</p>
        </div>
        <div className="card flex-shrink-0 w-full bg-white max-w-sm shadow-2xl bg-opacity-60">
          <div>
            <div className="text-center text-red-700 p-4 m-2">
              {err && <span>Mail id or password is incorrect</span>}
            </div>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered text-black bg-white bg-opacity-75"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered text-black bg-white bg-opacity-75"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label mt-2">
                  <a href="/" className="label-text-alt link link-hover hover:text-blue-600 text-black">Forgot password?</a>
                </label>
                <p className="m-2 text-black">Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-blue-900">
                    Sign In
                  </Link>
                </p>
              </div>
              <div className="form-control">
                <button className="btn btn-primary bg-blue-600 rounded-3xl mt-1 hover:bg-blue-900 text-white uppercase">Login</button>
              </div>
            </form>
            <div className="">
              <p className="text-center text-white">or continue with</p>
              <div className="flex gap-10 items-center justify-center mb-5">
                <div className="flex gap-10 items-center justify-center mb-5">
                  <button id={googlevalue} className="cursor-pointer" onClick={handleGoogleLogin}>
                    <img src={google} className="rounded h-[32px] w-[32px]" alt="Google" />
                  </button>

                  <button id={githubvalue} className="cursor-pointer" onClick={handleGithubLogin}>
                    <img src={github} className="rounded h-[32px] w-[32px]" alt="GitHub" />
                  </button>

                  <button id={facebookvalue} className="cursor-pointer" onClick={handleFacebookLogin}>
                    <img src={facebook} className="rounded h-[32px] w-[32px]" alt="Facebook" />
                  </button>

                  <Link to="/phonelogin" className="cursor-pointer">
                    <img src={phone} className="rounded h-[32px] w-[32px]" alt="G"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}