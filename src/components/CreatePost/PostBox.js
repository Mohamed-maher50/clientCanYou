import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { PostRequest } from "../../utils/ProfileMethods";
import { checkLang } from "../../utils/isLang";
import { displayError } from "../../validate/displayError";

function CreatePost() {
  const [skillSelected, setSkillsSelected] = useState([]);
  const [dir, setDir] = useState(false);
  const input = useRef("");
  const type = useRef("");
  const title = useRef("");
  const filed = useRef("");
  const addSkills = () => {
    setSkillsSelected((prev) => [...prev, input.current.value]);
  };
  const handleSubmit = async () => {
    const [data, err] = await PostRequest("/createPost", {
      userType: type.current.value,
      filed: filed.current.value,
      title: title.current.value,
      skills: skillSelected,
    });
    if (err) return;
    displayError("created ", { type: "success" });
  };
  const langDir = (e) => {
    if (checkLang(e.target.value) != dir) {
      setDir(!dir);
    }
  };
  return (
    <div className="mt-4 w-full border-b-4 border-secondary rounded-lg bg-white shadow-md shadow-secondary p-4 ">
      <textarea
        className=" bg-gray-100 p-5 text-[#333] resize-none w-full outline-none rounded-md min-h-[200px] placeholder:text-open font-bold"
        placeholder="what you need ? "
        spellCheck="false"
        ref={title}
        onChange={langDir}
        dir={dir ? "rtl" : "ltr"}
      />
      <div className="grid grid-cols-3 gap-4 mt-3 text-main relative">
        <select
          defaultValue={"Programming"}
          className="p-2 bg-open text-white "
          ref={filed}
        >
          <option>Programming</option>
        </select>
        <div className="w-full relative left-0">
          <input
            placeholder="skills"
            ref={input}
            className="w-full relative h-full  shadow-lg  p-3 bg-open placeholder:text-white text-white text-lg capitalize"
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            onClick={addSkills}
            className="absolute right-2 top-1 duration-500 hover:scale-150 cursor-pointer text-xl text-white"
          />
        </div>
        <select
          defaultValue={true}
          className="p-2 bg-open text-white "
          placeholder="type"
          ref={type}
        >
          <option
            value={"volunteer"}
            className="p-3 bg-open hover:bg-white font-bold "
          >
            volunteer
          </option>
          <option value={"needy"} className="p-3 hover:bg-white bg-open">
            needy
          </option>
        </select>
      </div>
      <div
        className={`flex relative flex-wrap duration-1000 py-2 overflow-hidden `}
      >
        {skillSelected.map((sk, index) => {
          return (
            <span
              key={index}
              className={`mt-3 animate-waving-left mr-2 duration-1000 px-4 shadow-lg py-2 bg-neutral-100 text-main text-xl rounded-lg`}
            >
              {sk}
            </span>
          );
        })}
      </div>
      <button
        className="main-btn m-auto block  capitalize"
        onClick={handleSubmit}
      >
        submit
      </button>
    </div>
  );
}

export default CreatePost;
