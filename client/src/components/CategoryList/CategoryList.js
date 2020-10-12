import React from "react";
import Category from "../Category/Category";
import RoundedBtn from "../RoundedBtn/RoundedBtn";
import styles from "./CategoryList.module.css";
import "./index.css";

{
  /* <Category
  title="Category A"
  checked={categories[0].checked}
  onChange={(ev) => {
    categories[0].checked = ev.target.checked;
    setCategories((c) => [categories[0], ...c.slice(1)]);
  }}
/>; */
}

const CategoryList = ({ categories, setCategories }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <RoundedBtn title="Random" />
      </div>
      <div className={styles.row}>
        <Category title="Category A" />
        <Category title="Category A" />
        <Category title="Category A" />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CategoryList;
