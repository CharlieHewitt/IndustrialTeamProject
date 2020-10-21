import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Progress, Popover } from "antd";
import dayjs from "dayjs";
import styles from "./Answer.less";
import API from "../../api";
import AnswerArea from './AnswerArea';

const Answer = ({ location: { search }, history }) => {
  const [query, setQuery] = useState({});
  const [answerList, setAnswerList] = useState([]);
  const [time, setTime] = useState(0);

  const [lobbyId, setLobbyId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [questionNum, setQuestionNum] = useState(1);
  const [test, setTest] = useState({
    question: "how are you",
    correctAnswer:"a",
    answers:["a","b","c","d"]
  })
  
  // Get data from url
  useEffect(() => {
    const data = parse(search.split("?")[1]);
    console.log(data);
    // Store the data into query, set the timer
    setQuery(data);
    setTime(data.time);
    setPlayerId(data.playerId);
    setLobbyId(data.lobbyId);

    getQuestion(lobbyId, playerId, questionNum);

    async function getQuestion(lobbyId, playerId, questionNum){
      const res2 = await API.getNextQuestion(lobbyId, playerId, questionNum);
      console.log(res2);
      setQuestionNum(res2.questionNum);
      setCategory(res2.questionInfo.category);
      setQuestion(res2.questionInfo.question);
      setAnswerList([
           res2.questionInfo.answers.a,
           res2.questionInfo.answers.b,
           res2.questionInfo.answers.c,
           res2.questionInfo.answers.d,
      ]);

    }

    // Start the timer after getting data of the questions
    let i = data.time;
    const timer = setInterval(() => {
      i = i - 1;
      setTime(i);
      if (i === 0) {
        //Clear the timer when run out of time
        clearInterval(timer);
        if (data.num === data.active) {
          history.push(`/totalscore?${stringify({ ...data, name: "empty" })}&lobbyId=${lobbyId}&playerId=${playerId}`);
        } else {
          history.push(`/score?${stringify({ ...data, name: "empty" })}&lobbyId=${lobbyId}&playerId=${playerId}`);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [search, history]);

  // console.log(res);
  async function getNextQuestion(){
    const res = await API.getNextQuestion(lobbyId, playerId, questionNum);
    setQuestion(res.question);
  }

  // Upload the answer and get points
  const handleChose = (name) => {
    console.log(query);
    //Compare with the correct answer to see if it is right
    // sendAnswer(lobbyId, playerId, questionNum, name);
    alert("Testing")
    // To see if it is the last question, push everything if it is
    if (query.num === query.active) {
      history.push(`/totalscore?${stringify({ ...query, name })}&lobbyId=${lobbyId}&playerId=${playerId}`);
    } else {
      history.push(`/score?${stringify({ ...query, name })}&lobbyId=${lobbyId}&playerId=${playerId}`);
    }
  };

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>CATEGORY: {category}</div>
          <div className={styles.msg}>{question}</div>
        </div>
      </div>
      <AnswerArea 
        answers={answerList}
        question={question}
        query={query}
        lobbyId={lobbyId}
        playerId={playerId}
        QuestionNum={questionNum}
        getNextQuestion={() => {getNextQuestion()}}
      />
      {/* <div className={styles.content} >
        <div>
          {answerList.map((item) => (
            <div
              key={item.name}
              onClick={() => handleChose(item.name)}
              className={styles.btnBox}
            >
              <div className={styles.btn}>{item.name}</div>
            </div>
          ))}
        </div>
        
        <div className={styles.time}>
          <Progress
            type="circle"
            strokeColor={time < 4 ? "red" : "#1DA57A"}
            format={() => dayjs(time * 1000).format("mm:ss")}
            percent={time ? ((time * 100) / query.time).toFixed(1) : 0}
          />
        </div>
      </div> */}
      <div className={styles.hint}>
        {/* <div className={styles.blank} /> */}
          <div className={styles.btn}>Hint</div>
          <div className={styles.time}>
            <Progress
              type="circle"
              strokeColor={time < 4 ? "red" : "#1DA57A"}
              format={() => dayjs(time * 1000).format("mm:ss")}
              percent={time ? ((time * 100) / query.time).toFixed(1) : 0}
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
  );
};
export default Answer;