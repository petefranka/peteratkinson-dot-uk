export default function AvailabilityBadge() {
  return (
    <div data-testid="availability-badge" className="availability-badge">
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full availability-ping opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full availability-dot" />
      </span>
      Available for work
    </div>
  );
}
