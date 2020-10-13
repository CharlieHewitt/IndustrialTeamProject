import React, { useEffect, useState } from "react";
import { parse, stringify } from "querystring";
import { Progress, Popover } from "antd";
import dayjs from "dayjs";
import styles from "./Answer.less";

const Answer = ({ location: { search }, history }) => {
  const [query, setQuery] = useState({});
  const [answerList, setAnswerList] = useState([]);
  const [time, setTime] = useState(0);

  // Get data from url
  useEffect(() => {
    const data = parse(search.split("?")[1]);
    // Store the data into query, set the timer
    setQuery(data);
    setTime(data.time);
    // Get data from the backend and store into the answerList(Depends on the api)
    
    setAnswerList([
      {
        name: "answer1",
        msg: "this is answer1 msg",
      },
      {
        name: "answer2",
        msg: "this is answer2 msg",
      },
      {
        name: "answer3",
        msg: "this is answer3 msg",
      },
      {
        name: "answer4",
        msg: "this is answer4 msg",
      },
    ]);
    // Start the timer after getting data of the questions
    let i = data.time;
    const timer = setInterval(() => {
      i = i - 1;
      setTime(i);
      if (i === 0) {
        //Clear the timer when run out of time
        clearInterval(timer);
        if (data.num === data.active) {
          history.push(`/total?${stringify({ ...data, name: "empty" })}`);
        } else {
          history.push(`/score?${stringify({ ...data, name: "empty" })}`);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [search, history]);

  // store the answer using api
  // Upload the answer and get points
  const handleChose = (name) => {
    //console.log(query);
    // To see if it is the last question, push everything if it is 
    if (query.num === query.active) {
      history.push(`/total?${stringify({ ...query, name })}`);
    } else {
      history.push(`/score?${stringify({ ...query, name })}`);
    }
  };

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>CATEGORY:***</div>
          <div className={styles.msg}>1.hello word</div>
        </div>
      </div>
      <div className={styles.content}>
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
          <Popover key={item.name} content={item.msg}>
            <div className={styles.btn}>{item.name}</div>
          </Popover>
        ))}
        <div className={styles.blank} />
      </div>
    </div>
  );
};
export default Answer;
