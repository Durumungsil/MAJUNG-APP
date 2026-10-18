type StarFilledIconProps = {
  className?: string;
};

/** Figma 에셋: Star (filled) */
export default function StarFilledIcon({ className }: StarFilledIconProps) {
  return (
    <svg
      viewBox="0 0 24.7275 23.5172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12.3637 0L15.2824 8.98278H24.7275L17.0863 14.5344L20.0049 23.5172L12.3637 17.9656L4.72253 23.5172L7.64121 14.5344L0 8.98278H9.44505L12.3637 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
