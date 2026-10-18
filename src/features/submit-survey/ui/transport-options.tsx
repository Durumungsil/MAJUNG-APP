import { cn } from "@/shared/lib";
import { TRANSPORT_OPTIONS } from "../config/options";

export default function TransportOptions() {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-6 text-m text-black">선호하는 교통수단이 있나요?</legend>
      <div className="flex gap-2.5">
        {TRANSPORT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex h-24 flex-1 cursor-pointer flex-col items-center justify-end rounded-lg border-2 border-transparent bg-secondary-300 p-2.5 text-xs text-black",
              "has-checked:border-secondary-400 has-focus-visible:ring-1 has-focus-visible:ring-secondary-600",
            )}
          >
            <input type="radio" name="transport" value={option.value} className="sr-only" />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
