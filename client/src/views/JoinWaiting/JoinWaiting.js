import React, { useState, useEffect } from "react";
import styles from "./JoinWaiting.less";
import Modal from "../../components/Modal/Modal";
import { parse } from "querystring";
import API from "../../api";

const JoinWaiting = ({ location: { search }, history }) => {
  const [data, setData] = useState([]);
  const [lobbyId, setLobbyId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [categories, setCategories] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [timePQ, setTimePQ] = useState(0);
  const [numQ, setNumQ] = useState(0);

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };

  useEffect(() => {
    const data = parse(search.split("?")[1]);
    setLobbyId(data.lobbyId);
    setPlayerName(data.username);

    console.log(data.username);
    joinLobby(data.lobbyId, data.username);
    
    // getCategories(lobbyId);
    getPlayers(data.lobbyId);
    console.log(playerId);
    getSettings(data.lobbyId, playerId);

    async function joinLobby(lobbyId, playerName){
      const res1 = await API.joinLobby(lobbyId, playerName);
      console.log(res1);
      if(!res1.success){
        alert("Lobby doesn't exist! Please check your game code again")
        history.push("/home");
      }else{
        setPlayerId(res1.playerId);
      }
    }

    async function getPlayers(lobbyId){
      const res3 = await API.getLobbyPlayers(lobbyId);
      console.log(res3);
      setPlayerList(res3.players);
    }

    async function getSettings(lobbyId, playerId){
      const res4 = await API.checkQuizStatus(lobbyId, playerId);
      console.log(res4);
      setTimePQ(res4.settings.answerTime);
      setNumQ(res4.settings.numQuestions);
      setCategories(res4.categories);//seems the categories are not coming back from backend
    }

    async function checkIfStart(lobbyId, playerId){
      const res = await API.checkQuizStatus(lobbyId, playerId);
      console.log(res)
      return (res.started)
    }

    setData({
      title: "GAME CODE: ",
      competitors: "COMPETITORS",
      topics: "CATEGORIES",
      time: "TIME PER QUESTION: ",
      num: "NUMBER OF QUESTIONS: ",
    });

    const timer = setInterval(() => {
      const ifStarted = checkIfStart(lobbyId, playerId);
      console.log(ifStarted)
      if(ifStarted){
          // history.push(`/quizing?num=${numQ}&time=${timePQ}&active=1&lobbyId=${lobbyId}&playerId=${playerId}`);
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    }
  }, [search, history]);

  // async function checkIfStart(lobbyId, playerId){
  //   const res = await API.checkQuizStatus(lobbyId, playerId);
  //   if(res.started){
  //     history.push(`/quizing?num=${numQ}&time=${timePQ}&active=1&lobbyId=${lobbyId}&playerId=${playerId}`);
  //   }
  // }

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

        <div className={`${styles.left1} ${styles.box}`}>{playerList}</div>
        <div className={`${styles.left2} ${styles.box}`}>{categories}</div>
        <div className={styles.right}>
          <div className={`${styles.top} ${styles.box}`}>{data.time}{timePQ}s</div>
          <div className={`${styles.bottom} ${styles.box}`}>{data.num}{numQ}</div>
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
