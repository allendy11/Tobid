import React from "react";
import IItem from "../Interface/IItem";
import "./css/Item.css";
import { useParams } from "react-router-dom";
import ItemInfo from "../components/Item/ItemInfo";
import Others from "../components/Item/Others";
const Item = ({ itemList }: { itemList: IItem[] }) => {
  const params = useParams();
  const [item] = itemList.filter((el) => el.id === Number(params.id));
  const otherItems = itemList.filter((el) => el.id !== Number(params.id));
  return (
    <div id="Item">
      <ItemInfo item={item} />
      <Others otherItems={otherItems} />
    </div>
  );
};

export default Item;
