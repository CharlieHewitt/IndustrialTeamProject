import React from "react";
import PlusMinus from "../PlusMinus";
import styles from "./HostSettingRow.module.css";
import "./index.css";

const HostSettingRow = ({ min = 0, max = 0, value, setValue, title }) => {
  return (
    <div className={styles.row}>
      <div className={styles.rowTitle}>{title}</div>
      <PlusMinus
        setValue={setValue}
        value={value}
        minValue={min}
        maxValue={max}
      />
    </div>
  );
};

export default HostSettingRow;
