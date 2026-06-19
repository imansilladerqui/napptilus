type ChevronLeftIconProps = {
  className?: string;
};

export const ChevronLeftIcon = ({ className }: ChevronLeftIconProps) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7.5 9.5L4 6L7.5 2.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
