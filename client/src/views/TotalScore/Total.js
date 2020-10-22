import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Link } from "react-router-dom";
import styles from "./Total.less";
import API from "../../api";

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

      for (let i = 0; i < playersRanked.length; i += 1) {
        playersRanked[i] = users[playersRanked[i]];
        if (playersRanked[i] === gameState.playerId) {
          setSelfScore(i + 1);
        }
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
              {selfScore <= 1 ? "ST" : selfScore > 2 ? "TH" : "ND"}
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
            <div>{index + 1}st</div>
            <div className={styles.name}>{item.username}</div>
            <div>{item.score}</div>
          </div>
        ))}
      </div>
      <Link to="/" className={styles.back}>
        EXIT
      </Link>
    </div>
  );
};
export default Total;
