// components/shared/ui/Wheels.tsx
'use client';

import React, { FC, useState, useMemo } from 'react';
import clsx from 'clsx';
import { getAvailablePeriods } from '@/lib/date.util';

export const TimeWheel: FC<{ value: string, onChange: (val: string) => void }> = ({ value, onChange }) => {
    const [hour, setHour] = useState(() => value ? +value.split(':')[0] : 12);
    const [minute, setMinute] = useState(() => value ? +value.split(':')[1] : 0);
  
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
  
    // Вместо автоматического onChange, делаем ручной onConfirm
    const handleConfirm = () => {
      onChange(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    };
  
    return (
      <div className="flex flex-col gap-3 p-2 bg-[var(--color-main-light)] rounded-xl items-center">
        <div className="flex gap-3 justify-center">
          <div className="flex flex-col h-36 overflow-y-scroll snap-y scroll-smooth">
            {hours.map(h => (
              <div
                key={h}
                onClick={() => setHour(h)}
                className={clsx(
                  "text-xl font-geologica cursor-pointer text-center px-3 snap-center",
                  h === hour ? "text-[var(--color-main)] font-bold" : "text-gray-500"
                )}
              >
                {h.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          <div className="text-xl font-geologica flex items-center">:</div>
          <div className="flex flex-col h-36 overflow-y-scroll snap-y scroll-smooth">
            {minutes.map(m => (
              <div
                key={m}
                onClick={() => setMinute(m)}
                className={clsx(
                  "text-xl font-geologica cursor-pointer text-center px-3 snap-center",
                  m === minute ? "text-[var(--color-main)] font-bold" : "text-gray-500"
                )}
              >
                {m.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
        <button
          className="mt-4 px-6 py-2 rounded-lg bg-[var(--color-main)] text-white font-geologica"
          onClick={handleConfirm}
        >
          OK
        </button>
      </div>
    );
  };

// DateWheel: wheel picker по дням с учётом доступных периодов (года/месяцы)
export const DateWheel: FC<{ value: string, onChange: (val: string) => void }> = ({ value, onChange }) => {
  const today = new Date();
  const periods = useMemo(() => getAvailablePeriods(today), [today]);
  const years = periods.map(p => p.year);

  const [selectedYear, setSelectedYear] = useState(() => {
    const y = value ? +value.slice(0, 4) : today.getFullYear();
    return years.includes(y) ? y : years[0];
  });
  const monthsInYear = periods.find(p => p.year === selectedYear)?.months ?? [];
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const m = value ? +value.slice(5, 7) : today.getMonth() + 1;
    return monthsInYear.includes(m) ? m : monthsInYear[0];
  });
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const [selectedDay, setSelectedDay] = useState(() => {
    const d = value ? +value.slice(8, 10) : today.getDate();
    return d <= daysInMonth ? d : 1;
  });

  React.useEffect(() => {
    if (!monthsInYear.includes(selectedMonth)) {
      setSelectedMonth(monthsInYear[0]);
      setSelectedDay(1);
    }
    // eslint-disable-next-line
  }, [selectedYear]);

  React.useEffect(() => {
    if (selectedDay > new Date(selectedYear, selectedMonth, 0).getDate()) {
      setSelectedDay(1);
    }
    // eslint-disable-next-line
  }, [selectedMonth, selectedYear]);

  const handleSelect = (d: number) => {
    setSelectedDay(d);
    const selectedDate = new Date(selectedYear, selectedMonth - 1, d);
    onChange(selectedDate.toISOString().slice(0, 10));
  };

  return (
    <div className="p-2 bg-[var(--color-main-light)] rounded-xl flex flex-col items-center gap-2">
       <h4>Год</h4>
      <div className="flex gap-2">
        {years.map(y => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={clsx(
              "font-geologica px-3 py-1 rounded-full",
              y === selectedYear
                ? "bg-[var(--color-main)] text-white"
                : "text-gray-800 hover:bg-[var(--color-main)] hover:text-white"
            )}
          >
            {y}
          </button>
        ))}
      </div>
      <h4>Месяц</h4>
      <div className="grid gap-1 grid-cols-6">
        {monthsInYear.map(m => (
          <button
            key={m}
            onClick={() => setSelectedMonth(m)}
            className={clsx(
              "font-geologica px-2 py-1 rounded",
              m === selectedMonth
                ? "bg-[var(--color-main)] text-white"
                : "text-gray-700 hover:bg-[var(--color-main)] hover:text-white"
            )}
          >
            {m.toString().padStart(2, '0')}
          </button>
        ))}
      </div>
      <h4>День</h4>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
          <div
            key={day}
            onClick={() => handleSelect(day)}
            className={clsx(
              "pointer w-8 h-8 rounded-full flex items-center justify-center font-geologica text-base",
              day === selectedDay
                ? "bg-[var(--color-main)] text-white"
                : "text-gray-800 hover:bg-[var(--color-main)] hover:text-white"
            )}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
