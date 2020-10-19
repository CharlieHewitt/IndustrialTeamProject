import React, { useState } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import HostSettingRow from "../../components/HostSettingRow";
import RoundedBtn from "../../components/RoundedBtn/RoundedBtn";
import SettingsBtn from "../../components/SettingsBtn";
import styles from "./HostSettings.module.css";
import "./index.css";

const HostSettings = ({history}) => {
  const [categories, setCategories] = useState({
    "Category A": false,
    "Category B": false,
    "Category C": false,
    "Category D": false,
    "Category E": false,
    "Category F": false,
    "Category G": false,
    "Category H": false,
    "Category I": false,
  });
  const [roundCount, setRoundCount] = useState(7);
  const [timer, setTimer] = useState(7);
  const [playerCount, setPlayerCount] = useState(7);

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
            value={roundCount}
            setValue={setRoundCount}
            title="Number of Rounds"
          />
          <HostSettingRow 
            value={timer}
            setValue={setTimer} 
            title="Timer" 
          />
          <HostSettingRow
            value={playerCount}
            setValue={setPlayerCount}
            title="Number of Players"
          />
          <CategoryList categories={categories} setCategories={setCategories} />
        </div>
        <RoundedBtn
          title="Start Lobby"
          style={{
            width: 125,
            height: 125,
            borderRadius: 30,
            textAlign: "center",
          }}
          onClick={() => history.push("/waiting")} //sends to waiting/lobby page
        />
      </div>
    </div>
  );
};

export default HostSettings;
