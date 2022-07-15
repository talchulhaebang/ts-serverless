export function isWeekend(date: Date) {
  return date.getDay() === 6 || date.getDay() === 0;
}
