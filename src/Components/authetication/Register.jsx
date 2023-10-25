import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/registerpage.jpeg'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {auth, storage ,db} from '../../firebase/config'
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file,setFile]=useState(null)

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (file && allowedTypes.includes(file.type)) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'userPhotos', res.user.uid), {});
              navigate('/home');
              alert(`Welcome to Imagegallery ${displayName}, ${email}`);
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    } 
    else {
      alert('Invalid file type. Please select a valid image file (PNG, JPG, JPEG).');
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200" style={{backgroundImage:`url(${img})`}}>
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold font-serif text-[#2563eb]">Register now!</h1>
        <p className="py-6 font-mono text-[#22d3ee]">Our collection is a showcase of creativity, and we're excited to have you join us. To access the gallery, please log in with your credentials or register if you're new here.</p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-75">
        <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                <span className="label-text text-black capitalize">User Name</span>
                </label>
                <input type="text" placeholder="Enter your name ..." className="input bg-white text-black input-bordered bg-opacity-75" required />
            </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Email</span>
            </label>
            <input type="email" placeholder="email" className="input bg-white input-bordered text-black bg-opacity-75" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered bg-white text-black bg-opacity-75" required />
          </div>
          <div className="form-control mt-2">
            <label className="label">
                <span className="label-text text-black">Add your Avatar</span>
            </label>
            <input type="file" accept="image/*" id="profile-photo" className="file-input file-input-bordered file-input-sm w-full max-w-xs mt-2" onChange={(e) => setFile(e.target.files[0])} />
          </div>
            <p className="mt-2 text-black">Already have an account?{" "}
              <Link to="/" className="font-medium text-blue-700">
                login
              </Link>
            </p>
          <div className="form-control mt-6">
            <button disabled={loading} className="btn btn-primary rounded-3xl bg-blue-500 hover:bg-blue-700 text-white uppercase">Register</button>
          </div>
          <p className="text-blue-800">{loading && "Uploading and compressing the image please wait..."}</p>
          <p className="text-red-600">{err && <span>Email Already exists...</span>}</p>
        </form>
      </div>
    </div>
  </div>
  );
}