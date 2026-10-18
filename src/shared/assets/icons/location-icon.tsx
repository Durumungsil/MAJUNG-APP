type LocationIconProps = {
  className?: string;
};

/** Figma 에셋: boxicons:location */
export default function LocationIcon({ className }: LocationIconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g>
        <path
          d="M8 5C8 3.895 7.105 3 6 3C4.895 3 4 3.895 4 5C4 6.105 4.895 7 6 7C7.105 7 8 6.105 8 5ZM5 5C5 4.45 5.45 4 6 4C6.55 4 7 4.45 7 5C7 5.55 6.55 6 6 6C5.45 6 5 5.55 5 5Z"
          fill="currentColor"
        />
        <path
          d="M5.71 10.905C5.795 10.965 5.9 11 6 11C6.1 11 6.205 10.97 6.29 10.905C6.44 10.795 10.015 8.22 10 4.995C10 2.79 8.205 0.995 6 0.995C3.795 0.995 2 2.79 2 4.995C1.985 8.215 5.56 10.795 5.71 10.905ZM6 2C7.655 2 9 3.345 9 5C9.01 7.22 6.805 9.215 6 9.87C5.195 9.215 2.99 7.225 3 5C3 3.345 4.345 2 6 2Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
