import React, { useState, useEffect } from "react";
import styles from "./Waiting.less";
import Modal from "../../components/Modal/Modal";
import API from "../../api";

const Waiting = ({ history }) => {
  const [data, setData] = useState({});

  const [hostname] = useState("lobby");
  const [lobbyId, setLobbyId] = useState("");
  // const [categories, setCategories] = useState([]);

  // Get data from api
  const handleStart = () => {
    history.push("/quizing?num=5&time=20&active=1"); //Push data when click the "Start" button
  };

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };
  console.log(lobbyId);
  useEffect(() => {

    async function getAPIData(hostname){
      const res = await API.createLobby(hostname);

      console.log(res.lobbyId);
      setLobbyId(res.lobbyId);

      // const res2 = await API.getChosenCategories(lobbyId);
      // setCategories(res2);
    
      setData({
        title: "GAME CODE：",
        competitors: "COMPETITORS",
        topics: "",
        time: "TIME PER QUESTION",
        num: "NUMBER OF QUESTIONS",
      });
    }
    
    getAPIData(hostname);
  
  }, []);

  return (
    <div className={styles.waiting}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo} />
          <div className={styles.msg}>{data.title}{lobbyId}</div>
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
        <div onClick={() => handleStart()} className={styles.btn}>
          START
        </div>
        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default Waiting;
