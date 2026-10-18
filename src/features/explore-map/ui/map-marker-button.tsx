import type { ReactNode } from "react";

type MapMarkerButtonProps = {
  label: string;
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function MapMarkerButton({
  label,
  pressed,
  onClick,
  children,
}: MapMarkerButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="block"
    >
      {children}
    </button>
  );
}
