import { useState } from "react";
import QuestionsAnswers from "./QuestionsAnswers";
function GameInProgress(props) {
  const [currentScore, setCurrentScore] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);

  function resetData() {
    props.setQuestionsList([]);
    setCurrentScore(0);
    setIsGameEnded(false);
  }

  function returnHome() {
    resetData();
    props.setDifficulty("");
    props.setCategory("");
    props.setIsGameStarted(false);
  }

  function restartGame() {
    resetData();
    props.getQuestionsData();
  }

  return (
    <div className="GameInProgress">
      {!isGameEnded ? (
        <QuestionsAnswers
          setCurrentScore={setCurrentScore}
          currentScore={currentScore}
          setIsGameEnded={setIsGameEnded}
          questionsList={props.questionsList}
        />
      ) : (
        <div>
          <div className="font-bold text-2xl mb-4 text-center">
            <p>Quizz is finished !</p>
            <p>
              Your score is: {currentScore} / {props.questionsList.length}
            </p>
          </div>
          <div className="flex justify-center">
            <button className="m-2" onClick={() => returnHome()}>
              Home
            </button>
            <button className="m-2" onClick={() => restartGame()}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameInProgress;
