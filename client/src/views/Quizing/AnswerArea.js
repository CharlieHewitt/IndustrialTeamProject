import React, { useEffect, useState } from "react";
import styles from "./Answer.less";
import API from "../../api";

const AnswerArea = (props) => {
    const {answers, question, query, lobbyId, playerId, questionNum, getNextQuestion} = props ;
    const [isChosen, setIsChosen] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    useEffect(() => {
    
    })

    const handleChose = (answer) => {
        sendAnswer(lobbyId, playerId, questionNum, answer);
        setIsChosen(true);
        // getNextQuestion();
    }

    const handleIsChosen = () => {
        return(
            <div className={styles.content} >
                {answers.map((answer) => (
                    <div
                        key={answer}
                        className={styles.btnBox}>
                        <div className={handleClassName(answer)} disabled={true}>{answer}</div>
                    </div>
                ))}
            </div>
        )
    }

    const handleClassName = (answer) => {
        if(answer == correctAnswer)
            return(`${styles.btnRight}`)
        else 
            return(`${styles.btnWrong}`)
    }

    const sendAnswer = (lobbyId, playerId, questionNum, answer) => {
        send(lobbyId, playerId, questionNum, answer);

        async function send(lobbyId, playerId, questionNum, answer){
            const res = await API.sendAnswer(lobbyId, playerId, questionNum, answer);
            setCorrectAnswer(res.correctAnswer);
        }
    }

    return(
        <div>
            {isChosen ?
                handleIsChosen()
                :
                <div className={styles.content}>
                    {answers.map((answer) => (
                    <div
                        key={answer}
                        onClick={() => handleChose(answer)}
                        className={styles.btnBox}>
                        <div className={styles.btn}>{answer}</div>
                    </div>
                    ))}
                </div>
            }

        </div>
    )
}

export default AnswerArea;

// ${stringify({ ...data, name: "empty" })}&lobbyId=${lobbyId}&playerId=${playerId}