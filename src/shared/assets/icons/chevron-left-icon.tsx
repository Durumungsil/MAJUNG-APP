type ChevronLeftIconProps = {
  className?: string;
};

/** Figma 에셋: akar-icons:chevron-left (30px). 20px 인스턴스도 선 두께가 2px라 stroke를 고정함 */
export default function ChevronLeftIcon({ className }: ChevronLeftIconProps) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g>
        <path
          d="M18.75 5L8.75 15L18.75 25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}
