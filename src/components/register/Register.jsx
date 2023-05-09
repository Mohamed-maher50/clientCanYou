import React, { useRef, useState } from "react";
import InputForm from "../inputForm";
import { validationForm } from "../../validate/ValidateForm";
import { useDispatch } from "react-redux";
import { registerAuth } from "../../store/user";
import { displayError } from "../../validate/displayError";
import { Link, useNavigate } from "react-router-dom";
import { inputs } from "./inputs";
import citys from "../citys";
import Select from "react-select";
function Register() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    birthDay: "",
    email: "",
    password: "",
    city: "Cairo",
    confirmPassword: "",
    NationalID: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validationForm("register", formData);
    if (result == true) {
      const res = await dispatch(registerAuth(formData));
      if (res.error) return displayError(res.payload);
      displayError(" success", { type: "success", theme: "light" });
      nav("/avatar");
    } else {
      result.forEach((errMsg) => {
        displayError(errMsg);
      });
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="h-full overflow-y-auto flex bg-[#ffe5c1] justify-center items-center">
        <form
          className="flex bg-open flex-col w-fit mx-auto p-4 md:p-8 pt-5 md:pt-14 shadow-lg shadow-open border-4 border-white"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center lg:text-2xl uppercase borders border-white border-b-4 mb-4 md:mb-8 w-fit mx-auto px-4 text-white">
            Sign up
          </h1>
          <div className="md:grid gap-2 grid-cols-2 ">
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
            <div className="h-full">
              <label
                className={`capitalize text-white font-Josefin font-bold border-main block`}
              >
                city
              </label>

              <Select
                options={citys}
                name="city"
                required={true}
                isSearchable
                defaultValue={""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.value }))
                }
                placeholder="Select city"
              />
            </div>
          </div>

          <Link to="/login" className=" text-darkWhite   font-bold underline">
            I have account
          </Link>
          <button className="main-btn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;
