import React from "react";
import { Link } from "react-router-dom";
import "./PostModal.css";
const PostModal = () => {
  return (
    <div id="PostModal">
      <Link to="/post">
        <div className="btn-postModal">
          <span>+</span>
        </div>
      </Link>
    </div>
  );
};

export default PostModal;
