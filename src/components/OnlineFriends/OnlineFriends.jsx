import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getChatId } from "../../store/ChatReducer";
import { useDispatch } from "react-redux";
function OnlineFriends({ user }) {
  const dispatch = useDispatch();
  return (
    <article className="flex lg:flex items-center justify-end my-2  bg-darkWhite  px-2 py-2 shadow-sm cursor-pointer shadow-secondary border-2 border-secondary rounded-full">
      <div className="p-1 mr-auto ml-5 hover:bg-main rounded-full flex items-center justify-center duration-500">
        <FontAwesomeIcon
          onClick={() => dispatch(getChatId(user._id))}
          icon={faMessage}
          className=" text-blue-800  p-3 rounded-full  "
        />
      </div>
      <Link
        to={`/profile/${user._id}`}
        className="flex items-center justify-end "
      >
        <p className="text-black mx-2  font-semibold">{user.fullName}</p>
        <img
          src={user.AvatarUrl}
          className="w-12 h-12 object-cover rounded-full "
        />
      </Link>
    </article>
  );
}

export default OnlineFriends;
