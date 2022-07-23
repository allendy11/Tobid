import React, { useEffect } from "react";
import "./css/SearchWord.css";
import IItem from "../../Interface/IItem";
const SearchWord = ({
  word,
  searchList,
  setSearchList,
  filteredItems,
  setFilteredItems,
  itemList,
}: {
  word: string;
  searchList: {
    list: string[];
  };
  setSearchList: React.Dispatch<
    React.SetStateAction<{
      list: string[];
    }>
  >;
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  itemList: IItem[];
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement) {
      const name = e.target.id;
      const _searchList = searchList.list.filter((el) => el !== name);
      if (_searchList.length === 0) {
        setSearchList({
          list: [],
        });
      } else {
        setSearchList({
          list: _searchList,
        });
      }
    }
  };
  useEffect(() => {
    if (searchList.list.length === 0) {
      setFilteredItems([...itemList]);
    } else {
      searchList.list.map((el) => {
        const _filteredItems = itemList.filter((ele) =>
          ele.title.toLowerCase().includes(el.toLowerCase())
        );
        setFilteredItems([..._filteredItems]);
      });
    }
  }, [searchList.list]);
  console.log(searchList);
  return (
    <div
      id={word}
      className="searchWord-container"
      onClick={(e) => handleClick(e)}
    >
      <span>{word}</span>
      <div id="btn-delete-searchwWord">x</div>
    </div>
  );
};

export default SearchWord;
