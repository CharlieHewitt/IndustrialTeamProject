import React, { useEffect, useState } from "react";
import Category from "../../components/Category/Category";
import CategoryList from "../../components/CategoryList/CategoryList";
import HostSettingRow from "../../components/HostSettingRow";
import SettingsBtn from "../../components/SettingsBtn";
import styles from "./HostSettings.module.css";
import "./index.css";

const HostSettings = (props) => {
  const [categories, setCategories] = useState([
    { name: "Category A", checked: false },
  ]);
  const [roundCount, setRoundCount] = useState(7);
  const [timer, setTimer] = useState(7);
  const [playerCount, setPlayerCount] = useState(7);

  useEffect(() => {
    const getCategories = async () => {};
  }, []);

  return (
    <div>
      <div className={styles.title}>Host settings</div>
      <SettingsBtn
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          marginTop: 40,
        }}
      >
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
        <CategoryList />
      </div>
    </div>
  );
};

export default HostSettings;
