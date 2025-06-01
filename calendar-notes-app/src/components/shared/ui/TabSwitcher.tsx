"use client";

import React from "react";

interface TabSwitcherProps {
  activeTab: "info" | "notes";
  onTabChange: (tab: "info" | "notes") => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onTabChange,
}) => (
  <div className="flex flex-row gap-2 w-full justify-center my-2">
    <button
      className={`cursor-pointer rounded-[12px] px-6 py-1.5 text-base font-geologica font-semibold border transition
        ${activeTab === "info"
          ? "bg-[var(--color-main)] text-white"
          : "bg-[var(--color-main-light)] text-[var(--color-main)] border-[var(--color-main)]"
        }`}
      onClick={() => onTabChange("info")}
    >
      Инфо
    </button>
    <button
      className={`cursor-pointer rounded-[12px] px-6 py-1.5 text-base font-geologica font-semibold border transition
        ${activeTab === "notes"
          ? "bg-[var(--color-main)] text-white"
          : "bg-[var(--color-main-light)] text-[var(--color-main)] border-[var(--color-main)]"
        }`}
      onClick={() => onTabChange("notes")}
    >
      Заметки
    </button>
  </div>
);
