import { getOpendtdbApiData } from "../api/get-opendtdb-api-data";
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

  const QUESTIONS_AMOUNT = 10;

  useEffect(() => {
    if (!difficulty && !category) return;
    getQuestionsData();
  }, [difficulty]);

  async function getQuestionsData() {
    let paramCategory = category ? `&category=${category}` : "";
    const responseData = await getOpendtdbApiData(
      `/api.php?amount=${QUESTIONS_AMOUNT}${paramCategory}&difficulty=${difficulty}`
    );
    const questionsData = responseData.results;
    const questionsDataSanitized = questionsData.map((question) => {
      const questionSanitized = {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: sanitiseString(question.question),
        correct_answer: sanitiseString(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map((answer) =>
          sanitiseString(answer)
        ),
      };
      return questionSanitized;
    });

    setQuestionsList(questionsDataSanitized);
  }

  function sanitiseString(string) {
    return string.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  }

  return (
    <div className="Game mx-auto container flex flex-col items-center justify-center mt-10">
      <h1 className="font-bold mb-4 text-5xl">Quizz</h1>
      {!isGameStarted && (
        <StartGame
          setIsGameStarted={setIsGameStarted}
          QUESTIONS_AMOUNT={QUESTIONS_AMOUNT}
        />
      )}
      {isGameStarted &&
        category === "" &&
        questionsList.length === 0 &&
        difficulty === "" && <ChooseCategory setCategory={setCategory} />}

      {isGameStarted &&
        questionsList.length === 0 &&
        category != "" &&
        difficulty === "" && <ChooseDifficulty setDifficulty={setDifficulty} />}
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
