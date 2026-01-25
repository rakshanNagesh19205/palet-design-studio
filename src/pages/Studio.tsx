const Studio = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Configuration */}
      <aside className="w-[400px] border-r border-studio-border bg-studio-panel">
        <div className="flex h-14 items-center border-b border-studio-border px-4">
          <span className="font-semibold">Configuration</span>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground">9 accordion sections coming soon</p>
        </div>
      </aside>
      
      {/* Right Panel - Preview */}
      <main className="flex-1">
        <div className="flex h-14 items-center justify-between border-b border-studio-border px-4">
          <span className="text-muted-foreground">Preview</span>
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-muted-foreground">Step 3 of 3</span>
          </div>
        </div>
        <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
          <p className="text-muted-foreground">Live preview coming soon</p>
        </div>
      </main>
    </div>
  );
};

export default Studio;
