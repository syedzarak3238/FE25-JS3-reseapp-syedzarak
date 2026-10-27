// 10540000 -> "10 540 000"
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("sv-SE").format(value);
}
