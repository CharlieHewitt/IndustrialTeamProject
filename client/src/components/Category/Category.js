import React from "react";
import styles from "./Category.module.css";
import "./index.css";

const Category = ({ title, checked, onChange }) => {
  return (
    <div>
      <label for={title}>{title}</label>
      <input id={title} type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default Category;
