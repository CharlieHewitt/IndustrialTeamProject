import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Progress, Popover } from "antd";
import dayjs from "dayjs";
import styles from "./Answer.less";
import API from "../../api";

const Answer = ({ location: { search }, history }) => {
  const [query, setQuery] = useState({});
  const [answerList, setAnswerList] = useState([]);
  const [time, setTime] = useState(0);

  const [hostname] = useState("lobby");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");

  // Get data from url
  useEffect(() => {
    const data = parse(search.split("?")[1]);
    // Store the data into query, set the timer
    setQuery(data);
    setTime(data.time);

    createLobby(hostname);

    async function createLobby(hostname){
      const res = await API.createLobby(hostname);
      console.log(res);
      const res2 = await API.getNextQuestion(res.lobbyId, res.hostId, "2");
      console.log(res2);
      setCategory(res2.questionInfo.category);
      setQuestion(res2.questionInfo.question);
      setAnswerList([
        {
          hint: "Hint1",
          name: res2.questionInfo.answers.a,
          msg: "Hint1",
        },
        {
          hint: "Hint2",
          name: res2.questionInfo.answers.b,
          msg: "Hint2",
        },
        {
          hint: "Hint3",
          name: res2.questionInfo.answers.c,
          msg: "Hint3",
        },
        {
          hint: "Hint4",
          name: res2.questionInfo.answers.d,
          msg: "Hint4",
        },
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
          history.push(`/totalscore?${stringify({ ...data, name: "empty" })}`);
        } else {
          history.push(`/score?${stringify({ ...data, name: "empty" })}`);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [search, history]);

  // console.log(res);

  // store the answer using api
  // Upload the answer and get points
  const handleChose = (name) => {
    console.log(query);
    console.log(name);
    //Compare with the correct answer to see if it is right

    // To see if it is the last question, push everything if it is
    if (query.num === query.active) {
      history.push(`/totalscore?${stringify({ ...query, name })}`);
    } else {
      history.push(`/score?${stringify({ ...query, name })}`);
    }
  };

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>CATEGORY:{category}</div>
          <div className={styles.msg}>{question}</div>
        </div>
      </div>
      <div className={styles.content} >
        {answerList.map((item) => (
          <div
            key={item.name}
            onClick={() => handleChose(item.name)}
            className={styles.btnBox}
          >
            <div className={styles.btn}>{item.name}</div>
          </div>
        ))}
        <div className={styles.time}>
          <Progress
            type="circle"
            strokeColor={time < 4 ? "red" : "#1DA57A"}
            format={() => dayjs(time * 1000).format("mm:ss")}
            percent={time ? ((time * 100) / query.time).toFixed(1) : 0}
          />
        </div>
      </div>
      <div className={styles.hint}>
        <div className={styles.blank} />
        {answerList.map((item) => (
          <Popover key={item.hint} content={item.msg}>
            <div className={styles.btn}>{item.hint}</div>
          </Popover>
        ))}
        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default Answer;
