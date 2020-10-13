import React from "react";
import styles from "./RoundedBtn.module.css";
import "./index.css";

const RoundedBtn = ({ onClick, title, style = {} }) => {
  return (
    <button className={styles.btn} style={{ ...style }} onClick={onClick}>
      {title}
    </button>
  );
};

export default RoundedBtn;
