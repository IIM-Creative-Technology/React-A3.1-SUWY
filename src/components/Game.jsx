import { getQuestions } from "../api/get-questions";
import StartGame from "./StartGame";
import GameInProgress from "./GameInProgress";
import { useState, useEffect } from "react";
import ChooseDifficulty from "./ChooseDifficulty";
function Game() {
  const [questionsList, setQuestionsList] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    if (!difficulty) return;
    getQuestionsData();
  }, [difficulty]);

  async function getQuestionsData() {
    const questionsData = await getQuestions(difficulty);
    setQuestionsList(questionsData);
  }

  return (
    <div className="Game">
      <h1>Game</h1>
      {!isGameStarted && <StartGame setIsGameStarted={setIsGameStarted} />}
      {isGameStarted && questionsList.length === 0 && difficulty === "" && (
        <ChooseDifficulty setDifficulty={setDifficulty} />
      )}
      {isGameStarted && questionsList.length > 0 && difficulty != "" && (
        <GameInProgress
          setDifficulty={setDifficulty}
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
