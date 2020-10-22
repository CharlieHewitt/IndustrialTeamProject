import React, { useState, useEffect } from "react";
import styles from "./Waiting.less";
import Modal from "../../components/Modal/Modal";
import API from "../../api";
import { parse } from "querystring";

const Waiting = ({ location: { search }, history }) => {
  const [data, setData] = useState({});

  const [lobbyId, setLobbyId] = useState("");
  const [categories, setCategories] = useState([]);
  const [hostId, setHostId] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [timePQ, setTimePQ] = useState(0);
  const [numQ, setNumQ] = useState(0);


  async function startGame(lobbyId, playerId){
    const res = await API.startQuiz(lobbyId, playerId);
    console.log(res);
  }

  // Get data from api
  const handleStart = () => {
    startGame(lobbyId, hostId);
    history.push(`/quizing?num=${numQ}&time=${timePQ}&active=1&lobbyId=${lobbyId}&playerId=${hostId}`); //Push data when click the "Start" button
  };

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };

  useEffect(() => {
    const dataPassed = parse(search.split("?")[1]);
    setTimePQ(dataPassed.timer);
    setNumQ(dataPassed.numQ);
    setLobbyId(dataPassed.lobbyId);
    setHostId(dataPassed.hostId);
    console.log(dataPassed);
    setCategories(dataPassed.categories);

    getPlayers(dataPassed.lobbyId);
    console.log(playerList);

    async function getPlayers(lobbyId){
      const res2 = await API.getLobbyPlayers(lobbyId);
      console.log(res2.players[0]);
      setPlayerList(res2.players);
    }
  
    setData({
      title: "GAME CODE：",
      categories:"CATEGORIES: ",
      time: "TIME PER QUESTION: ",
      num: "NUMBER OF QUESTIONS: ",
    });

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

  <div className={`${styles.left1} ${styles.box}`}>{data.competitors}{hostname}</div>
        <div className={`${styles.left2} ${styles.box}`}>{data.categories}{categories}</div>
        <div className={styles.right}>
          <div className={`${styles.top} ${styles.box}`}>{data.time}{timePQ}s</div>
          <div className={`${styles.bottom} ${styles.box}`}>{data.num}{numQ}</div>
        </div>
        <div className={styles.blank} />
      </div>
      <div className={styles.footer}>
        <div className={styles.blank} />
        <div className={styles.btn1} onClick={openModal}>HOW TO PLAY</div>
        <Modal ref={modalRef}>
          <h2>How To Play</h2>
          <p>Instruction 1</p>
          <p>Instruction 2</p>
          <p>Instruction 3</p>
          <p>Instruction 4</p>
          <p>Instruction 5</p>

          <button className={styles.btn1} onClick={() => modalRef.current.close()} style={{alignSelf:"center"}}>Close!</button>
          </Modal>
        <div onClick={() => handleStart()} className={styles.btn2}>
          START
        </div>
        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default Waiting;
