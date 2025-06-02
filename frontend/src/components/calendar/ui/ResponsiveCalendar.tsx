"use client";
import React, { MutableRefObject } from "react";
import { useMediaQuery } from "usehooks-ts";
import { MobileCalendarPanel } from "./MobileCalendarPanel";
import { MonthCard, DayCellData } from "./MonthCard";
import { getRuMonthInfinitiv } from "@/lib/date.util";

type MonthPeriod = { year: number; month: number };

interface ResponsiveCalendarProps {
  periodsFlat: MonthPeriod[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  daysForMonth: (year: number, month: number) => DayCellData[];
  monthRefs?: MutableRefObject<Record<string, HTMLDivElement | null>>;
}

function useHasHydrated() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

export const ResponsiveCalendar: React.FC<ResponsiveCalendarProps> = ({
  periodsFlat,
  selectedDate,
  onSelectDate,
  daysForMonth,
  monthRefs,
}) => {
  const hydrated = useHasHydrated();
  const isMobile = useMediaQuery("(max-width: 767px)", { initializeWithValue: false });

  if (!hydrated || isMobile === undefined) {
    return null; // не рендерить до первого маунта!
  }

  if (isMobile) {
    return (
      <MobileCalendarPanel
        periodsFlat={periodsFlat}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        daysForMonth={daysForMonth}
      />
    );
  }

  // Десктоп
  return (
    <div className="flex flex-col gap-4 overflow-y-auto flex-1 pr-2 pt-2 no-scrollbar">
      {periodsFlat.map(({ year, month }) => (
        <div
          key={`${year}-${month}`}
          ref={(el) => {
            if (el && monthRefs) monthRefs.current[`${year}-${month}`] = el;
          }}
        >
          <MonthCard
            month={getRuMonthInfinitiv(month)}
            year={year}
            days={daysForMonth(year, month)}
            onSelect={(day) => {
              const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}`;
              onSelectDate(dateStr);
            }}
          />
        </div>
      ))}
    </div>
  );
};
