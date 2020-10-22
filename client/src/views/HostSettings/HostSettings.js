import React, { useEffect, useState } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import HostSettingRow from "../../components/HostSettingRow";
import RoundedBtn from "../../components/RoundedBtn/RoundedBtn";
import SettingsBtn from "../../components/SettingsBtn";
import styles from "./HostSettings.module.css";
import { parse, stringify } from "querystring";
import "./index.css";
import API from "../../api";
import { useHistory } from "react-router-dom";

const HostSettings = ({ gameState, gameUpdate }) => {
  const history = useHistory();

  console.log(gameState);

  const [categories, setCategories] = useState();
  const [numQuestions, setNumQuestions] = useState(7);
  const [timer, setTimer] = useState(7);
  const [playerCount, setPlayerCount] = useState(7);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    init();
  }, []);

  return (
    <div>
      <div className={styles.title}>Host settings</div>
      <SettingsBtn
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      />
      <div className={styles.mainWrap}>
        <div className={styles.wrap}>
          <HostSettingRow
            value={numQuestions}
            setValue={setNumQuestions}
            title="Number of Questions"
          />
          <HostSettingRow
            value={timer}
            setValue={setTimer}
            title="Answer Time"
          />
          {/* <HostSettingRow
              value={playerCount}
              setValue={setPlayerCount}
              title="Number of Players"
            /> */}
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
          title={loading ? "Loading..." : "Start Lobby"}
          style={{
            width: 125,
            height: 125,
            borderRadius: 30,
            textAlign: "center",
          }}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              let { lobbyId, hostId, hostName } = await API.createLobby(
                gameState.hostName
              );
              gameUpdate({
                lobbyId,
                hostId,
                hostName,
                categories: Object.keys(categories).filter(
                  (cat) => categories[cat]
                ),
                numQuestions,
                answerTime: timer,
              });

              console.log(gameState);
              // update settings
              let { success } = await API.updateSettings(lobbyId, hostId, {
                categories: Object.keys(categories).filter(
                  (cat) => categories[cat]
                ),
                numQuestions: numQuestions,
                answerTime: timer,
              });
              if (!success) throw Error("Failed to update settings");
              history.push("/waiting");
            } catch (err) {
              gameUpdate({});
              console.log(err);
              alert("Error starting game!");
              history.push("/");
            }
          }} //sends to waiting/lobby page
        />
      </div>
    </div>
  );
};

export default HostSettings;
