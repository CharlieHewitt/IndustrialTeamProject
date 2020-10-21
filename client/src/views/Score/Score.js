import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import styles from "./Score.less";
import API from "../../api";

const Score = ({ location: { search }, history }) => {
  const [list, setList] = useState([]);
  const [score, setScore] = useState(0);
  const [lobbyId, setLobbyId] = useState("");
  const [playerId, setPlayerId] = useState("");

  // Retrive the score and back to the next question after 3s

  useEffect(() => {
    const data = parse(search.split("?")[1]);
    setLobbyId(data.lobbyId);
    setPlayerId(data.playerId);
    
    async function getLeaderboard(lobbyId, playerId){
      const res = API.getLeaderboard(lobbyId, playerId);
      setList([
        {
          name: "nickname1",
          score: 90,
        },
        {
          name: "nickname2",
          score: 80,
        },
        {
          name: "nickname3",
          score: 70,
        },
        {
          name: "nickname4",
          score: 60,
        },
      ]);
    }

    getLeaderboard(lobbyId, playerId);

    setScore(90);
    const timer = setTimeout(() => {
      history.push(
        `/quizing?${stringify({ ...data, active: Number(data.active) + 1 })}`
      );
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [search, history]);
  return (
    <div className={styles.score}>
      <div className={styles.header}>SCORE：{score}</div>
      <div className={styles.content}>
        {list.map((item, index) => (
          <div
            key={item.name}
            className={`${styles.item} ${index === 0 ? styles.first : ""}`}
          >
            <div>{index + 1}st</div>
            <div className={styles.name}>{item.name}</div>
            <div>{item.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Score;
