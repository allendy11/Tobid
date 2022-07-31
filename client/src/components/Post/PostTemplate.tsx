import React, { useState, useRef } from "react";
import "./PostTemplate.css";
const PostTemplate = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    price: "",
    comments: "",
    picture: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id === "title") {
      console.log("t");
    } else if (e.target.id === "price") {
      console.log("p");
    } else if (e.target.id === "comments") {
      console.log("c");
    } else if (e.target.id === "picture") {
      console.log("pt");
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {};
  return (
    <div id="PostTemplate">
      <div className="postTemplate-container">
        <div className="postTemplate-box">Post Trade</div>
        <div className="postTemplate-box">
          <form action="post">
            <div className="userInput title">
              <div>Title</div>
              <input id="title" type="text" onChange={(e) => handleChange(e)} />
            </div>
            <div className="userInput price">
              <div>Price</div>
              <input id="price" type="text" onChange={(e) => handleChange(e)} />
            </div>
            <div className="userInput comments">
              <div>Comments</div>
              <textarea
                id="comments"
                name=""
                cols={50}
                rows={10}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="userInput picture">
              <div>Picture</div>
              <label></label>
              <input
                id="picture"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={inputRef}
              />
              <img id="#" src="" alt="aaa" />
            </div>
            <div id="btn-submit">
              <input type="submit" value="Complete" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTemplate;
