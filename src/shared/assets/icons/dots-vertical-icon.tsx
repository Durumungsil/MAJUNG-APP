type DotsVerticalIconProps = {
  className?: string;
};

/** Figma 에셋: flowbite:dots-vertical-outline */
export default function DotsVerticalIcon({ className }: DotsVerticalIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g>
        <path
          d="M10 5H10.0083M10 10H10.0083M10 15H10.0083"
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}
