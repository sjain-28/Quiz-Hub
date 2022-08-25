import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Result.css";
import Confetti from 'react-confetti';
import useSound from "use-sound";
import confetti from "../../sounds/confettiN.mp3";
const Result = ({ name, score }) => {
    const history = useHistory();
    const [showConfetti, setShowConfetti] = useState(true);
    const [confettiPlay, setConfettiPlay] = useState(true);

    const [confettis] = useSound(confetti);
    useEffect(() => {
        if (!name) {
            history.push("/");
        }
        
        
    }, [name, history]);

    useEffect(() => {
       const timer = setTimeout(() => {
            setShowConfetti(!showConfetti);
            setConfettiPlay(!confettiPlay);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="result">
            {score > 5 && showConfetti && <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                opacity={0.8}               
            />}
            {score > 5 && confettiPlay && confettis()}
            
            <span className="title" style={{ fontWeight: 700, fontSize: 30 }}>Thank You <span style={{ color: "blueviolet"}}>{name} </span>for giving quiz</span>
            <span className="title">Final Score : {score}</span>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: "center", marginTop: 20 }}
                href="/"
            >
                Go to homepage
            </Button>
        </div>
    );
};

export default Result;