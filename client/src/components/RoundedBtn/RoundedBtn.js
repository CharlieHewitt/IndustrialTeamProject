import React from "react";
import styles from "./RoundedBtn.module.css";
import "./index.css";

const RoundedBtn = ({ onClick, title, style = {}, disabled = false }) => {
  return (
    <button
      className={styles.btn}
      style={{ ...style }}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default RoundedBtn;
