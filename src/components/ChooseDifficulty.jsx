
function ChooseDifficulty(props) {
  const difficulties = ["easy", "medium", "hard"];
  return (
    <div className="ChooseDifficulty">
      <p>Choose your difficulty :</p>
      {difficulties.map((difficulty, index) => {
        return (
          <button key={index} onClick={() => props.setDifficulty(difficulty)}>
            {difficulty}
          </button>
        );
      })}
    </div>
  );
}

export default ChooseDifficulty;
