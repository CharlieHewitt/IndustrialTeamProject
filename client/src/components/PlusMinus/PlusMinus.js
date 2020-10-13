import React from "react";
import styles from "./PlusMinus.module.css";
import "./index.css";

const PlusMinus = ({ setValue, value, maxValue = 0, minValue = 0 }) => {
  return (
    <div className={styles.wrapper}>
      <span
        className={styles.btn}
        onClick={() => setValue((val) => Math.max(val - 1, minValue))}
      >
        -
      </span>
      <span className={styles.value}>{value}</span>
      <span
        className={styles.btn}
        onClick={() =>
          setValue((val) => (!maxValue ? val + 1 : Math.min(maxValue, val + 1)))
        }
      >
        +
      </span>
    </div>
  );
};

export default PlusMinus;
