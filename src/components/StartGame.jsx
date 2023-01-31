function StartGame(props) {
  return (
    <div className="StartGame">
      <p>
        Welcome to the SUWY Quizz, <br /> You'll have to answer 15 questions.
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
