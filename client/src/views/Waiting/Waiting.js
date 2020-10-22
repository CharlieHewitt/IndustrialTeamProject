import React, { useState, useEffect } from "react";
import styles from "./Waiting.less";
import Modal from "../../components/Modal/Modal";
import API from "../../api";
import { useHistory } from "react-router-dom";

const Waiting = ({ gameState, gameUpdate }) => {
  const history = useHistory();

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

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };
  // title: "GAME CODE: ",
  // competitors: "COMPETITORS",
  // topics: "CATEGORIES",
  // time: "TIME PER QUESTION: ",
  // num: "NUMBER OF QUESTIONS: ",
  // async function getPlayers(lobbyId) {
  //   const res2 = await API.getLobbyPlayers(lobbyId);
  //   console.log(res2.players[0]);
  //   setPlayerList(res2.players);
  // }

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
        <div className={`${styles.left} ${styles.box}`}>
          {"COMPETITORS: "}
          {gameState.hostName}
        </div>
        <div className={`${styles.left} ${styles.box}`}>
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
          <h2>How To Play</h2>
          <p>Instruction 1</p>
          <p>Instruction 2</p>
          <p>Instruction 3</p>
          <p>Instruction 4</p>
          <p>Instruction 5</p>
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
