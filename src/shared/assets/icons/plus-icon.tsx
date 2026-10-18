type PlusIconProps = {
  className?: string;
};

/** Figma 에셋: Vector (그룹 목록 +) */
export default function PlusIcon({ className }: PlusIconProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M11 21V11M11 11V1M11 11H21M11 11H1"
        strokeWidth="2"
        strokeLinecap="round"
        stroke="currentColor"
      />
    </svg>
  );
}
