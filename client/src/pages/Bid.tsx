import React, { useState, useEffect } from "react";
import "./css/Bid.css";
import { Link } from "react-router-dom";
import IItem from "../Interface/IItem";
import ItemSearch from "../components/Bid/ItemSearch";
import BidItem from "../components/Bid/BidItem";
import ISearchWord from "../Interface/ISearchWord";
import PostModal from "../components/Modal/PostModal/PostModal";

const Bid = ({ itemList }: { itemList: IItem[] }) => {
  const [filteredItems, setFilteredItems] = useState([...itemList]);
  const [searchList, setSearchList] = useState<ISearchWord[]>([]);

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
            {filteredItems.length === 0 ? (
              <div className="bid-board-box">
                <span>검색결과가 없습니다.</span>
              </div>
            ) : (
              <div className="bid-board-box">
                {filteredItems.map((el) => {
                  return (
                    <Link to={`/bid/${el.id}`} key={el.id}>
                      <BidItem filteredItem={el} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <PostModal />
    </div>
  );
};

export default Bid;
