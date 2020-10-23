import React, { useState, useEffect } from "react";
import styles from "./JoinWaiting.less";
import Modal from "../../components/Modal/Modal";
import { parse } from "querystring";
import API from "../../api";
import { useHistory } from "react-router-dom";
import Instructions from "../../components/Instructions";

let interval;

const JoinWaiting = ({ gameState, gameUpdate }) => {
  const modalRef = React.useRef();
  const history = useHistory();

  const [players, setPlayers] = useState([]);

  const openModal = () => {
    modalRef.current.openModal();
  };

  useEffect(() => {
    async function init() {
      console.log(gameState);
      const { success, playerId } = await API.joinLobby(
        gameState.lobbyId,
        gameState.userName
      );

      if (!success) {
        gameUpdate({});
        history.push("/");
      }
      gameUpdate({ playerId });

      interval = setInterval(async () => {
        const { started, settings } = await API.checkQuizStatus(
          gameState.lobbyId,
          playerId
        );

        gameUpdate({ ...settings });

        if (started) {
          history.push("/quizing");
        }

        const res = await API.getLobbyPlayers(gameState.lobbyId);

        setPlayers(res.players);
      }, 500);
    }

    init();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.joinwaiting}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.msg}>
            {"GAME CODE: "}
            {gameState.lobbyId}
          </div>
          {/* <div className={styles.setting}>Settings</div> */}
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
        <div className={styles.btn} onClick={openModal}>
          HOW TO PLAY
        </div>
        <Modal ref={modalRef}>
          <Instructions />

          <button
            className={styles.btn}
            onClick={() => modalRef.current.close()}
            style={{ alignSelf: "center" }}
          >
            Close!
          </button>
        </Modal>

        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default JoinWaiting;
