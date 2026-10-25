import type { TransportType } from "@/entities/preference";
import { cn } from "@/shared/lib";
import { TRANSPORT_OPTIONS } from "../config/options";

type TransportOptionsProps = {
  defaultValues?: TransportType[];
};

/** 교통수단 여러 개 선택 (최소 1개는 제출할 때 확인함) */
export default function TransportOptions({ defaultValues = [] }: TransportOptionsProps) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-6 text-m text-black">선호하는 교통수단이 있나요?</legend>
      {/* 선택지가 8개라 한 줄에 4개씩 두 줄로 배치 */}
      <div className="grid grid-cols-4 gap-2.5">
        {TRANSPORT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex h-15 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-transparent bg-secondary-300 p-2.5 text-center text-xs whitespace-pre-line text-black",
              "has-checked:border-secondary-400 has-focus-visible:ring-1 has-focus-visible:ring-secondary-600",
            )}
          >
            <input
              type="checkbox"
              name="transport"
              value={option.value}
              defaultChecked={defaultValues.includes(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
