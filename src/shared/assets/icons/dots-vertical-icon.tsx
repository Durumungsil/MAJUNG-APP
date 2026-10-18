type DotsVerticalIconProps = {
  className?: string;
};

/** Figma 에셋: flowbite:dots-vertical-outline */
export default function DotsVerticalIcon({ className }: DotsVerticalIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g>
        <path
          d="M12 6H12.01M12 12H12.01M12 18H12.01"
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}
