import React from "react";
import "./index.css";
import EnterName from "../../components/EnterName";
import Host from "../../components/HostButton";
import Join from "../../components/JoinButton";

const Home = (props) => {
  return (
    <div>
      <div className="banner">
        <h1>THE QUIZ</h1>
      </div>
      <EnterName />
      <Host />
      <Join/>
    </div>
  );
};

export default Home;
