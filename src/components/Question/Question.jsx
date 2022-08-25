import { Button } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import correctA from "../../sounds/correctN.mp3";
import wrong from "../../sounds/wrongN.mp3";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
    setQuestions,
}) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [correctAnswer] = useSound(correctA);
    const [wrongAnswer] = useSound(wrong);

    const history = useHistory();

    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
    };

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) {
            setScore(score + 1);
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
        setError(false);
    };

    const handleNext = () => {
        if (currQues > 8) {
            history.push("/result");
        } else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        } else setError("Please select an option first");
    };

    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
    };

    return (
        <div className="question">
            <h1>Question {currQues + 1} :</h1>

            <div className="singleQuestion">
                <h2>{questions[currQues].question}</h2>
                <div className="options">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options &&
                        options.map((i) => (
                            <button
                                style={{ fontWeight: 600, letterSpacing: 1 }}
                                className={`singleOption  ${selected && handleSelect(i)}`}
                                key={i}
                                onClick={() => handleCheck(i)}
                                disabled={selected}
                            >
                                {i}
                            </button>
                        ))}
                </div>
                <div className="controls">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ width: 185 }}
                        href="/"
                        onClick={() => handleQuit()}
                    >
                        Quit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handleNext}
                    >
                        {currQues >= 9 ? "Submit" : "Next Question"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Question;