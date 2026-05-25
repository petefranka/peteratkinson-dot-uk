export default function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      data-testid="chevron-icon"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-data-[state=open]:rotate-180"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
