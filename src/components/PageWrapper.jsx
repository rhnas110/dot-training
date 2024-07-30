import { cn } from "@/utils";
export const PageWrapper = ({ className, children }) => {
  return (
    <main className={cn("max-w-sm px-2 mx-auto h-min w-full", className)}>
      {children}
    </main>
  );
};
