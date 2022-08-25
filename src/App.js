import axios from 'axios';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/Result';

function App() {

  const [questions, setQuestions] = useState();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };
  return (
    <>
      <div className="App" style={{ backgroundImage: "url(./img/ques1.png)" }} >
        <Header />
        <Switch>
          <Route path='/' exact>
            <Home
              name={name} setName={setName} fetchQuestions={fetchQuestions} />
          </Route>
        </Switch>
        <Switch>
          <Route path='/quiz' exact>
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path='/result' exact>
            <Result score={score} name={name} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
