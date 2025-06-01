"use client";

import React from "react";
import clsx from "clsx";

interface DayCellProps {
  day: number;
  strapi: boolean;
  user: boolean;
  isSelected: boolean;
  isToday?: boolean;
  onSelect?: (day: number) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  day,
  strapi,
  user,
  isSelected,
  isToday,
  onSelect,
}) => {
  // Вычисление стилей
  const baseClass =
    "w-5 h-5 p-4.5 rounded-[10px] flex items-center justify-center font-inter lg:text-lg text-[16px] font-medium transition cursor-pointer border-0 outline-0";

  // Специфичные стили для разных состояний
  let style: React.CSSProperties | undefined;
  if (strapi && user && !isSelected) {
    style = {
      background:
        "linear-gradient(135deg, var(--color-main) 0%, var(--color-main) 50%, var(--color-contrast) 50%, var(--color-contrast) 100%)",
    };
  }

  return (
    <button
      className={clsx(
        baseClass,
        isSelected && " !outline-2 !outline-black z-10",
        !isSelected &&
          isToday &&
          "ring-2 ring-[var(--color-main)] ring-offset-0 ",
        strapi && user && !isSelected && "text-white",
        strapi && !user && !isSelected && "bg-[var(--color-main)] text-white",
        !strapi &&
          user &&
          !isSelected &&
          "bg-[var(--color-contrast)] text-white",
        !strapi &&
          !user &&
          !isSelected &&
          "bg-[var(--color-background-cell)] text-[var(--color-dark)]"
      )}
      style={style}
      onClick={() => onSelect?.(day)}
      tabIndex={0}
      aria-label={`День ${day}`}
    >
      {day}
    </button>
  );
};
