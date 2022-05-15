import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function  QuizItemComponent (props) {
    let navigate = useNavigate();
    const quiz = props.quiz;
    const startQuiz = (id) => {
        localStorage.setItem('quizId', id);
        navigate('/startQuiz')
    }
    return(
        <div className="quizItem-wrapper">
            <h1>{quiz.title}</h1>
            <Button onClick={(e) => startQuiz(quiz.id)}>Start quiz</Button>
        </div>
    )
}