import React, { useState } from "react";
import IItem from "../../Interface/IItem";
import "./ItemSearch.css";
const ItemSearch = ({ itemList }: { itemList: IItem[] }) => {
  const [userInput, setUserInput] = useState({
    search: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ search: e.target.value.toLowerCase() });
  };
  const searchItem = () => {
    const itemTitleList: string[] = [];
    itemList.forEach((el) => itemTitleList.push(el.title));
    itemTitleList.map((el) => el.toLowerCase());
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    searchItem();
  };
  return (
    <div id="ItemSearch">
      <div className="itemSearch-box">
        <input
          type="text"
          placeholder="Search you want"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div id="btn-itemSearch" onClick={(e) => handleClick(e)}>
        Search
      </div>
    </div>
  );
};

export default ItemSearch;
