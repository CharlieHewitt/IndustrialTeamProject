import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import styles from "./Score.less";
import API from "../../api";
import { useHistory } from "react-router-dom";

const Score = ({ gameState, gameUpdate }) => {
  // Retrive the score and back to the next question after 3s
  const [scores, setScores] = useState([]);
  const [selfScore, setSelfScore] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function getLeaderboard() {
      const { playersRanked, users } = await API.getLeaderboard(
        gameState.lobbyId,
        gameState.playerId
      );

      for (let i = 0; i < playersRanked.length; i += 1) {
        playersRanked[i] = users[playersRanked[i]];
      }

      setScores(playersRanked);
      setSelfScore(users[gameState.playerId].score);
    }

    const interval = setInterval(async () => {
      // poll leaderboard
      // if gameOver = go to totalScore
      // else go to next qustion (inc question number)
      const { leaderboardOver, quizFinished } = await API.pollLeaderboard(
        gameState.lobbyId,
        gameState.playerId,
        gameState.currentQuestion || 1
      );

      if (quizFinished) {
        gameUpdate({ currentQuestion: (gameState.currentQuestion || 1) + 1 });
        history.push("/totalscore");
      }

      if (leaderboardOver) {
        gameUpdate({ currentQuestion: (gameState.currentQuestion || 1) + 1 });
        history.push("/quizing");
      }
    }, 500);

    getLeaderboard();

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.score}>
      <div className={styles.header}>SCORE：{selfScore}</div>
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
    </div>
  );
};
export default Score;
