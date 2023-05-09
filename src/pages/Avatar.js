import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { changeProfilePicture } from "../store/user";
import { storage } from "../firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
function Avatar() {
  const [img, setImg] = useState("/newUser.jpeg");
  const imgInput = useRef("");
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user.userData);
  const handelFirstVisit = async () => {
    const res = await axios.put("/firstVisit");
    return res;
  };
  const nav = useNavigate();
  const submitAvatar = async (e) => {
    e.preventDefault();
    const img = ref(storage, "images/" + Date.now());
    const uploadTask = uploadBytesResumable(img, imgInput.current.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          const status = dispatch(
            changeProfilePicture({ imgUrl: downloadURL })
          );
          nav(`/`);
        });
      }
    );
  };
  const handleUpload = (e) => {
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    setImg(imgUrl);
  };
  useEffect(() => {
    if (user?.firstVisit === false) nav("/");
    return () => {
      handelFirstVisit();
    };
  }, []);
  const handleSkip = () => handelFirstVisit();

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-main">
      <form
        onSubmit={submitAvatar}
        className=" border-white border-8  p-4 pt-6 flex flex-col items-center w-[25rem] rounded-md"
      >
        <label
          htmlFor="userImg"
          className="relative flex group w-32  h-32 my-6 cursor-pointer"
        >
          <img src={img} className=" rounded-full object-cover" />
          <div className="w-full  scale-0 flex items-center justify-center group-hover:bg-white  duration-300 group-hover:scale-100 absolute rounded-full top-0 bottom-0 right-0   ">
            <FontAwesomeIcon
              icon={faEdit}
              className={"text-open w-10 h-10 block"}
            />
          </div>
        </label>
        <input
          id="userImg"
          onChange={handleUpload}
          ref={imgInput}
          type={"file"}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
        <h1>choose you avatar Image</h1>
        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="main-btn block mr-auto"
            onClick={submitAvatar}
          >
            Submit
          </button>
          <Link to={`/`} onClick={handleSkip}>
            <button type="submit" className="outline-btn block ml-auto">
              Skip
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Avatar;
