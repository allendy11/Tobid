import React, { useState, useEffect } from "react";
import "./css/Bid.css";
import { Link } from "react-router-dom";
import IItem from "../Interface/IItem";
import ItemSearch from "../components/Bid/ItemSearch";
import BidItem from "../components/Bid/BidItem";
import ISearchWord from "../Interface/ISearchWord";
const Bid = ({ itemList }: { itemList: IItem[] }) => {
  const [filteredItems, setFilteredItems] = useState([...itemList]);
  const [searchList, setSearchList] = useState<ISearchWord[]>([]);
  // console.log(filteredItems);
  return (
    <div id="Bid">
      <div className="bid-container">
        <div className="bid-box bid-title">Trade board</div>
        <div className="bid-box bid-contents">
          <ItemSearch
            itemList={itemList}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
            searchList={searchList}
            setSearchList={setSearchList}
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
