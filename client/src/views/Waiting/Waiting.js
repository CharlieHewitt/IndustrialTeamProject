import React, { useState, useEffect } from "react";
import styles from "./Waiting.less";
import Modal from "../../components/Modal/Modal";
import API from "../../api";
import { parse } from "querystring";

const Waiting = ({ location: { search }, history }) => {
  const [data, setData] = useState({});

  const [hostname] = useState("User1");
  const [lobbyId, setLobbyId] = useState("");
  const [res2, setRes2] = useState([]);
  const [categories, setCategories] = useState([]);
  const [test, setTest] = useState([]);
  // const [categories, setCategories] = useState([]);

  // Get data from api
  const handleStart = () => {
    history.push(`/quizing?num=3&time=20&active=1`); //Push data when click the "Start" button
  };

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };
  console.log(lobbyId);

  useEffect(() => {
    const data1 = parse(search.split("?")[1]);
    setTest(data1.hostName);
    console.log(data1.hostName);
    
    async function getAPIData(test){
      const res = await API.createLobby(test);
      const res2 = await API.getNextQuestion(res.lobbyId, res.hostId, "2");
      setRes2(res2);
      setCategories(res2.questionInfo.category);

      console.log(res2);
      setLobbyId(res.lobbyId);

      // const res2 = await API.getChosenCategories(lobbyId);
      // setCategories(res2);
    
      setData({
        title: "GAME CODE：",
        competitors: "",
        categories: "",
        time: "TIME PER QUESTION: 20s",
        num: "NUMBER OF QUESTIONS: 3",
      });
    }
    
    getAPIData(hostname);
  
  }, [search, history]);

  return (
    <div className={styles.waiting}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.msg}>{data.title}{lobbyId}</div>
          {/*<div className={styles.setting}>Settings</div>*/}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.blank} />
  <div className={`${styles.left} ${styles.box}`}>{data.competitors}{test}</div>
        <div className={`${styles.left} ${styles.box}`}>{data.categories}{categories}</div>
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
