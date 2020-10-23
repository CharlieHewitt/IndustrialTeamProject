import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Progress, Popover } from "antd";
import dayjs from "dayjs";
import styles from "./Answer.less";
import API from "../../api";
import AnswerArea from "./AnswerArea";
import { useHistory } from "react-router-dom";

const Answer = ({ gameState, gameUpdate }) => {
  const history = useHistory();

  const [time, setTime] = useState(0);

  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    async function getQuestion() {
      const {
        answers,
        question,
        category,
        questionNumber,
        success,
      } = await API.getNextQuestion(
        gameState.lobbyId,
        gameState.playerId,
        gameState.currentQuestion || 1
      );

      if (!success) {
        alert("Error getting question!");
        gameUpdate({});
        history.push("/");
      } else {
        setQuestionData({
          answers,
          question,
          category,
          questionNumber,
        });
      }
    }

    const interval = setInterval(() => setTime((t) => t + 1), 1000);

    const pollInterval = setInterval(async () => {
      const { questionOver } = await API.pollQuestion(
        gameState.lobbyId,
        gameState.playerId,
        gameState.currentQuestion || 1
      );

      if (questionOver) {
        history.push("/score");
      }
    }, 500);

    getQuestion();

    return () => {
      clearInterval(interval);
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <>
      {questionData ? (
        <div className={styles.answer}>
          <div className={styles.header}>
            <div className={styles.container}>
              <div className={styles.title}>
                CATEGORY: {questionData.category}
              </div>
              <div className={styles.msg}>{questionData.question}</div>
            </div>
          </div>
          <AnswerArea
            answers={questionData.answers}
            question={questionData.question}
            query={""}
            lobbyId={gameState.lobbyId}
            playerId={gameState.playerId}
            questionNum={questionData.questionNumber}
            getNextQuestion={() => {}}
          />
          <div className={styles.hint}>
            {/* <div className={styles.blank} /> */}
            <div className={styles.btn}>Hint</div>
            <div className={styles.time}>
              <Progress
                type="circle"
                strokeColor={time < 4 ? "red" : "#1DA57A"}
                format={() => dayjs(time * 1000).format("mm:ss")}
                percent={
                  time ? ((time * 100) / gameState.answerTime).toFixed(1) : 0
                }
              />
            </div>
            <div className={styles.skipBtn}>Skip</div>
            {/* {answerList.map((item) => (
          <Popover key={item.hint} content={item.msg}>
            <div className={styles.btn}>{item.hint}</div>
          </Popover>
        ))} */}
            {/* <div className={styles.blank} /> */}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </>
  );
};
export default Answer;
