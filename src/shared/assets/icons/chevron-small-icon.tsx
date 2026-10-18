type ChevronSmallIconProps = {
  className?: string;
};

/** Figma 에셋: akar-icons:chevron-left (18px) */
export default function ChevronSmallIcon({ className }: ChevronSmallIconProps) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g>
        <path
          d="M11.25 3L5.25 9L11.25 15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}
