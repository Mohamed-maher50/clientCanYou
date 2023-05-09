import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { validationForm } from "../../validate/ValidateForm";
import InputForm from "../inputForm";
import { displayError } from "../../validate/displayError";
import { useNavigate, Link } from "react-router-dom";
import { loginAuth } from "../../store/user";
const inputs = [
  {
    id: "1",
    name: "email",
    label: "email",
    type: "email",
  },
  {
    id: "2",
    name: "password",
    label: "password",
    type: "password",
  },
];
function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  displayError();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validationForm("login", formData);
    if (result === true) {
      const res = await dispatch(loginAuth(formData));
      if (res.error) {
        displayError(res.payload);
      } else {
        const { user } = res.payload;
        displayError("👌 success", { type: "success", theme: "light" });
        if (user?.firstVisit === true) return nav("/avatar");
        nav(`/`);
      }
    } else {
      result.forEach((errMsg) => {
        displayError(errMsg);
      });
    }
  };
  return (
    <div className="h-screen items-center flex bg-[#ffe5c1]">
      <div className="flex mx-auto h-fit bg-open shadow-md shadow-open border-4">
        <form
          className=" flex  flex-col w-fit p-5 border-white "
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl uppercase borders border-white border-b-4 mb-8 w-fit mx-auto px-4 text-white">
            Login
          </h1>
          {inputs.map((inp) => {
            return (
              <InputForm
                labelBlock
                {...inp}
                key={inp.id}
                handler={handleChange}
              />
            );
          })}
          <Link to={"/register"} className="underline text-darkWhite font-bold">
            i don't have account
          </Link>
          <button className="main-btn">Submit</button>
        </form>
        <img
          src="/logo1.png"
          className=" hidden md:flex"
          alt="logo"
          width={"450px"}
        />
      </div>
    </div>
  );
}

export default Login;
