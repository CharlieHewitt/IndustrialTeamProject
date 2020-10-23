import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import dayjs from "dayjs";
import styles from "./Answer.less";
import API from "../../api";
import AnswerArea from "./AnswerArea";
import { useHistory } from "react-router-dom";

const Answer = ({ gameState, gameUpdate }) => {
  const history = useHistory();

  const [time, setTime] = useState(0);
  const [skipAnswer, setSkipAnswer] = useState("");
  const [hintAnswers, setHintAnswers] = useState([]);

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

  async function handleSkip() {
    const { skipUsed, correctAnswer } = await API.skip(
      gameState.lobbyId,
      gameState.playerId,
      gameState.currentQuestion
    );

    if (!skipUsed) {
      gameUpdate({ hasSkipped: true });
      setSkipAnswer(correctAnswer.correctAnswer);
    }
  }

  async function handleHint() {
    const { available, answer1, answer2 } = await API.fiftyFify(
      gameState.lobbyId,
      gameState.playerId
    );

    if (available) {
      gameUpdate({ hasHint: true });
      setHintAnswers([answer1, answer2]);
    }
  }

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
            skipAnswer={skipAnswer}
            hintAnswers={hintAnswers}
          />
          <div className={styles.hint}>
            {/* <div className={styles.blank} /> */}
            {!gameState.hasHint && (
              <div className={styles.btn} onClick={handleHint}>
                50/50
              </div>
            )}

            <div className={styles.time}>
              <Progress
                type="circle"
                strokeColor={time > 4 ? "red" : "#1DA57A"}
                format={() =>
                  dayjs((gameState.answerTime - time) * 1000).format("mm:ss")
                }
                percent={
                  time
                    ? 100 - ((time * 100) / gameState.answerTime).toFixed(1)
                    : 100
                }
              />
            </div>

            {!gameState.hasSkipped && (
              <div className={styles.skipBtn} onClick={handleSkip}>
                Skip
              </div>
            )}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </>
  );
};
export default Answer;
