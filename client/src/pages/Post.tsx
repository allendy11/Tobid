import React from "react";
import "./css/Post.css";
import PostTemplate from "../components/Post/PostTemplate";
const Post = () => {
  return (
    <div id="Post">
      <div className="post-container">
        <PostTemplate />
      </div>
    </div>
  );
};

export default Post;
