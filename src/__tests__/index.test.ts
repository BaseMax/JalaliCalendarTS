import {
  jalaliDate,
  daysOfMonth,
  days,
  firstDayOfYear,
  firstDayOfMonth,
} from "../index";

test("should work", () => {
  jalaliDate(2022, 12, 5);
  daysOfMonth(1401, 9);

  days[firstDayOfYear(1401)]; // دو شنبه
  days[firstDayOfMonth(1401, 9)];
});
