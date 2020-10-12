import React from "react";
import styles from "./RoundedBtn.module.css";
import "./index.css";

const RoundedBtn = ({ onClick, title }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {title}
    </button>
  );
};

export default RoundedBtn;
