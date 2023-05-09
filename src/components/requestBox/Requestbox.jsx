import React, { useEffect, useRef, useState } from "react";
import "./requestBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { useSelector } from "react-redux";
import citys from "../citys";
import Select from "react-select";

function Requestbox() {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.user.userData);
  const { sockets } = useSelector((s) => s.socket);
  const { chatsId } = useSelector((s) => s.chat);
  const selectCity = useRef("");
  const body = useRef("");
  const sendRequest = async () => {
    try {
      const { data } = await axios.post("/api/createRequest", {
        body: body.current.value,
        city: selectCity.current.getValue()[0].value,
      });
      sockets?.emit("newRequest", {
        body: body.current.value,
        city: selectCity.current.getValue()[0].value,
        sender: user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <span
        className={`block   `}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="px-2 py-1 capitalize bg-darkWhite text-open  mx-auto cursor-pointer border-secondary border-2 rounded-lg">
          {open ? (
            <>
              <span>send Request </span>
              <FontAwesomeIcon icon={faArrowDown} />
            </>
          ) : (
            <FontAwesomeIcon icon={faArrowUp} />
          )}
        </div>
      </span>
      <div
        className={`text-black   rounded-md requestBox  overflow-hidden duration-1000  cursor-pointer ${
          !open ? "active" : ""
        } flex flex-col w-full bg-darkWhite mt-3`}
      >
        <textarea
          ref={body}
          placeholder="write your message "
          className="w-full resize-none bg-darkWhite  p-5 mt-5 outline-none overflow-y-auto"
        ></textarea>
        <Select
          options={[{ value: "all", label: "all" }, ...citys]}
          ref={selectCity}
          className="w-4/5 mx-auto my-5"
          placeholder="choose City"
          required={true}
        />
        <button
          onClick={sendRequest}
          className="py-2 px-10 mx-auto outline-btn w-fit  duration-500   my-5 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Requestbox;
