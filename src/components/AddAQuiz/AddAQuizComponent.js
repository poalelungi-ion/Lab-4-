import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {headers} from "../../helpers/headers";
import {addQuiz} from "../../helpers/addQuiz";


export default function QuizCreateComponent () {
    const [title, setTitle] = useState("");
    const [questionName, setQuestionName] = useState("");
    const [answer1Name, setAnswer1Name] = useState("");
    const [answer2Name, setAnswer2Name] = useState("");
    const [titleError, setTitleError] = useState("Title field can't be empty");
    const [titleDirty, setTitleDirty] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState('');

    let navigate = useNavigate();

    const [data, setData] = useState({
        title: '',
        questions: [{
            question: '',
            answers: [],
            correct_answer: ''
        }
        ]
    })

    const titleHandler = (e) => {
        setTitle(e.target.value);
        if(!e.target.value){
            setTitleError("Title can't be empty");
        }
        else {
            setTitleError("");
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'title':
                setTitleDirty(true)
                break
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const axios = require('axios').default
        axios.post(addQuiz, {data},headers).catch((err) => console.log(err));
        navigate("/quizzes");
    }


    const addQuestion = () => {
        let quiz = data.questions.concat();
        let answers = [answer1Name, answer2Name];
        quiz.push({question: questionName, answers: answers, correct_answer: answers[correctAnswer]});
        if(!firstQuestion) {
            quiz.splice(0,1);
        }
        setFirstQuestion(true);

        setData({title: title, questions: quiz})
        setQuestionName('');
        setAnswer1Name('');
        setAnswer2Name('');
        setCorrectAnswer('');
    }

    const onSelectCorrectAnswer = (e) => {
        setCorrectAnswer(e.target.value);
    }


    return(
        <div className="wrapper">
            <h1 className="header">Create a quiz</h1>
            <div className="form">
                <form onSubmit={submitHandler} className="form-quiz-create">
                    {(titleError && titleDirty) && <span className="error">{titleError}</span>}
                    <input type="text"
                           placeholder="Enter the title"
                           value={title}
                           name="title"
                           onBlur={e => blurHandler(e)}
                           onChange={titleHandler}
                           disabled={firstQuestion}
                            required={true}/>
                    <input type="text"
                           placeholder="Enter the name of the question"
                           value={questionName}
                           onChange={(e) => setQuestionName(e.target.value)}
                           />
                    <input type="text"
                           placeholder="Enter the first answer"
                           value={answer1Name}
                           onChange={(e) => setAnswer1Name(e.target.value)}
                           />
                    <input type="text"
                           placeholder="Enter the second answer"
                           value={answer2Name}
                           onChange={(e) => setAnswer2Name(e.target.value)}
                           />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Correct answer</InputLabel>
                            <Select
                                value={correctAnswer}
                                className="select-correct"
                                label="Correct answer"
                                onChange={onSelectCorrectAnswer}
                            >
                                <MenuItem value={0}>1</MenuItem>
                                <MenuItem value={1}>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="quizList-wrapper">
                        <Button type="submit" disabled={!firstQuestion}>Create</Button>
                        <Button size={"medium"} className="padding-0" onClick={addQuestion} >Add</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}