function ChooseDifficulty(props) {
  const difficulties = ["easy", "medium", "hard"];
  return (
    <div className="ChooseDifficulty">
      <p className="font-bold text-2xl mb-4 text-center">Choose your Difficulty:</p>
      {difficulties.map((difficulty, index) => {
        return (
          <button className="m-2" key={index} onClick={() => props.setDifficulty(difficulty)}>
            {difficulty}
          </button>
        );
      })}
    </div>
  );
}

export default ChooseDifficulty;
