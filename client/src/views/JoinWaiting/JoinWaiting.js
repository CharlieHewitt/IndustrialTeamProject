import React, { useState, useEffect } from "react";
import styles from "./JoinWaiting.less";
import Modal from "../../components/Modal/Modal";

const JoinWaiting = ({ history }) => {
  const [data, setData] = useState({});

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };


  useEffect(() => {
    setData({
      title: "******",
      competitors: "COMPETITORS",
      topics: "CATEGORIES",
      time: "TIME PER QUESTION",
      num: "NUMBER OF QUESTIONS",
    });
  }, []);

  return (
    <div className={styles.joinwaiting}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo} />
            <div className={styles.msg}>GAME CODE：{data.title}</div>
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
        <div className={styles.btn} onClick={openModal}>HOW TO PLAY</div>
        <Modal ref={modalRef}>
          <h2>How To Play</h2>
          <p>Instruction 1</p>
          <p>Instruction 2</p>
          <p>Instruction 3</p>
          <p>Instruction 4</p>
          <p>Instruction 5</p>

          <button className={styles.btn} onClick={() => modalRef.current.close()} style={{alignSelf:"center"}}>Close!</button>
          </Modal>

        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default JoinWaiting;
