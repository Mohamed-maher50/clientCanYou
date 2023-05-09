import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SkillButton } from "../smallComponents/skillsButton";
import axios from "axios";
import { PostSkeleton } from "./Skeleton";
import Comments from "../comments/Comments";
import { useDispatch } from "react-redux";
import { pushChildren } from "../../store/Layout";
import { formatNumbers } from "../../utils/formatNumbers";
import { addComment, addLike } from "../../store/postReducer";
import { displayError } from "../../validate/displayError";

var i = 0;
function Post({ post }) {
  console.log(post);
  const dispatch = useDispatch();
  const comment = useRef("");
  const sendLike = async () => {
    const res = await dispatch(addLike(post._id));
  };
  const sendComment = async () => {
    const res = await dispatch(
      addComment({ postId: post._id, content: comment.current.value })
    );
    if (!res.error) {
      displayError("success", { type: "success" });
      comment.current.value = "";
    }
  };
  const showComments = async () => {
    try {
      const { data } = await axios.get(`/comments/getComments/${post._id}`);
      console.log(data);
      if (data) {
        let CommentElem = data.comments.map((com, index) => {
          return <Comments cm={com} key={index} />;
        });
        dispatch(
          pushChildren(
            <div
              className="  border border-transparent bg-main rounded-lg overflow-y-auto "
              key={i++}
            >
              {CommentElem}
            </div>
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!post) return <PostSkeleton />;
  return (
    <>
      <article className="w-fit mx-auto p-3 my-4 bg-darkWhite shadow-lg border-b-4 border-secondary">
        <div className="mt-4">
          <header>
            <div className="flex items-center w-full">
              <div className="flex items-center  justify-end w-full">
                <h2 className="text-open text-end mx-2 text-xl font-semibold capitalize">
                  {post.author.fullName}
                  <span className="text-gray-400 mt-1  font-mono  text-sm block">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </h2>

                <div className="rounded-full h-16 w-16 ">
                  <img
                    src={post.author.AvatarUrl}
                    width="100%"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                    alt="userImage"
                  />
                </div>
              </div>
            </div>
          </header>
          <div className="flex justify-end my-2">
            {post.skills?.map((sk, indexSkill) => {
              return <SkillButton skill={sk} key={indexSkill} />;
            })}
          </div>
          <p className="text-open text-start capitalize text-xl">
            {post.title}
          </p>
          <section className="my-4 ">
            <img
              src="/logo.png"
              className="w-[600px] object-cover pointer-events-none"
              alt="logo"
            />
          </section>
          <footer className=" py-3  ">
            <div className="flex">
              <div className="flex items-center">
                <span className=" bg-red-600 w-4 h-4 p-3 hover:scale-150 mx-1 duration-500 cursor-pointer flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faHeart} onClick={sendLike} />
                </span>
                <span className="text-gray-600 font-bold text-lg">
                  {formatNumbers(post?.likes?.length)}
                </span>
              </div>
              <div className="w-full flex h-12 rounded-lg overflow-hidden">
                <input
                  type={"text"}
                  spellCheck="false"
                  ref={comment}
                  placeholder="enter comment"
                  className="w-full text-black rounded-l-lg outline-none pl-2 ml-2 "
                />
                <div
                  onClick={sendComment}
                  className="bg-open flex items-center px-4 hover:bg-slate-200 hover:text-open duration-700 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faArrowRight} className=" h-5" />
                </div>
              </div>
            </div>
          </footer>

          <div className="bg-gray-400 cursor-pointer" onClick={showComments}>
            show comment
          </div>
        </div>
      </article>
    </>
  );
}

export default React.memo(Post);
