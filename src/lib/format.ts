export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatTimeAgo(dateString: string): string {
  // Simple fallback for date strings
  return dateString;
}

export function truncateHash(hash: string, length = 12): string {
  if (!hash) return '';
  return hash.slice(0, length) + '...';
}
