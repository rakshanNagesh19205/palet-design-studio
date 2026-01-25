const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="text-center">
          <h1 className="text-heading-xl font-semibold">Reset Password</h1>
          <p className="mt-2 text-body-md text-muted-foreground">
            We'll send you a reset link
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-center text-muted-foreground">
            Password reset form coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
