import readingTime from 'reading-time';

export function getReadingTime(rawContent: string): string {
  return readingTime(rawContent).text;
}
