import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={2000}
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast !py-2 !px-4 !min-h-0 !rounded-full !shadow-md !border-0 !text-body-sm !font-medium",
          description: "hidden",
          actionButton: "hidden",
          cancelButton: "hidden",
          success: "!bg-success !text-success-foreground",
          error: "!bg-destructive !text-destructive-foreground",
          warning: "!bg-warning !text-warning-foreground",
          info: "!bg-primary !text-primary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
