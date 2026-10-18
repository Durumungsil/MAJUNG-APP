type MapPinIconProps = {
  /** default: 일정 장소(하늘색), active: 선택된 장소(남색) */
  variant?: "default" | "active";
  className?: string;
};

const PIN_PATH =
  "M16.8619 47.7754C11.2061 42.321 6.98223 37.2552 4.19018 32.578C1.39813 27.9008 0.00140516 23.5708 0 19.5879C0 13.616 1.69532 8.85835 5.08597 5.31501C8.47661 1.77167 12.4019 0 16.8619 0C21.3219 0 25.2479 1.77167 28.6399 5.31501C32.032 8.85835 33.7266 13.616 33.7238 19.5879C33.7238 23.5692 32.3277 27.8992 29.5357 32.578C26.7437 37.2568 22.519 42.3226 16.8619 47.7754Z";

/** Figma 에셋: Group 22 / Group 13 (default), Group 6 (active) */
export default function MapPinIcon({ variant = "default", className }: MapPinIconProps) {
  const isActive = variant === "active";

  return (
    <svg
      viewBox="0 0 33.7239 47.7755"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d={PIN_PATH} className={isActive ? "fill-primary-1000" : "fill-primary-400"} />
      <circle
        cx="17.444"
        cy="17.4434"
        r="3.48867"
        className={isActive ? "fill-primary-100" : "fill-primary-300"}
      />
    </svg>
  );
}
