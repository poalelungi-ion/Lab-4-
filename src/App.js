import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginComponent from "./components/Login/LoginComponent";
import HeaderComponent from "./components/Header/HeaderComponent";
import QuizListComponent from "./components/QuizList/QuizListComponent";
import AddAQuizComponent from "./components/AddAQuiz/AddAQuizComponent";
import StartQuizComponent from "./components/QuizItem/StartQuiz/StartQuizComponent";

function App() {
  return (
   <BrowserRouter>
       <HeaderComponent/>
       <Routes>
           <Route path="/" exact element={<LoginComponent/>}/>
           <Route path="/quizzes" element={<QuizListComponent/>}/>
            <Route path="/addQuiz" element={<AddAQuizComponent/>}/>
            <Route path="/startQuiz" element={<StartQuizComponent/>}/>
       </Routes>
   </BrowserRouter>
  );
}

export default App;
