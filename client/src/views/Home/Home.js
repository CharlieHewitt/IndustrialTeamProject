import React from "react";
import "./index.css";
import EnterName from "../../components/EnterName";

const Home = ({ history }) => {

  return (
    <div>


      <div className="banner">
        THE QUIZ
        {/*<div className="settings">Settings</div>*/}
      </div >
      <EnterName />


      <div onClick={() => history.push("/host-settings")} className="hostbtn">
        Host Game
      </div>

      <div onClick={() => history.push("/joinwaiting")} className="joinbtn">
        Join Game
      </div>
    </div>
  );
};

export default Home;
