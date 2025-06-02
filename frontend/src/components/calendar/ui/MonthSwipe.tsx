"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MonthCard, DayCellData } from "./MonthCard";
import { getRuMonthDativ, getLocalDateString } from "@/lib/date.util";
import Image from "next/image";

interface MonthSwipeProps {
  periodsFlat: { year: number; month: number }[];
  monthRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  daysForMonth: (year: number, month: number) => DayCellData[];
}

export const MonthSwipe: React.FC<MonthSwipeProps> = ({
  periodsFlat,
  selectedDate,
  onSelectDate,
  daysForMonth,
}) => {
  // --- Выбираем стартовый месяц по дате, иначе последний
  const getStartIdx = () => {
    const today = selectedDate || getLocalDateString();
    const [y, m] = today.split("-").map(Number);
    const idx = periodsFlat.findIndex(
      (p) => p.year === y && p.month === m
    );
    return idx >= 0 ? idx : periodsFlat.length - 1;
  };

  const [activeMonthIdx, setActiveMonthIdx] = useState(getStartIdx());
  const [direction, setDirection] = useState<"left" | "right">("left");
  const touchStartX = useRef<number | null>(null);

  // Если выбранная дата вне текущего месяца — показать соответствующий месяц
  useEffect(() => {
    const [y, m] = selectedDate.split("-").map(Number);
    const idx = periodsFlat.findIndex(
      (p) => p.year === y && p.month === m
    );
    if (idx !== -1 && idx !== activeMonthIdx) {
      setDirection(idx > activeMonthIdx ? "left" : "right");
      setActiveMonthIdx(idx);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50 && activeMonthIdx < periodsFlat.length - 1) {
      setDirection("left");
      setActiveMonthIdx((i) => i + 1);
    }
    if (dx > 50 && activeMonthIdx > 0) {
      setDirection("right");
      setActiveMonthIdx((i) => i - 1);
    }
    touchStartX.current = null;
  };

  // Для стрелок — направление и смена месяца
  const goPrev = () => {
    if (activeMonthIdx > 0) {
      setDirection("right");
      setActiveMonthIdx((i) => i - 1);
    }
  };
  const goNext = () => {
    if (activeMonthIdx < periodsFlat.length - 1) {
      setDirection("left");
      setActiveMonthIdx((i) => i + 1);
    }
  };

  const { year, month } = periodsFlat[activeMonthIdx];
  const monthKey = `${year}-${month.toString().padStart(2, "0")}`;

  // --- Управляемые анимации ---
  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "left" ? 120 : -120,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: { x: 0, opacity: 1, position: "relative" as const },
    exit: (dir: "left" | "right") => ({
      x: dir === "left" ? -120 : 120,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <div className="relative w-full min-h-[350px]">
      {/* Стрелки */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-2xl font-bold text-[var(--color-main)]"
        disabled={activeMonthIdx === 0}
        onClick={goPrev}
        aria-label="Назад"
        style={{ opacity: activeMonthIdx === 0 ? 0.3 : 1 }}
      >
        <Image 
          src={'/icons/arrow-left_icon.png'}
          width={35}
          height={35}
          alt="Стрелка влево"
          className="h-[35px] w-[35px]"
        />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-2xl font-bold text-[var(--color-main)]"
        disabled={activeMonthIdx === periodsFlat.length - 1}
        onClick={goNext}
        aria-label="Вперёд"
        style={{ opacity: activeMonthIdx === periodsFlat.length - 1 ? 0.3 : 1 }}
      >
        <Image 
          src={'/icons/arrow-right_icon.png'}
          width={35}
          height={35}
          alt="Стрелка вправо"
          className="h-[35px] w-[35px]"
        />
      </button>
      {/* Анимация месяца */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full min-h-[320px] flex items-stretch"
        style={{ position: "relative" }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={monthKey}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "tween",
              duration: 0.18, // Быстрее!
              ease: "easeInOut"
            }}
            className="w-full"
          >
            <MonthCard
              month={getRuMonthDativ(month)}
              year={year}
              days={daysForMonth(year, month)}
              onSelect={(day) => {
                const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
                  .toString()
                  .padStart(2, "0")}`;
                onSelectDate(dateStr);
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
