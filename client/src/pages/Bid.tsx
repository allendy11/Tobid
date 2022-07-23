import React, { useState, useEffect } from "react";
import "./css/Bid.css";
import { Link } from "react-router-dom";
import IItem from "../Interface/IItem";
import ItemSearch from "../components/Bid/ItemSearch";
import BidItem from "../components/Bid/BidItem";
const Bid = ({ itemList }: { itemList: IItem[] }) => {
  const [filteredItems, setFilteredItems] = useState([...itemList]);
  // useEffect(() => {
  //   if (itemList.length > 0) {
  //     const _itemList = [...itemList]
  //     setFilteredItems([..._itemList]);
  //   }
  // }, [filteredItems]);
  return (
    <div id="Bid">
      <div className="bid-container">
        <div className="bid-box bid-title">Trade board</div>
        <div className="bid-box bid-contents">
          <ItemSearch
            itemList={itemList}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
          />
          <div className="bid-board">
            {filteredItems.map((el) => {
              return (
                <Link to={`/bid/${el.id}`} key={el.id}>
                  <BidItem item={el} />
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
