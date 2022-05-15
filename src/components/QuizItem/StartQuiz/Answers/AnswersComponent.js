import {Checkbox} from "@mui/material";
import {useState} from "react";
import {headers} from "../../../../helpers/headers";
import {postAnswer} from "../../../../helpers/postAnswer";

export default function  AnswersComponent ({question}) {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [tempAnswer, setTempAnswer] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [correctAnswered, setCorrectAnswered] = useState();
    const [counter, setCounter] = useState(0);

    const submitAnswer = (questionId) => {
        setTempAnswer(checked1==true ? 0 : 1);
        setAnswer(question.answers[tempAnswer]);
        let quizId = +localStorage.getItem('quizId');
        let userId = +localStorage.getItem('userId');
        const axios = require('axios').default
        axios.post(postAnswer(quizId),
            {
                data: {
                    question_id: questionId,
                    answer: answer,
                    user_id: userId
                }
            }, headers). then((response) => {
            setCorrectAnswer(response.correct_answer);
            setAnswered(true);
            setCorrectAnswered(correctAnswer == answer);
        }).catch((err) => console.log(err))


        setCounter(prevState => prevState+1);
    }

    return(
        <div>
            <h1>{question.question}</h1>
            <div className="answers-list">
                <Checkbox
                    checked={checked1}
                    onChange={(event) => setChecked1(event.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="answer-check"
                />{question.answers[0]}
                <Checkbox
                    checked={checked2}
                    onChange={(event) => setChecked2(event.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />{question.answers[1]}
            </div>
            <button
                className="btn-submit"
                style={(checked1 == checked2) ? {background: "gray"} : {}}
                disabled={checked1 == checked2 }
                onClick={(e) => submitAnswer(question.id)}>Submit answers</button>
            { answered ?
                <div>
                    {!correctAnswered ?
                        <p>Correct answer is {correctAnswer}</p>
                        :
                        <p>Correct!</p>
                    }
                </div>
                :
                <></>
            }
        </div>
    )
}