import React, { useEffect, useState } from "react";

import "./index.css";
// import EnterName from "../../components/EnterName";
import Modal from "../../components/Modal/Modal";
import { useHistory } from "react-router-dom";

const Home = ({ location: { search }, gameState, gameUpdate }) => {
  const modalRef = React.useRef();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify({ currentQuestion: 1 }));
  }, []);

  const handleHost = (e) => {
    // e.preventDefault;
    history.push(`/host-settings`);
  };

  const openModal = (e) => {
    // e.preventDefault;
    modalRef.current.openModal();
  };

  const handleJoin = (e) => {
    gameUpdate({ hostName: "", userName: gameState.hostName });
    history.push(`/joinwaiting`);
  };

  return (
    <div>
      <div className="banner">
        CRANE-IUM
        {/*<div className="settings">Settings</div>*/}
      </div>

      <form onSubmit={handleHost}>
        <input
          type="text"
          name="userName"
          placeholder="Enter name..."
          required
          style={{
            backgroundColor: "#ffffff",
            width: "890px",
            height: "130px",
            position: "absolute",
            fontSize: "70px",
            left: "515px",
            top: "393px",
          }}
          value={gameState.hostName}
          onChange={(ev) => gameUpdate({ hostName: ev.target.value })}
          className="inputbox"
        />
        <div onClick={handleHost} className="hostbtn" type="submit">
          Host Game
        </div>
        {/* The Big One  */}
        <div onClick={openModal} className="joinbtn" type="submit">
          Join Game
        </div>
      </form>

      <Modal ref={modalRef}>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            name="lobbyId"
            maxLength="20"
            required
            style={{
              backgroundColor: "#ffffff",
              width: "50%",
              height: "25%",
              position: "relative",
              fontSize: "20px",
            }}
            placeholder="Enter game code..."
            value={gameState.lobbyId}
            onChange={(ev) => gameUpdate({ lobbyId: ev.target.value })}
          />
          {/* the small one  */}
          <button onClick={handleJoin} type="submit">
            Join Game
          </button>
          <button onClick={() => modalRef.current.close()}>Close!</button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;

// {() => history.push("/host-settings")}
