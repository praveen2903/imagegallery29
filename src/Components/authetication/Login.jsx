import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/loginpage.jpg';
import google from '../../assets/google.png';
import github from '../../assets/github.png';
import facebook from '../../assets/facebook.png'
import phone from '../../assets/telephone.png';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db , googleprovider, githubprovider, facebookprovider } from "../../firebase/config";
import { useState, useEffect } from "react";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";


export default function Login() {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [googlevalue,setGoogleValue]=useState('');
  const [githubvalue,setGithubValue]=useState('');
  const [facebookvalue,setFacebookValue]=useState('')

  useEffect(()=>{
    setGoogleValue(localStorage.getItem('email'))
    setGithubValue(localStorage.getItem("email"))
    setFacebookValue(localStorage.getItem("email"))
  },[])

  const isEmailAlreadyRegistered = async (email) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('googlevalue', '==', email), where('githubvalue', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email registration:", error);
      return false;
    }
  }

  const handleGoogleLogin=async ()=>{
    // console.log(googlevalue)
    const email = googlevalue;
    if (email && await isEmailAlreadyRegistered(email)) {
      alert(`User with email ${email} is already registered with Google.`);
      return;
    }
    signInWithPopup(auth,googleprovider).then(async (data)=>{
      setGoogleValue(data.user.email);
      localStorage.setItem("email",data.user.email);
      // console.log(data.user)

      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        googlevalue,
        photoURL:data.user.photoURL,
        displayName:data.user.displayName,
      });

      navigate("/home")
      alert(`logged in through google with ${data.user.email}`)
    })
    .catch((err)=>{
      console.error("Google Authentication error:", err);
    })
  }

  const handleGithubLogin=async ()=>{
    const email = githubvalue;
    if (email && await isEmailAlreadyRegistered(email)) {
      alert(`User with email ${email} is already registered with Google.`);
      return;
    }
    signInWithPopup(auth,githubprovider).then(async (data)=>{
      setGithubValue(data.user.email);
      localStorage.setItem("email",data.user.email);

      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        githubvalue,
        photoURL:data.user.photoURL,
        displayName:data.user.displayName,
      });

      navigate("/home")
      alert(`logged in through github with ${data.user.email}`)
    })
    .catch((err)=>{
      console.error("Google Authentication error:", err);
    })
  }
  
  const handleFacebookLogin=()=>{
    signInWithPopup(auth,facebookprovider).then(async (data)=>{
      setFacebookValue(data.user.email);
      // console.log(facebookvalue)
      localStorage.setItem("email",data.user.email);
      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        facebookvalue,
        photoURL:data.user.photoURL,
        displayName:data.user.displayName,
      });

      navigate("/home")
      alert(`logged in through facebook with ${data.user.email}`)
    })
    .catch((err)=>{
      console.error("Google Authentication error:", err);
    })
  }


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

  const handleResetPassword=()=>{
    navigate("/reset")
  }

  return (
    <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${img})` }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold font-serif text-[#f97316]">Login now!</h1>
          <p className="py-6 text-[#f59e0b] font-mono">Our collection is a showcase of creativity, and we're excited to have you join us. To access the gallery, please log in with your credentials or register if you're new here.
          Recommended to login by email and password through which you can have your personal profile photo
          </p>
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
                  <p onClick={handleResetPassword} className="label-text-alt link link-hover hover:text-blue-600 text-black">Forgot password?</p>
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
              <p className="text-center text-white text-[18px] mb-5">or continue with</p>
              <div className="flex gap-10 items-center justify-center mb-5">
                <div className="flex gap-10 items-center justify-center mb-5">
                  <Link to="/phonelogin" className="cursor-pointer">
                    <img src={phone} className="rounded h-[32px] w-[32px]" alt="G"/>
                  </Link>
                  
                  <button id={googlevalue} className="cursor-pointer" onClick={handleGoogleLogin}>
                    <img src={google} className="rounded h-[32px] w-[32px]" alt="Google" />
                  </button>

                  <button id={facebookvalue} className="cursor-pointer" onClick={handleFacebookLogin}>
                    <img src={facebook} className="rounded h-[45px] w-[40px]" alt="Facebook" />
                  </button>

                  <button id={githubvalue} className="cursor-pointer" onClick={handleGithubLogin}>
                    <img src={github} className="rounded h-[32px] w-[32px]" alt="GitHub" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}