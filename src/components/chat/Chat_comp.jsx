import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { newMessage, removeChat } from "../../store/ChatReducer";
import { displayError } from "../../validate/displayError";
import axios from "axios";
function Chat_comp({ chat }) {
  const { sockets } = useSelector((s) => s.socket);
  const { chatsId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.userData);
  const chatWith = chat.users.find((u) => u._id != user._id);
  const dispatch = useDispatch();
  const chatValue = useRef("");
  const boxChat = useRef();
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      if (chatValue.current.value.trim() === "")
        return displayError("please enter anything", { position: "top-right" });
      const { data } = await axios.post(`/newMessage/${chat._id}`, {
        content: chatValue.current.value,
      });
      dispatch(
        newMessage({
          receiver: chatWith._id,
          ...data,
          chatId: chat._id,
          AvatarUrl: user.AvatarUrl,
        })
      );

      if (sockets) {
        sockets.emit("newMessage", {
          receiver: chatWith._id,
          ...data,
          chatId: chat._id,
          AvatarUrl: user.AvatarUrl,
        });
      }

      chatValue.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   boxChat?.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [chatsId]);
  useEffect(() => {
    boxChat?.current?.scrollIntoView({
      behavior: "smooth",
    });
  });
  return (
    <form
      onSubmit={sendMessage}
      className={` border-white border-2 p-2 shadow-md shadow-secondary mr-2 w-96 flex flex-col bg-main text-white ${
        chat.isActive ? "" : "hidden"
      }`}
    >
      <div className="relative flex justify-end p-2 text-2xl">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => dispatch(removeChat(chat._id))}
          className="fa-solid fa-xmark text-white cursor-pointer duration-150 hover:text-secondary"
        />
      </div>
      <div className="flex items-center justify-between ">
        <img
          src={chatWith.AvatarUrl}
          alt={chatWith.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h4 className="ml-2 text-xl capitalize font-Josefin">
          {chatWith.fullName}
        </h4>
      </div>
      {/* box chats  */}
      <div className="h-[250px] overflow-y-auto bg-slate-200 my-2">
        {/* chat */}
        {chat.messages.map((ch, index) => {
          return (
            <div
              ref={boxChat}
              className={`p-2 flex flex-col font-Josefin font-bold `}
              key={index}
            >
              <div
                className={`p-2 flex items-center capitalize   ${
                  ch._id != user._id
                    ? ""
                    : "justify-end flex-row-reverse ml-auto text-center"
                }`}
              >
                <img
                  src={ch.sender.AvatarUrl || ch.AvatarUrl}
                  alt=""
                  className="mr-2 w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700">{ch.sender.fullName}</span>
              </div>
              <div
                className={`bg-secondary text-white
              p-3 ml-9  rounded-b-md ${ch._id != user._id ? "" : "text-end"}`}
              >
                <span className="">{ch.content}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex border-white border-2">
        <input
          ref={chatValue}
          placeholder="type...."
          className="h-10 w-full outline-none p-2 text-main"
        />
        <button
          type="submit"
          className="outline-btn rounded-none border-none  m-0"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  );
}

export default Chat_comp;
