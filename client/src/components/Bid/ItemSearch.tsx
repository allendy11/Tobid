import React, { useState } from "react";
import IItem from "../../Interface/IItem";
import "./css/ItemSearch.css";
const ItemSearch = ({
  itemList,
  filteredItems,
  setFilteredItems,
}: {
  itemList: IItem[];
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}) => {
  const [userInput, setUserInput] = useState({
    search: "",
  });
  const [searchList, setSearchList] = useState({
    list: [],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ search: e.target.value.toLowerCase() });
  };
  const searchItem = () => {
    const _filteredItems = filteredItems.filter((el) =>
      el.title.toLowerCase().includes(userInput.search)
    );
    setFilteredItems([..._filteredItems]);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    searchItem();
  };
  return (
    <div id="ItemSearch">
      <div className="itemSearch-container">
        <div className="itemSearch-box">
          <input
            type="text"
            placeholder="Search you want"
            onChange={(e) => handleChange(e)}
          />
          <div id="btn-itemSearch" onClick={(e) => handleClick(e)}>
            Search
          </div>
        </div>
        <div className="itemSearch-box">
          {/* {searchList.length === 0 ? null : (
          <div>
            {searchList.map((el) => (
              <div>{el}</div>
            ))}
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;
