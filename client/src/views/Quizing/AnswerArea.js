import React, { useEffect, useState } from "react";
import styles from "./Answer.less";
import API from "../../api";

const AnswerArea = (props) => {
  const {
    answers,
    lobbyId,
    playerId,
    questionNum,
    skipAnswer,
    hintAnswers,
  } = props;
  const [isChosen, setIsChosen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleChose = (answer) => {
    sendAnswer(lobbyId, playerId, questionNum, answer);
    setIsChosen(true);
  };

  const handleIsChosen = () => {
    return (
      <div className={styles.content}>
        {Object.keys(answers).map((answer) => (
          <div key={answer} className={styles.btnBox}>
            <div className={handleClassName(answer)} disabled={true}>
              {answers[answer]}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleClassName = (answer) => {
    if (answer == correctAnswer || answer == skipAnswer)
      return `${styles.btnRight}`;
    else return `${styles.btnWrong}`;
  };

  const sendAnswer = (lobbyId, playerId, questionNum, answer) => {
    send(lobbyId, playerId, questionNum, answer);

    async function send(lobbyId, playerId, questionNum, answer) {
      const res = await API.sendAnswer(lobbyId, playerId, questionNum, answer);
      setCorrectAnswer(res.correctAnswer.correctAnswer);
    }
  };

  return (
    <div>
      {isChosen || skipAnswer ? (
        handleIsChosen()
      ) : (
        <div className={styles.content}>
          {Object.keys(answers).map((answer) => {
            if (hintAnswers.length > 0 && hintAnswers.indexOf(answer) === -1) {
              return (
                <div
                  key={answer}
                  className={styles.btnBox}
                  style={{
                    visibility: "hidden",
                  }}
                >
                  <div className={styles.btn}>{answers[answer]}</div>
                </div>
              );
            }

            return (
              <div
                key={answer}
                onClick={() => handleChose(answer)}
                className={styles.btnBox}
              >
                <div className={styles.btn}>{answers[answer]}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnswerArea;

// ${stringify({ ...data, name: "empty" })}&lobbyId=${lobbyId}&playerId=${playerId}
