import {useEffect, useState} from "react";
import axios from "axios";
import QuizItemComponent from "../QuizItem/QuizItemComponent";
import {getQuizes} from "../../helpers/getQuizes";
import {headers} from "../../helpers/headers";

export default function  QuizListComponent () {
    const [quizzes, setQuiizzes] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        axios.get(getQuizes, headers)
            .then(res => {
                setQuiizzes(res.data);
                setPageLoaded(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    return(
        <div>
            {pageLoaded ?
                <div className="quizList-wrapper">
                    {quizzes.map((quiz) => <QuizItemComponent quiz={quiz} key={quiz.id}/>)}
                </div>
                : <></>}
        </div>
    )
}