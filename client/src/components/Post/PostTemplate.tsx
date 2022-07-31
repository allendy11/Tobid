import React from "react";
import "./PostTemplate.css";
const PostTemplate = () => {
  return (
    <div id="PostTemplate">
      <div className="postTemplate-container">
        <div className="postTemplate-box">Post Trade</div>
        <div className="postTemplate-box">
          <div className="userInput title">
            <div>Title</div>
            <input type="text" />
          </div>
          <div className="userInput price">
            <div>Price</div>
            <input type="test" />
          </div>
          <div className="userInput comments">
            <div>Comments</div>
            <textarea name="" id="" cols={50} rows={12}></textarea>
          </div>
          <div className="userInput picture">
            <div>Picture</div>
            <label></label>
            <input type="file" />
          </div>
        </div>
        <div className="postTemplate-box">
          <div className="btn-postComplete">Complete</div>
        </div>
      </div>
    </div>
  );
};

export default PostTemplate;
