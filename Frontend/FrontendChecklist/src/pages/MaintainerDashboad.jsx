
function MaintainerDashboard() {
  return (
    <div>
      <h1>Maintainer Dashboard</h1>
      <p>Welcome, Maintainer! 🛠️</p>
       <button 
        onClick={() => navigate("/Create-template")}>
        Create Checklist Template
      </button>
    </div>
  );
}

export default MaintainerDashboard;
