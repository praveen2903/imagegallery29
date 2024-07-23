import React from 'react';
import img from '../../assets/phonewallpaper.gif';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';

const PhoneLogin = () => {
  const [number, setNumber] = useState('');
  const [name, setDisplayName] = useState('');
  const [err, setErr] = useState('');
  const [otp, setOtp] = useState('');
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState('');
  const navigate = useNavigate();

  const setUpRecaptcha = (number) => {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptcha.render();
    const confirm= signInWithPhoneNumber(auth, number, recaptcha);
    console.log(confirm);
    return confirm;
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setErr('');

    if (number === '' || number === undefined || name === '') {
      setErr('Please enter a valid phone number and display name.');
      return;
    }

    try {
      const response = await setUpRecaptcha(number);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setErr('Error setting up reCAPTCHA.');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === '' || otp === null) {
      return;
    }
    setErr('');
    try {
        await confirmObj.confirm(otp);
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          phoneNumber: number,
          displayName: name,
        });
        toast.success(`Mobile Login sucessful,welcome ${name}`)
        navigate('/home');

    } catch (err) {
      setErr('enter correct otp ..');
    }
  };

  const renderInput = (props) => <input {...props} />;

  return (
    <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${img})` }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold font-serif text-[#166534]">Phone number Login!</h1>
          <p className="py-6 font-mono text-[#22c55e]">
            Our collection is a showcase of creativity, and we're excited to have you join us. To access the gallery, please
            log in with your credentials or register if you're new here.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-75">
          <Link to="/" className="text-3xl float-left my-4 text-black flex gap-3">
            <MdOutlineArrowBack size={20} />
            <span className="text-sm">Cancel</span>
          </Link>
          <form onClick={getOtp} className="card-body" style={{ display: !flag ? 'block' : 'none' }}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-extrabold font-serif">Phone number</span>
              </label>
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter phone number"
                className="input bg-white text-black input-bordered bg-opacity-75"
                required
                value={number}
                onChange={setNumber}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-extrabold font-serif">Display Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter display name"
                className="input bg-white text-black input-bordered bg-opacity-75"
                required
                value={name}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            
            <div id="recaptcha-container" />
            <div className="form-control mt-8">
              <button className="btn btn-primary rounded-3xl bg-blue-500 hover-bg-blue-700 text-white uppercase font-bold">
                Send OTP
              </button>
            </div>
          </form>
          <form onClick={verifyOtp} className="card-body" style={{ display: flag ? 'block' : 'none' }}>
            <div>
              {!err && <span className="text-red-700">{err}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-extrabold font-serif">Enter OTP</span>
              </label>
              <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    renderInput={renderInput}
                    inputStyle={{
                      border: "1px solid transparent",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "blue"
                    }}
                    focusStyle={{
                      border: "1px solid #CFD3DB",
                      outline: "none"
                    }}
                />            
              </div>
            <div className="form-control mt-8">
              <button className="btn btn-primary rounded-3xl bg-blue-500 hover-bg-blue-700 text-white uppercase font-bold">
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
