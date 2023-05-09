import { Route, Routes, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/register/Register";
import Avatar from "./pages/Avatar";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getSocket } from "./store/SocketReducer";
import Errors from "./components/Errors";
import Layout from "./components/layout/Layout";
import Chats from "./components/Chats/Chats";

function App() {
  const { user } = useSelector((state) => state.user.userData);
  const { sockets } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const nav = useNavigate();
  if (!sockets) dispatch(getSocket());
  useEffect(() => {
    if (!user) return nav("/login");
  }, [user]);
  useEffect(() => {
    if (sockets && user) sockets.emit("setUpConnection", user._id);
  }, [sockets]);
  console.log(sockets);
  return (
    <div className="App h-screen min-h-screen bg-open overflow-auto ">
      <Routes>
        <Route path="/avatar" element={<Avatar />} />

        {!user ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home user={user} />} />

            <Route path="/profile/:id" element={<Profile />} />
          </>
        )}
      </Routes>
      <Chats />

      <Errors />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
      <Layout />
      {/* <ToUp /> */}
    </div>
  );
}

export default App;
