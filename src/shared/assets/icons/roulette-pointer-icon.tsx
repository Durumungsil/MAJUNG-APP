type RoulettePointerIconProps = {
  className?: string;
};

/** Figma 에셋: 룰렛 바늘 Group 1 */
export default function RoulettePointerIcon({ className }: RoulettePointerIconProps) {
  return (
    <svg
      viewBox="0 0 29 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M14.5 0.5C18.1843 0.500028 21.4337 1.95685 24.2666 4.91602C27.0758 7.85046 28.5024 11.8076 28.5 16.8438C28.5 20.1498 27.3398 23.7854 24.9688 27.7588C22.6553 31.6355 19.17 35.8435 14.5 40.3848C9.83104 35.8421 6.34575 31.6343 4.03223 27.7588C1.66116 23.7868 0.501167 20.1513 0.5 16.8438C0.50006 11.8077 1.92644 7.85047 4.73438 4.91602C7.56616 1.95671 10.8155 0.5 14.5 0.5Z"
        className="fill-secondary-400 stroke-secondary-800"
      />
      <circle cx="14.5" cy="15" r="2.5" className="fill-secondary-800 stroke-secondary-800" />
    </svg>
  );
}
