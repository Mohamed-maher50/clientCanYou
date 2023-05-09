import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost/PostBox";
import NavBar from "../components/NavBar";
import OnlineFriends from "../components/OnlineFriends/OnlineFriends";
import PostContainer from "../components/PostContainer/PostContainer";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Requestbox from "../components/requestBox/Requestbox";

function Home() {
  const { user } = useSelector((state) => state.user.userData);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data } = await axios.get("/getFriends");
        setOnlineFriends(data.following);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, []);
  return (
    <>
      <NavBar />
      <div className="pt-12">
        <div className="grid py-5 relative text-center gap-3 grid-cols-2  lg:grid-cols-8 text-white">
          <section className="hidden lg:block rounded-lg  lg:col-span-2 h-fit lg:sticky top-0">
            <ProfileCard home />
          </section>
          <section className="rounded-lg  mx-auto order-last lg:order-none col-span-2 lg:col-span-4  relative  ">
            <CreatePost />
            <div className="mt-4">
              <Requestbox />
            </div>
            <div className="w-[90%]  overflow-hidden mx-auto sm:w-[65%] lg:w-[85%]">
              <PostContainer />
            </div>
          </section>
          <section className="bg-open hidden lg:block p-3 shadow-lg rounded-lg  grid-cols-5 lg:col-span-2 h-fit lg:sticky top-0">
            <div>
              <h1
                className="mx-auto mb-7 px-3 capitalize w-fit  font-bold text-xl
              border-b-4 border-b-secondary"
              >
                online Friends
              </h1>
              {onlineFriends.map((u, index) => (
                <OnlineFriends user={u} key={index} />
              ))}
              {onlineFriends.length === 0 ? (
                <h1 className="mx-auto mb-7 px-3 capitalize w-fit  font-bold text-xl border-b-4 border-b-secondary">
                  No friends online
                </h1>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
