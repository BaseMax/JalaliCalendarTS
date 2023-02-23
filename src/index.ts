/**
 *
 * @Name: Jalali Calendar JS
 * @Author: Max Base
 * @Date: 2022/12/05
 * @Repository: https://github.com/BaseMax/JalaliCalendarJS
 *
 */

// Const variables
const days: { [key: number]: string } = {
  1: "شنبه",
  2: "یک شنبه",
  3: "دو شنبه",
  4: "سه شنبه",
  5: "چهار شنبه",
  6: "پنج شنبه",
  7: "جمعه",
};

// TODO: Never used
// const months: { [key: number]: string } = {
//   1: "فروردین",
//   2: "اردیبهشت",
//   3: "خرداد",
//   4: "تیر",
//   5: "مرداد",
//   6: "شهریور",
//   7: "مهر",
//   8: "آبان",
//   9: "آذر",
//   10: "دی",
//   11: "بهمن",
//   12: "اسفند",
// };

// Functions
// TODO: Never used
// const en2fa = (value: any) => {
//   return value.toString().replace(/[0-9]/g, (w) => {
//     var persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//     return persianNumbers[+w];
//   });
// };

const isLeapYear = (year: any) => {
  return year % 4 === 3 ? true : false;
};

const daysOfYear = (year: any) => {
  return isLeapYear(year) ? 366 : 365;
};

const daysOfMonth: any = (year: any, month: any) => {
  // 1-6 : max is 31           / Total ==> 6*31=186
  // 7-11: max is 30           / Total ==> 5*30=150
  // 12: leap:30 else 29       / Total ==> 30 or 29
  // A year is 365 or 366 day

  if (month > 12 || month < 1) return null;
  else if (month >= 1 && month <= 6) return 31;
  else if (month >= 7 && month <= 11) return 30;
  else if (month === 12) {
    if (isLeapYear(year) === true) return 30;
    return 29;
  }
  return null;
};

const jalaliDate = (year: any, month: any, day: any) => {
  const input = {
    year: year,
    month: month,
    day: day,
  };

  const result: any = [];
  const array = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  if (input["year"] <= 1600) {
    input["year"] -= 621;
    result["year"] = 0;
  } else {
    input["year"] -= 1600;
    result["year"] = 979;
  }

  const temp: any = input["year"] > 2 ? input["year"] + 1 : input["year"];
  // TODO: parseInt remove beucase it's not necessary.
  let days =
    (temp + 3) / 4 +
    365 * input["year"] -
    (temp + 99) / 100 -
    80 +
    array[input["month"] - 1] +
    (temp + 399) / 400 +
    input["day"];

  result["year"] += 33 * (days / 12053);
  days %= 12053;
  result["year"] += 4 * (days / 1461);
  days %= 1461;

  if (days > 365) {
    result["year"] += (days - 1) / 365;
    days = (days - 1) % 365;
  }

  result["month"] = days < 186 ? 1 + days / 31 : 7 + (days - 186) / 30;
  result["day"] = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return result;
};

const daysOfYearUntilDate = (year: any, month: any, day: any) => {
  let count_days = 0;

  for (let i = 1; i < month; i++) count_days += daysOfMonth(year, i);

  if (day > 31 || count_days + day > daysOfYear(year)) return null;

  count_days += day;

  return count_days;
};

const diffDays = (
  year1: any,
  month1: any,
  day1: any,
  year2: any,
  month2: any,
  day2: any
) => {
  const count_days1 = daysOfYearUntilDate(year1, month1, day1);
  const count_days2 = daysOfYearUntilDate(year2, month2, day2);

  // TODO: Never used
  // const isleap1 = isLeapYear(year1);
  // const isleap2 = isLeapYear(year2);

  const total_days1 = daysOfYear(year1); // 365 or 366
  const total_days2 = daysOfYear(year2); // 365 or 366

  // TODO: Never used
  // const diff_year = Math.abs(year1 - year2);

  if (count_days1 === null || count_days2 === null) return null;

  if (year1 === year2) return Math.abs(count_days2 - count_days1);
  else if (year1 > year2) {
    const rem_year2 = total_days2 - count_days2;
    let sum = 0;

    for (let i = year2 + 1; i < year1; i++) sum += daysOfYear(i);

    return rem_year2 + count_days1 + sum;
  } else if (year1 < year2) {
    const rem_year1 = total_days1 - count_days1;
    let sum = 0;

    for (let i = year1 + 1; i < year2; i++) sum += daysOfYear(i);

    return rem_year1 + count_days2 + sum;
  }

  // TODO: There is not diff_day
  // return diff_day;
  return -1;
};

const firstDayOfYear = (year: any) => {
  const default_day = 3; // دو شنبه
  const diff: any = diffDays(year, 1, 1, 1401, 1, 1);

  const day = (default_day + diff) % 7;

  if (day === 0) return 7;
  return day;
};

const firstDayOfMonth = (year: any, month: any) => {
  const default_day = firstDayOfYear(year);
  const diff: any = daysOfYearUntilDate(year, month, 1);
  const day = (default_day + diff - 1) % 7;

  if (day === 0) return 7;
  return day;
};

export { jalaliDate, days, daysOfMonth, firstDayOfYear, firstDayOfMonth };
