import React, { useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail, HiOutlinePhone } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import emailjs from "@emailjs/browser";
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const ContactCard = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const[message,setMessage]=useState("");
  const handleSubmit = (e) => {
    e.preventDefault();  
    emailjs.sendForm('service_00ghww6', 'template_x41m5ck', form.current, 'TP4OxTSn6LGe4HIEB')
    .then((result) => {
      console.log(result.text);
    },(error) => {
      console.log(error.text);
    });
    setName("");
    setMail("");
    setPhone("");
    setMessage("");
    toast.success("email sent successfully.")
  };
  return (
    <section className="flex-1 bg-gradient-to-r from-[#dbcdda] to-[#5961f9] p-3 m-10 rounded-lg" id="#contact">
      <h1 className="text-2xl md:text-4xl mt-3 font-medium md:ml-10 pb-4 text-[#0f172a] text-center">
        Contact
      </h1>
      <h2 className="my-8 text-xl md:text-3xl text-center text-black">
        In case of any queries, contact Rokkam Sai Praveen
      </h2>
      <motion.div
        initial={{x:-100}}
        whileInView={{x:0}}
        transition={{duration:0.7}}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 ">
          <div className="flex w-4/5 gap-2 md:flex-col items-center py-2 px-2 md:px-4 md:w-auto bg-stone-700 text-white rounded-md">
            <div>
              <FaPhoneAlt />
            </div>
            <p>+91 7565922445</p>
          </div>
          <div className="flex w-4/5 gap-2 md:flex-col items-center py-2 px-2 md:px-4 md:w-auto bg-stone-700 text-white rounded-md">
            <div>
              <HiMail />
            </div>
            <p>
              <a href="mailto:rokkamsaipraveen5l0@gmail.com" className="text-white cursor-pointer hover:text-white">rokkamsaipraveen5l0@gmail.com</a>
            </p>
          </div>
        </div>
      </motion.div>
      <div className="w-4/5 md:w-3/5 my-8 mx-auto rounded-md">
        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
          ref={form}
        >
          <motion.div
            initial={{y:100}}
            whileInView={{y:0}}
            transition={{duration:0.7}}>
          <div className="text-black">
            <div className="flex gap-2 items-center p-4 my-2 border-2 border-black rounded-md">
              <CgProfile size={20} color="black" />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 focus:outline-0 bg-white"
              />
            </div>
            <div className="flex gap-2 items-center p-4 my-2 border-2 border-black rounded-md">
              <FiMail size={20} color="black" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="flex-1 focus:outline-0 bg-white"
              />
            </div>
            <div className="flex gap-2 items-center p-4 my-2 border-2 border-black rounded-md">
              <HiOutlinePhone size={20} color="black" />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 focus:outline-0 bg-white"
              />
            </div>
          </div>
          </motion.div>
          <textarea
            name="message"
            id="message"
            rows="4"
            placeholder="Your message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-4 my-2 border-2 border-black text-black rounded-md bg-white"
          ></textarea>
          <div>
            <button
              type="submit"
              className="bg-stone-600 text-white px-4 py-2 rounded-md md:w-1/2 hover:translate-x-6 duration-1000"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactCard;