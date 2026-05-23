export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', options);
}

export function getAgeInMonths(dateString: string): number {
  const articleDate = new Date(dateString);
  const now = new Date();
  return (now.getFullYear() - articleDate.getFullYear()) * 12 + (now.getMonth() - articleDate.getMonth());
}

export function formatArticleAge(dateString: string): string {
  const months = getAgeInMonths(dateString);
  if (months >= 12) {
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  return `${months} months`;
}
