import React, { useState, useEffect } from "react";
import styles from "./Waiting.less";

const Waiting = ({ history }) => {
  const [data, setData] = useState({});
  // Get data from api
  const handleStart = () => {
    history.push("/quizing?num=5&time=20&active=1"); //Push data when click the "Start" button
  };

  useEffect(() => {
    setData({
      title: "GAME CODE：******",
      competitors: "COMPETITORS",
      topics: "TOPICS / CATEGORIES",
      time: "TIME PER QUESTION",
      num: "NUMBER OF QUESTIONS",
    });
  }, []);

  return (
    <div className={styles.waiting}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo} />
          <div className={styles.msg}>{data.title}</div>
          <div className={styles.setting}>Settings</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.blank} />
        <div className={`${styles.left} ${styles.box}`}>{data.competitors}</div>
        <div className={`${styles.left} ${styles.box}`}>{data.topics}</div>
        <div className={styles.right}>
          <div className={`${styles.top} ${styles.box}`}>{data.time}</div>
          <div className={`${styles.bottom} ${styles.box}`}>{data.num}</div>
        </div>
        <div className={styles.blank} />
      </div>
      <div className={styles.footer}>
        <div className={styles.blank} />
        <div className={styles.btn}>HOW TO PLAY</div>
        <div onClick={() => handleStart()} className={styles.btn}>
          START
        </div>
        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default Waiting;
