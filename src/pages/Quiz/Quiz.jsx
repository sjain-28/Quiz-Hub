import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import useSound from "use-sound";
import play from "../../sounds/playN1.mp3";
import "./Quiz.css";


const Quiz = ({ name, questions, score, setScore, setQuestions }) => {


    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);

    const [letsPlay] = useSound(play);

    useEffect(() => {
        { <Question /> && letsPlay() }

    }, [letsPlay, currQues]);

    useEffect(() => {
        setOptions(
            questions &&
            handleShuffle([
                questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers,
            ])
        );
    }, [currQues, questions]);

    // console.log(questions);

    const handleShuffle = (optionss) => {
        return optionss.sort(() => Math.random() - 0.5);
    };

    return (
        <div className="quiz">
            <span className="subtitle">Welcome, <span style={{ color: "blueviolet", textTransform: "capitalize" }}>{name}</span></span>

            {questions ? (
                <>
                    <div className="quizInfo">
                        <span style={{ fontWeight: 600, marginLeft: 20 }}>{questions[currQues].category}</span>
                        <span style={{ fontWeight: 600, marginRight: 20 }}>
                            {/* {questions[currQues].difficulty} */}
                            Score : <span style={{ color: "green" }}>{score}</span>
                        </span>
                    </div>
                    <Question
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={questions[currQues]?.correct_answer}
                        score={score}
                        setScore={setScore}
                    //   setQuestions={setQuestions}
                    />
                </>
            ) : (
                <CircularProgress
                    style={{ margin: 100 }}
                    color="inherit"
                    size={150}
                    thickness={1}
                />
            )}
        </div>
    )
}

export default Quiz