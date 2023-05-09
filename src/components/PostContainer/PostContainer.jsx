import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/postReducer";
import Post from "../Post/ProfilePost";

function PostContainer() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    const getallPosts = async () => {
      let data = await dispatch(getPosts());
    };

    getallPosts();
  }, []);

  return (
    <>
      {posts?.map((pt, index) => (
        <Post post={pt} key={index} />
      ))}
    </>
  );
}

export default PostContainer;
