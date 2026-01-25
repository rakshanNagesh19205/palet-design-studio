const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-display-sm font-bold">Your Projects</h1>
            <p className="mt-1 text-body-md text-muted-foreground">
              Manage and continue working on your design systems
            </p>
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground">
            New Project
          </button>
        </div>
        <div className="rounded-lg border border-border bg-card p-8">
          <p className="text-center text-muted-foreground">
            Project cards coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
