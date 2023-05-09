import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer, { logOut } from "./store/user";
import postReducer from "./store/postReducer";
import ChatReducer from "./store/ChatReducer";
import axios from "axios";
// import dotenv from "dotenv";
import SocketReducer from "./store/SocketReducer";
import errorHandlerReducer, { clearErrors, pushError } from "./store/errors";
import Layout from "./store/Layout";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    chat: ChatReducer,
    errors: errorHandlerReducer,
    layout: Layout,
    socket: SocketReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

// axios.defaults.baseURL = "https://canyou.onrender.com/";
axios.defaults.baseURL = "http://localhost:4000";
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "bearer " + JSON.parse(localStorage.getItem("userInfo"))?.token;
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    switch (error?.response?.status) {
      case 401:
        store.dispatch(logOut());
        break;
      case 400:
        console.log("some errror", error);
        store.dispatch(pushError(error));
        setTimeout(() => {
          store.dispatch(clearErrors());
        }, 1000);
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root2"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
