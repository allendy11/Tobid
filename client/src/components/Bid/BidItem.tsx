import React from "react";
import IItem from "../../Interface/IItem";
import "./css/BidItem.css";
const BidItem = ({ item }: { item: IItem }) => {
  return (
    <div id="BidItem">
      <div className="bidItem-container">
        <div className="item-image">
          <img src={item.image} alt="" />
        </div>
        <div className="item-contents">
          <div className="item-title">{item.title}</div>
          <div className="item-price">Start: {item.price}</div>
          <div className="item-test"></div>
        </div>
      </div>
    </div>
  );
};

export default BidItem;
