import PlayerComponent from "./Player/PlayerComponent";
import {NavLink} from "react-router-dom";
import './Header.css'
import {Button} from "@mui/material";

export default function  HeaderComponent () {

    return(
        <header className="header-wrapper">
            <PlayerComponent/>
            <div className="header-wrapper-btns">
                        <NavLink to="/quizzes"><Button>Quizzes</Button></NavLink>
                        <NavLink to="/addQuiz"><Button>Add  a quiz</Button></NavLink>
            </div>
        </header>
    )
}