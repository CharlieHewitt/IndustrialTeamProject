import React, { Fragment } from "react";
import styles from "./Instructions.module.css";
import "./index.css";

const Instructions = (props) => {
  return (
    <Fragment>
      <h2>How To Play</h2>
      <p>
        You will have a certain number of seconds to choose your answer to each
        question
      </p>
      <p>You will have to answer questions from different categories </p>
      <p>Each question has one correct answer</p>
      <p>
        Click on the answer you think is right to increase your score and win
      </p>
      <p>Have fun keeping your brain active</p>
    </Fragment>
  );
};

export default Instructions;
