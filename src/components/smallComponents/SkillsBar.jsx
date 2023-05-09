import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SkillButton } from "../smallComponents/skillsButton";
import { faPenToSquare, faSlash } from "@fortawesome/free-solid-svg-icons";
import AddSkills from "./AddSkills";
import { pushChildren } from "../../store/Layout";
var i = 0;
function SkillsBar({ currentUser }) {
  const { user } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const pushToShow = () => {
    dispatch(pushChildren());
    dispatch(
      pushChildren(
        <div className="flex flex-col items-center" key={++i}>
          <AddSkills key={i++} currentUser={currentUser} />
          <div
            className="flex justify-center w-full my-4 gap-2 flex-wrap"
            key={++i}
          >
            {currentUser?.skills.map((sk, index) => {
              return (
                <SkillButton
                  skill={sk}
                  randomColor
                  key={index}
                  currentUser={currentUser}
                  user={user}
                  canEdit
                />
              );
            })}
          </div>
        </div>
      )
    );
  };
  if (!currentUser) return <>skilton</>;
  return (
    <>
      <div className="text-center text-open rounded-lg p-3 w-full bg-white text-2xl capitalize  font-bold">
        SKILLS
        {currentUser?._id == user?._id ? (
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={pushToShow}
            className="ml-3 text-open cursor-pointer"
          />
        ) : (
          ""
        )}
        <div className="flex justify-center w-full my-4 gap-2 flex-wrap">
          {currentUser?.skills.map((sk, index) => {
            return (
              <SkillButton
                skill={sk}
                randomColor
                key={index}
                currentUser={currentUser}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SkillsBar;
