import React from "react";

function Comments({ cm }) {
  return (
    <div
      dir="ltr"
      className=" shadow-md min-w-[350px] flex items-center rounded-lg m-3 py-3 px-5 bg-darkWhite"
    >
      <span className="mr-5  rounded-full w-12 object-cover h-12 block overflow-hidden">
        <img src={cm.sender.AvatarUrl} alt={cm.sender.fullName} />
      </span>
      <div>
        <h3 className="text-black font-bold">{cm.sender.fullName}</h3>
        <p className="text-black ">{cm.content}</p>
      </div>
    </div>
  );
}

export default Comments;
