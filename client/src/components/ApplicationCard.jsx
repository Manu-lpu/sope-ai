const ApplicationCard = ({ title, organization, status }) => {
  return (
    <article className="application-card">
      <h3>{title}</h3>
      <p>{organization}</p>
      <span>{status}</span>
    </article>
  );
};

export default ApplicationCard;
