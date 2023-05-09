import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatId, newMessage } from "../../store/ChatReducer";
import Chat_comp from "../chat/Chat_comp";

function Chats() {
  const { chats } = useSelector((state) => state.chat);
  const { sockets } = useSelector((s) => s.socket);
  const dispatch = useDispatch();
  console.log(chats);
  useEffect(() => {
    if (sockets) {
      sockets.on("receiveMessage", (data) => {
        dispatch(getChatId(data.sender));
        console.log(data);
        dispatch(newMessage(data));
      });
    }
  }, [sockets]);
  return (
    <div className="flex fixed right-5 bottom-5">
      {chats.map((chat, index) => {
        return <Chat_comp chat={chat} key={index} />;
      })}
    </div>
  );
}

export default Chats;
