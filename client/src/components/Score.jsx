const Score = ({ value = 0, label = "Score" }) => {
  return (
    <div className="score-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
};

export default Score;
