"use client";

import React from "react";
import { MonthSwipe } from "./MonthSwipe";
import { DayCellData } from "./MonthCard";

interface MobileCalendarPanelProps {
  periodsFlat: { year: number; month: number }[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  daysForMonth: (year: number, month: number) => DayCellData[];
}

export const MobileCalendarPanel: React.FC<MobileCalendarPanelProps> = ({
  periodsFlat,
  selectedDate,
  onSelectDate,
  daysForMonth,
}) => {
  return (
    <div className="w-full flex flex-col items-center py-2">

      <div className="w-full">
        <MonthSwipe
          periodsFlat={periodsFlat}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          daysForMonth={daysForMonth}
        />
      </div>
    </div>
  );
};
