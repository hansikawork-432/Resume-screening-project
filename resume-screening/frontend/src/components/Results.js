function Results({ data }) {
  return (
    <div className="card">
      <h3>Score: {data.score}%</h3>

      <progress value={data.score} max="100" />

      <h4>Skills</h4>
      {data.skills_found.map(skill => (
        <span key={skill} className="chip">{skill}</span>
      ))}

      <p>Experience: {data.experience_years} years</p>

      <p>
        🧠 This candidate matches {data.score}% of the role requirements
      </p>
    </div>
  );
}

export default Results;
