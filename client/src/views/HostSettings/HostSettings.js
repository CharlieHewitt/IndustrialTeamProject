import React, { useEffect, useState } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import HostSettingRow from "../../components/HostSettingRow";
import RoundedBtn from "../../components/RoundedBtn/RoundedBtn";
import SettingsBtn from "../../components/SettingsBtn";
import styles from "./HostSettings.module.css";
import { parse, stringify } from "querystring";
import "./index.css";
import API from "../../api";
import { create } from "domain";

const HostSettings = ({ location: { search }, history }) => {
  const [categories, setCategories] = useState();
  const [roundCount, setRoundCount] = useState(7);
  const [timer, setTimer] = useState(7);
  const [playerCount, setPlayerCount] = useState(7);
  const [hostName, setHostName] = useState("");
  const [lobbyId, setLobbyId] = useState("");
  const [hostId, setHostId] = useState("");
  const [error, setError] = useState("");
  const [settings, setSettings] = useState({
    categories: [],
    timePerQuestion: 5,
    numQuestions: 3
  })

  useEffect(() => {
    const data = parse(search.split("?")[1]);
    setHostName(data.hostName);

    async function init() {
      try {
        const categories = await API.getCategories();
        let catObj = {};
        categories.categories.forEach((cat) => (catObj[cat] = false));
        setCategories(catObj);
      } catch (err) {
        setError(err.message);
      }
    }
    async function createLobby(hostName){
      const res1 = await API.createLobby(hostName);
      setLobbyId(res1.lobbyId);
      setHostId(res1.hostId);
    }
    async function updateSetting(lobbyId, playerId, settings){
      const res = await API.updateSettings(lobbyId, playerId, settings);
          
    }

    init();
    createLobby(hostName);
    setSettings({
      categories: parse(categories),
      timePerQuestion: timer,
      numQuestions: roundCount
    })
    console.log(settings);
    updateSetting(lobbyId, hostId, settings);
  }, []);

  return (
    <div>
      <div className={styles.title}>HOST SETTINGS</div>
      <div className={styles.mainWrap}>
        <div className={styles.wrap}>
          <HostSettingRow
            value={roundCount}
            setValue={setRoundCount}
            title="Number of Rounds"
          />
          <HostSettingRow value={timer} setValue={setTimer} title="Timer" />
          <HostSettingRow
            value={playerCount}
            setValue={setPlayerCount}
            title="Number of Players"
          />
          {categories && (
            <CategoryList
              categories={categories}
              setCategories={setCategories}
            />
          )}
          {!categories && !error && (
            <h1 style={{ textAlign: "center" }}>Loading...</h1>
          )}
          {error && <h1 style={{ textAlign: "center" }}>Error: {error}</h1>}
        </div>
        <RoundedBtn
          title="Start Lobby"
          style={{
            width: 125,
            height: 125,
            borderRadius: 30,
            textAlign: "center",
          }}
          onClick={() => history.push(`/waiting?hostName=${hostName}&timer=${timer}&numQ=${roundCount}&categories=${[categories]}`)} //sends to waiting/lobby page
        />
      </div>
    </div>
  );
};

export default HostSettings;
