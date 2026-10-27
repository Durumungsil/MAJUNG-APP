import type { CSSProperties } from "react";
import { RoulettePointerIcon, RouletteWheelImage } from "@/shared/assets";

type RouletteWheelProps = {
  /** 누적 회전 각도(deg) */
  rotation: number;
  spinning: boolean;
  onStartClick: () => void;
};

export default function RouletteWheel({ rotation, spinning, onStartClick }: RouletteWheelProps) {
  // 회전 각도는 매번 달라지는 동적 값이라 style로 지정함
  const wheelStyle: CSSProperties = { transform: `rotate(${rotation}deg)` };

  return (
    <div className="relative h-75.25 w-70">
      <div className="absolute top-5.25 left-0 size-70">
        {/* duration은 config/spin.ts의 SPIN_DURATION_MS와 같아야 함 */}
        <div
          style={wheelStyle}
          className="size-full transition-transform duration-3000 ease-[cubic-bezier(0.17,0.67,0.12,0.99)] motion-reduce:transition-none"
        >
          <RouletteWheelImage className="size-full" />
        </div>
        <button
          type="button"
          onClick={onStartClick}
          disabled={spinning}
          aria-label="룰렛 돌리기"
          className="absolute top-1/2 left-1/2 flex size-12.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-secondary-800 bg-secondary-400 text-xxs text-text-primary">
            start
          </span>
        </button>
      </div>
      <RoulettePointerIcon className="absolute top-0 left-31 h-10.25 w-7.25" />
    </div>
  );
}
