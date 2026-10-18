type SpinnerDotIconProps = {
  className?: string;
};

/** Figma 에셋: Ellipse 1 (취향 통합 대기) */
export default function SpinnerDotIcon({ className }: SpinnerDotIconProps) {
  return (
    <svg
      viewBox="0 0 11.9238 11.9238"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="5.96191" cy="5.96191" r="5.96191" fill="currentColor" />
    </svg>
  );
}
