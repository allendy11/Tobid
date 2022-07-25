import { time } from "console";
import React from "react";
import IItem from "../../Interface/IItem";

const ItemInfo = ({ item }: { item: IItem }) => {
  return (
    <div id="ItemInfo">
      <div className="item-container">
        <div className="item-image">
          <img src={item.image} alt="" />
        </div>
        <div className="item-info">
          <div className="username">{item.username}</div>
          <div className="title">{item.title}</div>
          <div className="price">{item.price}</div>
          <div className="comments">{item.contents}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
