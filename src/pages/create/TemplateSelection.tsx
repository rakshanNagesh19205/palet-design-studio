const TemplateSelection = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-8 text-center">
          <p className="text-overline uppercase text-muted-foreground">Step 1 of 3</p>
          <h1 className="mt-2 text-display-sm font-bold">What are you building?</h1>
          <p className="mt-2 text-body-lg text-muted-foreground">
            Choose a template that matches your project type
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-8">
          <p className="text-center text-muted-foreground">
            11 template cards coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
