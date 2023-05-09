import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/Layout";
import { addSkill } from "../../store/user";
import { displayError } from "../../validate/displayError";
function AddSkills() {
  const addSkillBox = useRef("");
  const dispatch = useDispatch();
  const submitSkill = async () => {
    const res = await dispatch(addSkill(addSkillBox.current.value));
    if (!res.error) {
      addSkillBox.current.value = "";
      displayError("success", { type: "success" });
      return dispatch(toggle());
    }
  };
  return (
    <div className="w-fit h-fit flex">
      <input
        ref={addSkillBox}
        className="text-main px-9 outline-none  font-bold capitalize rounded-l-lg shadow "
        spellCheck={false}
        placeholder="Add your skills"
      />

      <button
        onClick={submitSkill}
        className="bg-secondary group   p-3 rounded-r-lg hover:bg-open hover:text-darkWhite duration-500"
      >
        <FontAwesomeIcon
          icon={faCheck}
          className="group-hover:scale-150 duration-300"
        />
      </button>
    </div>
  );
}

export default AddSkills;
