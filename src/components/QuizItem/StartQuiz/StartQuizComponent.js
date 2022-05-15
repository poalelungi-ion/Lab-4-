import {useEffect, useState} from "react";
import axios from "axios";
import AnswersComponent from "./Answers/AnswersComponent";
import {headers} from "../../../helpers/headers";
import {startQuiz} from "../../../helpers/startQuiz";

export default function StartQuizComponent () {
    const [rendered, setRendered] = useState(false);
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        let quizId = +localStorage.getItem('quizId');
        axios.get(startQuiz(quizId),
            headers)
             .then(res => {
                setQuiz(res.data)
                setRendered(true);
        })
    }, [])
    return (
        <div>
            {rendered ? <div>
                <h1>{quiz.title}</h1>
                {quiz.questions.map((question) =>
                    <AnswersComponent question={question} key={question.id}/>)}
            </div>
            : <></>}
        </div>
    )
}