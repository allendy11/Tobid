import React, { useEffect } from "react";
import "./css/SearchWord.css";
import IItem from "../../Interface/IItem";
import ISearchWord from "../../Interface/ISearchWord";
const SearchWord = ({
  id,
  word,
  searchList,
  setSearchList,
  filteredItems,
  setFilteredItems,
  itemList,
}: {
  id: number;
  word: string;
  searchList: ISearchWord[];
  setSearchList: React.Dispatch<React.SetStateAction<ISearchWord[]>>;
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  itemList: IItem[];
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement) {
      const id = e.target.id;
      const _searchList = searchList.filter((el) => el.id !== Number(id));
      setSearchList([..._searchList]);
      if (searchList.length === 1) {
        setFilteredItems([...itemList]);
      } else {
        let _filteredItems = [...itemList];
        _searchList.forEach((el) => {
          console.log(el);
          _filteredItems = _filteredItems.filter((ele) => {
            return ele.title.toLowerCase().includes(el.word.toLowerCase());
          });
          console.log(_filteredItems);
          setFilteredItems(_filteredItems);
        });
      }
    }
  };

  return (
    <div
      id={`${id}`}
      className="searchWord-container"
      onClick={(e) => handleClick(e)}
    >
      <span>{word}</span>
      <div id="btn-delete-searchwWord">x</div>
    </div>
  );
};

export default SearchWord;
