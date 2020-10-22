import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Link } from "react-router-dom";
import styles from "./Total.less";
import API from "../../api";

const Total = ({ location: { search }, history }) => {
  const [list, setList] = useState([]);
  const [lobbyId, setLobbyId] = useState("");
  const [playerId, setPlayerId] = useState("");

  // Retrive the final score
  // Need to push the data of the last question before getting this leaderboard
  useEffect(() => {
    const data = parse(search.split("?")[1]);
    setLobbyId(data.lobbyId);
    setPlayerId(data.playerId);

    getLeaderboard(lobbyId, playerId);

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
    
  }, [search, history]);
  return (
    <div className={styles.total}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left} />
          <div className={styles.msg}>
            <div>YOU PLACED NTH</div>
          </div>
          {/*<div className={styles.setting}>Settings</div>*/}
        </div>
      </div>
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
      <Link to="/" className={styles.back}>
        EXIT
      </Link>
    </div>
  );
};
export default Total;
