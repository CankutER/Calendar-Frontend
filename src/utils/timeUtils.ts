export type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "April"
  | "May"
  | "June"
  | "July"
  | "Aug"
  | "Sept"
  | "Oct"
  | "Nov"
  | "Dec";
export type Day = "Sun" | "Mon" | "Tue" | "Wed" | "Thur" | "Fri" | "Sat";
export const months: ReadonlyArray<Month> = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const days: ReadonlyArray<Day> = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
];

let years: string[] = [];

for (let i = 1970; i <= 2100; i++) {
  years.push(i.toString());
}

export { years };
