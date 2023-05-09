import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/Layout";
function Layout() {
  const { status, children } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggle());
  };
  return (
    <div
      className={`absolute  shadow-secondary shadow-md  left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-50 rounded-lg overflow-y-auto text-white bg-[#0b0c0edb]  duration-300 h-[90%] w-[90%] flex items-center justify-center ${
        status ? "scale-1" : "scale-0"
      }`}
    >
      <FontAwesomeIcon
        icon={faWindowClose}
        className="text-white absolute right-20  w-10 cursor-pointer h-10 top-10"
        onClick={handleChange}
      />
      {children}
    </div>
  );
}

export default Layout;
