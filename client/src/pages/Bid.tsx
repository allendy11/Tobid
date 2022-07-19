import React from "react";
import "./css/Bid.css";
import { Link } from "react-router-dom";
import IItem from "../Interface/IItem";
const Bid = ({ itemList }: { itemList: IItem[] }) => {
  return (
    <div id="Bid">
      <div className="bid-container">
        <div className="bid-box bid-title">Trade board</div>
        <div className="bid-box bid-contents">
          <div className="bid-search">
            <div className="bid-search-box">
              <input type="text" placeholder="Search you want" />
            </div>
            <div id="btn-bid-search">Search</div>
          </div>
          <div className="bid-board">
            {itemList.map((el) => {
              return (
                <Link to={`/bid/${el.id}`} key={el.id}>
                  <div className="item">
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
        </div>
      </div>
    </div>
  );
};

export default Bid;
