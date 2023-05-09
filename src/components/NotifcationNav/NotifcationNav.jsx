import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { getRequest } from "../../utils/ProfileMethods";
import { Request } from "../notificationItem/NotifictItem";
import { useSelector } from "react-redux";
function NotifcationNav({
  notificationStatusHandler,
  notificationStatus,
  setIsThereNotifications,
}) {
  const [requests, setRequests] = useState([]);
  const { sockets } = useSelector((s) => s.socket);

  const { user } = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (user) sockets?.emit("setupLocation", { location: user.city });
  }, [sockets, user]);

  useEffect(() => {
    sockets?.emit("setupLocation", user);

    sockets?.on("receiveRequest", (data) => {
      if (notificationStatus != true) setIsThereNotifications(true);
      console.log("rec");
      setRequests((prev) => [data, ...prev]);
    });
  }, [sockets]);

  useEffect(() => {
    const getRequests = async () => {
      var [data, err] = await getRequest("/api/getNotifications");
      if (!err) {
        data?.requestsPost && setRequests(data?.requestsPost);
      } else {
      }
    };
    getRequests();
  }, []);

  return (
    <div
      className={`fixed top-0 overflow-y-auto h-screen w-7/12 md:w-[30%]  shadow-lg bg-black  mt-2 shadow-secondary z-20 ${
        notificationStatus ? "left-0" : "-left-full"
      } duration-1000  pt-16`}
    >
      <div className="flex justify-end mb-3 ">
        <FontAwesomeIcon
          icon={faWindowClose}
          className=" cursor-pointer text-3xl mr-3 text-white hover:scale-125 duration-500"
          onClick={notificationStatusHandler}
        />
      </div>
      <span className="text-white capitalize border-b-4 border-secondary mb-6  text-xl font-extrabold mx-auto p-5 pb-2  block w-fit">
        all Requests
      </span>
      {requests.map((req, index) => {
        return <Request body={req} request key={index} />;
      })}
      <span className="text-white capitalize border-b-4 border-secondary mb-6  text-xl font-extrabold mx-auto p-5 pb-2  block w-fit">
        Notifications
      </span>
    </div>
  );
}

export default NotifcationNav;
