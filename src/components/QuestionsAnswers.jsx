import { useState, useEffect } from "react";
function QuestionsAnswers(props) {
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentGoodAnwser, setCurrentGoodAnwser] = useState("");

  useEffect(() => {
    if (props.questionsList.length === 0) return;
    const actualWrongAnwsers =
      props.questionsList[currentQuestionIndex].incorrect_answers;
    const actualGoodAnwser =
      props.questionsList[currentQuestionIndex].correct_answer;
    const actualAnwsers = [...actualWrongAnwsers, actualGoodAnwser];
    const shuffledAnwsers = shuffleAnwsers(actualAnwsers);
    setCurrentAnswers(shuffledAnwsers);
    setCurrentGoodAnwser(actualGoodAnwser);
    console.log(props.questionsList[currentQuestionIndex].difficulty);
    //console.log(actualGoodAnwser);
  }, [currentQuestionIndex, props.questionsList]);

  function nextQuestion() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswerClicked(false);
  }

  function shuffleAnwsers(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function verifyAnwser(answer) {
    setIsAnswerClicked(true);
    if (answer == currentGoodAnwser) {
      setIsAnswerCorrect(true);
      props.setCurrentScore(props.currentScore + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  }

  return (
    <div className="QuestionsAnswers">
      <p>{props.questionsList[currentQuestionIndex].question}</p>

      {currentAnswers.map((answer, index) => {
        // questions
        return (
          <button
            disabled={isAnswerClicked}
            onClick={() => {
              verifyAnwser(answer);
            }}
            key={index}
          >
            {answer}
          </button>
        );
      })}

      {isAnswerClicked && // result
        (isAnswerCorrect ? (
          <p className="text-green-500">Congratulations !</p>
        ) : (
          <p className="text-red-500">
            Wrong ! The good answer was {currentGoodAnwser}
          </p>
        ))}
      {isAnswerClicked && // button next
        currentQuestionIndex < props.questionsList.length && (
          <button
            onClick={() => {
              if (currentQuestionIndex === props.questionsList.length - 1) {
                props.setIsGameEnded(true);
              } else {
                nextQuestion();
              }
            }}
          >
            {currentQuestionIndex === props.questionsList.length - 1
              ? "End"
              : "Next"}
          </button>
        )}
    </div>
  );
}

export default QuestionsAnswers;
