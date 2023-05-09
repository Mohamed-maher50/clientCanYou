import React from "react";

function InputForm({ type, label, name, id, handler, labelBlock, options }) {
  return (
    <div>
      <label
        className={`capitalize text-white font-Josefin font-bold border-main  ${
          labelBlock ? "block" : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        onChange={(e) => handler(e)}
        type={type}
        name={name}
        {...options}
        placeholder={label}
        className=" w-80 pl-2  border-2 h-8 my-1 outline-none"
      />
    </div>
  );
}

export default InputForm;
