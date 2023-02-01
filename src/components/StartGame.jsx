function StartGame(props) {
  return (
    <div className="StartGame flex flex-col items-center justify-center text-center">
      <p className="mb-8 text-xl font-medium">
        Welcome to the SUWY Quizz, <br /> You'll have to answer {props.QUESTIONS_AMOUNT} questions.
      </p>
      <button
        onClick={() => {
          props.setIsGameStarted(true);
        }}
      >
        Start the game
      </button>
    </div>
  );
}

export default StartGame;
