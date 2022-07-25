import React, { useState, useRef } from "react";
import IItem from "../../Interface/IItem";
import ISearchWord from "../../Interface/ISearchWord";
import "./css/ItemSearch.css";
import SearchWord from "./SearchWord";
const ItemSearch = ({
  itemList,
  filteredItems,
  setFilteredItems,
  searchList,
  setSearchList,
}: {
  itemList: IItem[];
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  searchList: ISearchWord[];
  setSearchList: React.Dispatch<React.SetStateAction<ISearchWord[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState({
    searchWord: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ searchWord: e.target.value });
  };
  const searchItem = () => {
    const _filteredItems = filteredItems.filter((el) =>
      el.title.toLowerCase().includes(userInput.searchWord.toLowerCase())
    );
    setFilteredItems([..._filteredItems]);
    if (searchList.length === 0) {
      setSearchList([
        {
          id: 1,
          word: userInput.searchWord,
        },
      ]);
    } else {
      setSearchList([
        ...searchList,
        {
          id: searchList[searchList.length - 1].id + 1,
          word: userInput.searchWord,
        },
      ]);
    }
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
          {searchList.map((el, idx) => {
            return (
              <div key={idx}>
                <SearchWord
                  id={el.id}
                  word={el.word}
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
