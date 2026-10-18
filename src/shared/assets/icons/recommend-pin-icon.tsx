type RecommendPinIconProps = {
  className?: string;
};

const PIN_PATH =
  "M11.3776 32.2367C7.56139 28.5563 4.71129 25.1381 2.82734 21.9822C0.943396 18.8262 0.000948137 15.9045 0 13.217C0 9.18745 1.14393 5.97721 3.43178 3.58633C5.71964 1.19544 8.36826 0 11.3776 0C14.387 0 17.0361 1.19544 19.3249 3.58633C21.6137 5.97721 22.7572 9.18745 22.7553 13.217C22.7553 15.9034 21.8133 18.8251 19.9294 21.9822C18.0454 25.1392 15.1948 28.5574 11.3776 32.2367Z";
const DOT_PATH =
  "M14.1244 11.77C14.1244 13.0701 13.0705 14.124 11.7704 14.124C10.4704 14.124 9.41644 13.0701 9.41644 11.77C9.41644 10.47 10.4704 9.41604 11.7704 9.41604C13.0705 9.41604 14.1244 10.47 14.1244 11.77Z";

/**
 * Figma 에셋: Group 15~20 (주변 추천 장소 핀)
 * 원본은 mask로 안쪽 stroke를 표현함 → clipPath로 같은 결과를 냄
 */
export default function RecommendPinIcon({ className }: RecommendPinIconProps) {
  return (
    <svg
      viewBox="0 0 22.7554 32.2367"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <clipPath id="recommend-pin-body">
          <path d={PIN_PATH} />
        </clipPath>
      </defs>
      <path
        d={PIN_PATH}
        clipPath="url(#recommend-pin-body)"
        strokeWidth="4"
        className="fill-secondary-400 stroke-secondary-1000"
      />
      <path d={DOT_PATH} className="fill-secondary-1000" />
    </svg>
  );
}
