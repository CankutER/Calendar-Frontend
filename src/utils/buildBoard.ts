import { Month, months } from "./timeUtils";

export function buildCalendar(month: Month, year: string) {
  const monthStr =
    months.indexOf(month) < 9
      ? "0" + (months.indexOf(month) + 1)
      : `${months.indexOf(month) + 1}`;
  let firstDayOfMonth = new Date(`${year}-${monthStr}-01`);

  let currentDay = firstDayOfMonth.getDay();
  let startDay = new Date(
    firstDayOfMonth.getTime() - (currentDay - 1) * 24 * 60 * 60 * 1000
  );

  let monthCalendar = [];
  for (let i = 0; i < 42; i++) {
    monthCalendar.push(new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000));
  }
  return monthCalendar;
}
