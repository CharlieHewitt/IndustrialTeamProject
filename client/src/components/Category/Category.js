import React from "react";
import styles from "./Category.module.css";
import "./index.css";

const Category = ({ title, checked, onChange }) => {
  return (
    <div className={styles.wrap}>
      <label className={styles.label} for={title}>
        {title}
      </label>
      <input
        className={styles.checkBox}
        id={title}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default Category;
