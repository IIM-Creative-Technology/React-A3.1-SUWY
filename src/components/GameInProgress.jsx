import { useState, useEffect } from "react";
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
          <p>Tu as repondu a toutes les questions GG</p>
          <p>
            Your score is: {currentScore} / {props.questionsList.length}
          </p>
          <button onClick={() => returnHome()}>Home</button>
          <button onClick={() => restartGame()}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default GameInProgress;
