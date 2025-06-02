// lib/date.util.ts

export const START_YEAR = 2025;
/**
 * Количество месяцев вперёд, которые доступны от текущего месяца (например, 12 = год)
 * Можно изменить на любое значение, например 18 или 6
 */
export const MONTHS_FORWARD = 12;
/**
 * Количество лет назад (от текущего месяца), которые доступны (например, 2 = два года назад)
 * Можно тоже вынести, если потребуется изменять часто
 */
export const YEARS_BACKWARD = 2;

interface Period {
  year: number;
  months: number[];
}

/**
 * Возвращает доступные года и месяцы:
 * от (текущий месяц - YEARS_BACKWARD лет) до (текущий месяц + MONTHS_FORWARD месяцев), но не раньше января 2025
 */
export function getAvailablePeriods(today: Date = new Date()): Period[] {
  const monthsInYear = 12;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // Нижняя граница (но не раньше января 2025)
  let startYear = currentYear - YEARS_BACKWARD;
  let startMonth = currentMonth;
  if (startYear < START_YEAR) {
    startYear = START_YEAR;
    startMonth = 1;
  }

  // Верхняя граница (текущий месяц + MONTHS_FORWARD месяцев)
  let endYear = currentYear;
  let endMonth = currentMonth + MONTHS_FORWARD;
  while (endMonth > monthsInYear) {
    endMonth -= monthsInYear;
    endYear += 1;
  }

  // Формируем периоды по годам
  const periods: Period[] = [];
  for (let year = startYear; year <= endYear; year++) {
    let months: number[] = [];
    if (year === startYear && year === endYear) {
      months = Array.from(
        { length: endMonth - startMonth + 1 },
        (_, i) => startMonth + i
      );
    } else if (year === startYear) {
      months = Array.from(
        { length: monthsInYear - startMonth + 1 },
        (_, i) => startMonth + i
      );
    } else if (year === endYear) {
      months = Array.from({ length: endMonth }, (_, i) => i + 1);
    } else {
      months = Array.from({ length: monthsInYear }, (_, i) => i + 1);
    }
    if (months.length > 0) {
      periods.push({ year, months });
    }
  }
  return periods;
}

// --- УТИЛИТЫ для локального времени ---
export const pad = (n: number) => n.toString().padStart(2, "0");

export const getLocalDateString = () => {
  const now = new Date();
  return [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join(
    "-"
  );
};

export const getLocalTimeString = () => {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

export function getRuMonthDativ(monthNum: number): string {
  return [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ][monthNum - 1];
}
export function getRuMonthInfinitiv(monthNum: number): string {
  return [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ][monthNum - 1];
}
