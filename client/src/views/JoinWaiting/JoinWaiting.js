import React, { useState, useEffect } from "react";
import styles from "./JoinWaiting.less";
import Modal from "../../components/Modal/Modal";
import { parse } from "querystring";
import API from "../../api";

const JoinWaiting = ({ location: { search }, history }) => {
  const [data, setData] = useState([]);
  const [lobbyId, setLobbyId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [categories, setCategories] = useState([]);
  const [playerList, setPlayerList] = useState({});
  const [timePQ, setTimePQ] = useState(0);
  const [num, setNum] = useState(0);

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };

  useEffect(() => {
    const data = parse(search.split("?")[1]);
    setLobbyId(data.lobbyId);

    const joinRes = joinLobby(data.lobbyId, data.username);
    // console.log(joinRes);
    // getCategories(lobbyId);
    // getPlayers(data.lobbyId);
    getSettings(lobbyId, playerId);

    async function joinLobby(lobbyId, playerName){
      const res1 = await API.joinLobby(lobbyId, playerName);
      console.log(res1);
      setPlayerId(res1.playerId);
    }

    // async function getCategories(lobbyId){
    //   const res2 = await API.getChosenCategories(lobbyId);
    //   console.log(res2);
    // }

    // async function getPlayers(lobbyId){
    //   const res3 = await API.getLobbyPlayers(lobbyId);
    //   console.log(res3);
    // }

    async function getSettings(lobbyId, playerId){
      const res4 = await API.startQuiz(lobbyId, playerId);
      console.log(res4);
    }

    setData({
      title: "GAME CODE: ",
      competitors: "COMPETITORS",
      topics: "CATEGORIES",
      time: "TIME PER QUESTION",
      num: "NUMBER OF QUESTIONS",
    });
  }, []);
  console.log(playerId);
  console.log(lobbyId);
  return (
    <div className={styles.joinwaiting}>
      <div className={styles.header}>
        <div className={styles.container}>
            <div className={styles.msg}>{data.title}{lobbyId}</div>
          {/* <div className={styles.setting}>Settings</div> */}
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
