import React from "react";
import IItem from "../../Interface/IItem";
import { Link } from "react-router-dom";
import "./css/Others.css";
const Others = ({ otherItems }: { otherItems: IItem[] }) => {
  return (
    <div id="Others">
      {otherItems.map((el) => {
        return (
          <Link to={`/bid/${el.id}`} key={el.id}>
            <div className="others-container">
              <div className="item-image">
                <img src={el.image} alt="" />
              </div>
              <div className="item-contents">
                <div className="item-title">{el.title}</div>
                <div className="item-price">{el.price}</div>
                <div className="item-test"></div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Others;
