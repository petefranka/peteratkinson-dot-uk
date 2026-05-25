export function formatRelativeDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 5) return 'Just posted';

  const diffHours = Math.floor(diffMs / 3_600_000);
  if (diffHours < 1) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;

  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  const diffMonths = Math.round(diffDays / 30.44);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;

  const diffYears = Math.round(diffDays / 365.25);
  return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
}
