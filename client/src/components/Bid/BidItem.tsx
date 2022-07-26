import React from "react";
import IItem from "../../Interface/IItem";
import "./css/BidItem.css";
const BidItem = ({ filteredItem }: { filteredItem: IItem }) => {
  return (
    <div id="BidItem">
      <div className="bidItem-container">
        <div className="item-image">
          <img src={filteredItem.image} alt="" />
        </div>
        <div className="item-contents">
          <div className="item-title">{filteredItem.title}</div>
          <div className="item-price">Start: {filteredItem.price}</div>
          <div className="item-test"></div>
        </div>
      </div>
    </div>
  );
};

export default BidItem;
