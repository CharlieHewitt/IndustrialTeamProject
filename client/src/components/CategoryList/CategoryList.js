import React from "react";
import Category from "../Category/Category";
import RoundedBtn from "../RoundedBtn/RoundedBtn";
import styles from "./CategoryList.module.css";
import "./index.css";

const randomKey = function (obj) {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

const CategoryList = ({ categories, setCategories }) => {
  let catSize = 3; // how many categories per row
  let rows = Object.keys(categories)
    .map((cat) => (
      <Category
        title={cat}
        checked={categories[cat]}
        onChange={(ev) =>
          setCategories({ ...categories, [cat]: ev.target.checked })
        }
      />
    ))
    .reduce((prev, curr, index) => {
      // create element groups with size 3, result looks like:
      // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
      index % catSize === 0 && prev.push([]);
      prev[prev.length - 1].push(curr);
      return prev;
    }, [])
    .map((rowContent) => <div className={styles.row}>{rowContent}</div>);

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <RoundedBtn
          title="Random"
          onClick={() =>
            setCategories({ ...categories, [randomKey(categories)]: true })
          }
        />
        <h1 className={styles.title}>Categories</h1>
        <RoundedBtn title="Random" style={{ visibility: "hidden" }} />
      </div>
      {rows}
    </div>
  );
};

export default CategoryList;
