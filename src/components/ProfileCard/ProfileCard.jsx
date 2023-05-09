import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChatId, pushToChat } from "../../store/ChatReducer";
import { getRequest, userAlreadyFollowing } from "../../utils/ProfileMethods";

function ProfileCard({ home }) {
  const { user } = useSelector((state) => state.user.userData);

  const [cardInfo, setCardInfo] = useState(undefined);

  const { id } = useParams();
  const dispatch = useDispatch();
  const sendMessage = () => {
    dispatch(getChatId(cardInfo._id));
  };
  useEffect(() => {
    const getCardInfo = async () => {
      const [data] = await getRequest(`/profile/card/${home ? user._id : id}`);
      if (data) setCardInfo(JSON.parse(data));
    };
    getCardInfo();
  }, [id, user]);

  const SendFollow = async () => {
    const { data } = await axios.put(`/profile/follow`, {
      id: id,
    });
    setCardInfo(JSON.parse(data).data);
  };

  if (!cardInfo)
    return (
      <>
        <div className="w-full p-2  animate-pulse relative bg-black rounded-lg shadow-md   shadow-gray-900">
          <div className="flex items-center">
            <div className=" w-40 h-40  bg-open rounded-full mx-auto animate-pulse"></div>
          </div>
          <h4 className="text-center text-2xl  my-2 font-extralight text-black "></h4>
          <h4 className="text-center animate-pulse h-4 w-32 mx-auto bg-open "></h4>
          <div className="flex justify-evenly my-2 ">
            <span className="flex flex-col animate-pulse w-24 text-white bg-open shadow-lg items-center  p-2 font-bold text-xl capitalize rounded-lg">
              <span className=" text-white"></span>
            </span>
            <span className="flex flex-col animate-pulse w-24 text-white shadow-lg items-center bg-open p-2 font-bold text-xl capitalize rounded-lg">
              <span className=" text-white"></span>
            </span>
            <span className="flex flex-col animate-pulse w-24 text-white  bg-open shadow-lg items-center  p-2 font-bold text-xl capitalize rounded-lg">
              <span className=" text-white animate-pulse w-24 h-12"></span>
            </span>
          </div>
        </div>
      </>
    );
  const AlreadyFollowing = userAlreadyFollowing(cardInfo, user._id);
  return (
    <>
      <div className="w-full p-2 border-b-4 border-secondary text-black relative bg-darkWhite rounded-lg shadow-md   shadow-secondary">
        <div className="flex items-center">
          {home ||
            (id != user?._id && (
              <button
                className={`main-btn h-fit translate-x-14   ${
                  AlreadyFollowing
                    ? "bg-blue-400 disabled text-white  pointer-events-none"
                    : " hover:mb-3 "
                }`}
                onClick={SendFollow}
                disabled={AlreadyFollowing}
              >
                Follower
              </button>
            ))}

          <img
            src={cardInfo?.AvatarUrl}
            className=" w-40 h-40  rounded-full mx-auto object-cover"
          />
          {home ||
            (id != user?._id && (
              <button
                className="main-btn h-fit hover:mb-3 -translate-x-14"
                onClick={sendMessage}
              >
                message
              </button>
            ))}
        </div>
        <h4 className="text-center text-2xl  my-2 font-extralight text-black ">
          {cardInfo.fullName}
        </h4>
        <h4 className="text-center text-xl capitalize font-semibold text-gray-600"></h4>
        <div className="flex justify-evenly my-2 ">
          <span className="flex  text-white bg-open shadow-lg items-center  p-2 font-bold text-xl capitalize rounded-lg">
            Follower
            <span className=" text-white ml-2">
              {cardInfo.followers.length}
            </span>
          </span>
          <span className="flex text-white shadow-lg items-center bg-open p-2 font-bold text-xl capitalize rounded-lg">
            following
            <span className="ml-2 text-white">{cardInfo.following.length}</span>
          </span>
          <span className="flex  text-white  bg-open shadow-lg items-center  p-2 font-bold text-xl capitalize rounded-lg">
            Ranks
            <span className=" text-white ml-2">0</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
