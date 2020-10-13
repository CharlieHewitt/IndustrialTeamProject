import React from "react";
import styles from "./Home.less";

const Home = ({ history }) => {
  // Get data from api
  const handleStart = () => {
    history.push("/answer?num=5&time=20&active=1");//Push data when click the "Start" button
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo} />
          <div className={styles.msg}>GAME CODE：******</div>
          <div className={styles.setting}>Settings</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.blank} />
        <div className={`${styles.left} ${styles.box}`}>COMPETITORS</div>
        <div className={`${styles.left} ${styles.box}`}>
          TOPICS / CATEGORIES
        </div>
        <div className={styles.right}>
          <div className={`${styles.top} ${styles.box}`}>TIME PER QUESTION</div>
          <div className={`${styles.bottom} ${styles.box}`}>
            NUMBER OF QUESTIONS
          </div>
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
export default Home;
