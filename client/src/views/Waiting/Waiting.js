import React, { useState, useEffect } from "react";
import styles from "./Waiting.less";
import Modal from "../../components/Modal/Modal";
import API from "../../api";
import { useHistory } from "react-router-dom";
import Instructions from "../../components/Instructions";

const Waiting = ({ gameState, gameUpdate }) => {
  const history = useHistory();

  const [players, setPlayers] = useState([]);

  // Get data from api
  const handleStart = async () => {
    const { lobbyId, success } = await API.startQuiz(
      gameState.lobbyId,
      gameState.hostId
    );

    if (!success) {
      alert("Error starting the game");
      gameUpdate({});
      history.push("/");
    } else {
      gameUpdate({ lobbyId });
      history.push(`/quizing`); //Push data when click the "Start" button
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await API.getLobbyPlayers(gameState.lobbyId);

      setPlayers(res.players);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  return (
    <div className={styles.waiting}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.msg}>
            {"GAME CODE: "}
            {gameState.lobbyId}
          </div>
          {/*<div className={styles.setting}>Settings</div>*/}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.blank} />
        <div className={`${styles.left1} ${styles.box}`}>
          {"COMPETITORS: "}
          {players.map((player) => (
            <div>{player.playerName}</div>
          ))}
        </div>
        <div className={`${styles.left2} ${styles.box}`}>
          {"CATEGORIES: "}
          {gameState.categories.map((cat) => (
            <div>{cat}</div>
          ))}
        </div>
        <div className={styles.right}>
          <div className={`${styles.top} ${styles.box}`}>
            {`TIME PER QUESTION: ${gameState.answerTime}s`}
          </div>
          <div className={`${styles.bottom} ${styles.box}`}>
            {`NUMBER OF QUESTIONS: ${gameState.numQuestions}`}
          </div>
        </div>
        <div className={styles.blank} />
      </div>
      <div className={styles.footer}>
        <div className={styles.blank} />
        <div className={styles.btn1} onClick={openModal}>
          HOW TO PLAY
        </div>
        <Modal ref={modalRef}>
          <Instructions />
          <button
            className={styles.btn1}
            onClick={() => modalRef.current.close()}
            style={{ alignSelf: "center" }}
          >
            Close!
          </button>
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
