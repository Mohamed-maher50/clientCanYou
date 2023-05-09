import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";

import { displayError } from "../../validate/displayError";

function SkillButton({ skill, randomColor, currentUser, user, canEdit }) {
  // const dispatch = useDispatch();

  const colors = [
    "bg-orange-400",
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
  ];
  const deleteSkill = async (s) => {
    s = s.toLowerCase();

    try {
      const { data } = await axios.delete(`/deleteSkill/${s}`);
      if (data) displayError("deleted", { type: "success" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" relative group mx-2 w-fit group cursor-pointer  rounded-md  overflow-hidden">
      <button
        disabled
        className={` ${
          randomColor
            ? colors[Math.round(Math.random() * (colors.length - 1))]
            : "bg-open"
        } capitalize text-white min-w-[80] text-base py-1 px-2 `}
      >
        {skill}
      </button>

      {currentUser?._id == user?._id && canEdit ? (
        <span
          onClick={() => deleteSkill(skill)}
          className="group-hover:scale-100 scale-0 duration-200 ease-in-out opacity-80 flex items-center justify-center absolute w-full h-full bg-red-500 z-50 top-0 left-0 "
        >
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-white" />
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export { SkillButton };
