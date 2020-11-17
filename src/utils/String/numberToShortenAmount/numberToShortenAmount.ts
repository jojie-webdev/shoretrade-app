export default function numberToShortenAmount(number: number | ''): string {
  if (typeof number !== 'number') return '-';
  if (number >= 1000) {
    return `$${(number / 1000).toFixed(2)}k`;
  }
  return `$${number.toFixed(2)}`;
}
