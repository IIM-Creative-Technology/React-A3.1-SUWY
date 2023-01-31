import { getQuestions } from "../api/get-questions";
import StartGame from "./StartGame";
import GameInProgress from "./GameInProgress";
import { useState, useEffect } from "react";
function Game() {
  const [questionsList, setQuestionsList] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (!isGameStarted) return;
    getQuestionsData();
  }, [isGameStarted]);

  async function getQuestionsData() {
    const questionsData = await getQuestions();
    setQuestionsList(questionsData);
  }

  return (
    <div className="Game">
      <h1>Game</h1>
      {!isGameStarted && <StartGame setIsGameStarted={setIsGameStarted} />}
      {isGameStarted && questionsList.length > 0 && (
        <GameInProgress
          questionsList={questionsList}
          setIsGameStarted={setIsGameStarted}
          setQuestionsList={setQuestionsList}
          getQuestionsData={getQuestionsData}
        />
      )}
    </div>  
  );
}

export default Game;
