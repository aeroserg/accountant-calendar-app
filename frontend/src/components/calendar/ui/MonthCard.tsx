"use client";
// src/components/calendar/ui/MonthCard.tsx
import React from "react";
import { DayCell } from "@/components/calendar/ui/DayCell";
import { getRuMonthInfinitiv } from "@/lib/date.util";

// Типы для дня месяца
export interface DayCellData {
  day: number; // число месяца
  strapi: boolean; // есть ли событие из Strapi
  user: boolean; // есть ли заметка пользователя
  isSelected: boolean; // выбрана ли дата
  isToday?: boolean; // сегодняшняя дата
}

interface MonthCardProps {
  month: string; // "Март"
  year: number;
  days: DayCellData[]; // массив данных по дням месяца (с флагами)
  weekStartsOn?: number; // 1 = Пн (default)
  onSelect?: (day: number) => void;
}

export const MonthCard: React.FC<MonthCardProps> = ({
  month,
  year,
  days,
  weekStartsOn = 1,
  onSelect,
}) => {
  // Для рендера дней недели (RU)
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const orderedWeek = weekDays
    .slice(weekStartsOn - 1)
    .concat(weekDays.slice(0, weekStartsOn - 1));

  // Определяем смещение для первой недели
  const firstDate = new Date(year, monthIndex(month), 1);
  console.log(firstDate)

  let offset = firstDate.getDay() - weekStartsOn;
  console.log(offset)

  if (offset < 0) offset += 7;
  console.log(offset)

  // Календарная сетка с пустыми ячейками для смещения
  const calendarDays: (DayCellData | null)[] = [
    ...Array(offset).fill(null),
    ...days,
  ];
  // Добавляем пустые ячейки в конце недели (если нужно)
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  return (
    <div className="bg-[var(--foreground)] md:rounded-[32px] rounded-[20px] lg:p-7 p-4 px-8 w-full md:w-[360px] shadow flex flex-col items-start">
      <div className="text-2xl font-inter font-normal mb-1">
        {getRuMonthInfinitiv(monthIndex(month)+1)}{" "}
        <span className="text-2xl font-inter font-normal text-gray-500">
          {year}
        </span>
      </div>
      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1 mb-1 w-full">
        {orderedWeek.map((wd) => (
          <div
            key={wd}
            className="text-base font-inter font-semibold text-[var(--color-dark)] text-center"
          >
            {wd}
          </div>
        ))}
      </div>
      {/* Сетка дней месяца */}
      <div className="grid grid-cols-7 gap-2  w-full place-items-center">
        {calendarDays.map((cell, idx) =>
          cell ? (
            <DayCell
              key={idx}
              day={cell.day}
              strapi={cell.strapi}
              user={cell.user}
              isSelected={cell.isSelected}
              isToday={cell.isToday}
              onSelect={onSelect}
            />
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
};

// Функция перевода месяца на индекс (RU)
function monthIndex(month: string): number {
  const nominative = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
  ];
  const genitive = [
    "Января","Февраля","Марта","Апреля","Мая","Июня",
    "Июля","Августа","Сентября","Октября","Ноября","Декабря",
  ];
  const idx = nominative.map(m => m.toLowerCase()).indexOf(month.toLowerCase());
  if (idx !== -1) return idx;
  return genitive.map(m => m.toLowerCase()).indexOf(month.toLowerCase());
}

