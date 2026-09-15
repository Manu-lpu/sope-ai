import ApplicationCard from "../components/ApplicationCard";

const Dashboard = () => {
  return (
    <section>
      <h2>Dashboard</h2>
      <ApplicationCard
        title="Graduate Program SOP"
        organization="Research Lab"
        status="Draft"
      />
    </section>
  );
};

export default Dashboard;
