import React from "react";
import styles from "./SettingsBtn.module.css";
import "./index.css";

const SettingsBtn = ({ size = 80, style = {} }) => {
  return (
    <div
      className={styles.btn}
      style={{ ...style, width: size, height: size, lineHeight: `${size}px` }}
    >
      Settings
    </div>
  );
};

export default SettingsBtn;
