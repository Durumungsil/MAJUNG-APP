import { cn } from "@/shared/lib";

type ModeCardProps = {
  name: string;
  size: "lg" | "sm";
  className?: string;
};

export default function ModeCard({ name, size, className }: ModeCardProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 justify-center rounded-lg bg-primary-400 text-center font-point text-primary-100",
        size === "lg" ? "h-68.25 w-51.5 px-5 py-8 text-mode-lg" : "h-53 w-40 p-5 text-mode-sm",
        className,
      )}
    >
      <p>
        {name}
        <br />
        MODE
      </p>
    </div>
  );
}
