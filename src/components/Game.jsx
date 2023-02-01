import { getApi } from "../api/get-api";
import StartGame from "./StartGame";
import GameInProgress from "./GameInProgress";
import { useState, useEffect } from "react";
import ChooseDifficulty from "./ChooseDifficulty";
import ChooseCategory from "./ChooseCategory";
function Game() {
  const [questionsList, setQuestionsList] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  

  useEffect(() => {
    if (!difficulty && !category) return;
    getQuestionsData();
  }, [difficulty]);
  
  async function getQuestionsData() {
    let paramCategory = category ? `&category=${category}` : '';
    const responseData = await getApi(`/api.php?amount=2${paramCategory}&difficulty=${difficulty}`);
    const questionsData = responseData.results;
    setQuestionsList(questionsData);
  }

  return (
    <div className="Game">
      <h1>Game</h1>
      {!isGameStarted && <StartGame setIsGameStarted={setIsGameStarted} />}
      {isGameStarted && category === "" && questionsList.length === 0 && difficulty === "" &&(
        <ChooseCategory setCategory={setCategory} />
      )}

      {isGameStarted && questionsList.length === 0 && category != "" && difficulty === "" && (
        <ChooseDifficulty setDifficulty={setDifficulty} />
      )}
      {isGameStarted && questionsList.length > 0 && difficulty != "" && (
        <GameInProgress
          setDifficulty={setDifficulty}
          questionsList={questionsList}
          setIsGameStarted={setIsGameStarted}
          setQuestionsList={setQuestionsList}
          getQuestionsData={getQuestionsData}
          setCategory={setCategory}
        />
      )}
    </div>
  );
}

export default Game;
