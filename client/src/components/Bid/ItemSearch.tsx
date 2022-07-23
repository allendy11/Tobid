import React, { useState, useRef } from "react";
import IItem from "../../Interface/IItem";
import "./css/ItemSearch.css";
import SearchWord from "./SearchWord";
const ItemSearch = ({
  itemList,
  filteredItems,
  setFilteredItems,
}: {
  itemList: IItem[];
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState({
    search: "",
  });
  const [searchList, setSearchList] = useState<{ list: string[] }>({
    list: [],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ search: e.target.value });
  };
  const searchItem = () => {
    // const _filteredItems = filteredItems.filter((el) =>
    //   el.title.toLowerCase().includes(userInput.search.toLowerCase())
    // );
    // setFilteredItems([..._filteredItems]);
    setSearchList({
      list: [...searchList.list, userInput.search],
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    searchItem();
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      searchItem();
    }
  };
  return (
    <div id="ItemSearch">
      <div className="itemSearch-container">
        <div className="itemSearch-box">
          <input
            type="text"
            placeholder="Search you want"
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeyUp(e)}
          />
          <div id="btn-itemSearch" onClick={(e) => handleClick(e)}>
            Search
          </div>
        </div>
        <div className="itemSearch-box">
          {searchList.list.map((el, idx) => {
            return (
              <div key={idx}>
                <SearchWord
                  word={el}
                  searchList={searchList}
                  setSearchList={setSearchList}
                  filteredItems={filteredItems}
                  setFilteredItems={setFilteredItems}
                  itemList={itemList}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;
