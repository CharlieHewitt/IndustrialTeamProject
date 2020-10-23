import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Link } from "react-router-dom";
import styles from "./Total.less";
import API from "../../api";
import { getNumberSuffix } from "../../utils";

const Total = ({ gameState, gameUpdate }) => {
  // Retrive the score and back to the next question after 3s
  const [scores, setScores] = useState([]);
  const [selfScore, setSelfScore] = useState("1");

  useEffect(() => {
    async function getLeaderboard() {
      const { playersRanked, users } = await API.getLeaderboard(
        gameState.lobbyId,
        gameState.playerId
      );

      for (let i = 0; i < playersRanked.length; i++) {
        if (playersRanked[i] == gameState.playerId) {
          setSelfScore(i + 1);
        }
        playersRanked[i] = users[playersRanked[i]];
      }

      setScores(playersRanked);
    }

    getLeaderboard();
  }, []);

  return (
    <div className={styles.total}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left} />
          <div className={styles.msg}>
            <div>
              YOU PLACED {selfScore}
              {getNumberSuffix(selfScore)}
            </div>
          </div>
          {/*<div className={styles.setting}>Settings</div>*/}
        </div>
      </div>
      <div className={styles.content}>
        {scores.map((item, index) => (
          <div
            key={item.username}
            className={`${styles.item} ${index === 0 ? styles.first : ""}`}
          >
            <div>
              {index + 1}
              {getNumberSuffix(index + 1)}
            </div>
            <div className={styles.name}>{item.username}</div>
            <div>{item.score}</div>
          </div>
        ))}
      </div>
      <Link
        to="/"
        onClick={() => {
          API.endLobby(gameState.lobbyId, gameState.playerId);
        }}
        className={styles.back}
      >
        EXIT
      </Link>
    </div>
  );
};
export default Total;
