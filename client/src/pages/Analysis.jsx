import Score from "../components/Score";

const Analysis = () => {
  return (
    <section>
      <h2>AI analysis</h2>
      <Score value={92} label="Overall score" />
      <p>
        Your statement is polished but can be strengthened with more measurable
        impact.
      </p>
    </section>
  );
};

export default Analysis;
