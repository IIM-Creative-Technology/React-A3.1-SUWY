import { getOpendtdbApiData } from "../api/get-opendtdb-api-data";
import { useStopwatch } from "react-timer-hook";
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
  const [isLoading, setIsLoading] = useState(false);
  const { minutes, seconds, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const QUESTIONS_AMOUNT = import.meta.env.VITE_QUESTIONS_AMOUNT || 10;

  useEffect(() => {
    if (!difficulty && !category) return;
    getQuestionsData();
  }, [difficulty]);

  async function getQuestionsData() {
    setIsLoading(true);
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
    start();
    setIsLoading(false);
  }

  function sanitiseString(string) {
    return string
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&ldquo/, '"')
      .replace(/&rdquo/, '"')
      .replace(/&rsquo/, "'")
      .replace(/&amp;/g, "&")
      .replace(/&eacute;/g, "é");
  }

  function displayTime(minutes, seconds) {
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  return (
    <div className="Game relative mx-auto container flex flex-col items-center justify-center mt-10">
      <h1 className="font-bold mb-4 text-5xl">Quizz</h1>
      {!isGameStarted && (
        <StartGame
          setIsGameStarted={setIsGameStarted}
          QUESTIONS_AMOUNT={QUESTIONS_AMOUNT}
        />
      )}
      {isGameStarted && category == "" && (
        <ChooseCategory
          setCategory={setCategory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {isGameStarted && category != "" && difficulty == "" && (
        <ChooseDifficulty setDifficulty={setDifficulty} />
      )}
      {isGameStarted &&
        difficulty != "" &&
        (questionsList.length > 0 ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">
              {displayTime(minutes, seconds)}
            </p>
            <GameInProgress
              setDifficulty={setDifficulty}
              questionsList={questionsList}
              setIsGameStarted={setIsGameStarted}
              setQuestionsList={setQuestionsList}
              getQuestionsData={getQuestionsData}
              setCategory={setCategory}
              isLoading={isLoading}
              pause={pause}
              reset={reset}
            />
          </div>
        ) : (
          <img className="w-16 h-16" src="/loading.gif" />
        ))}
    </div>
  );
}

export default Game;
