// components/notes/NoteCard.tsx
'use client';

import React from 'react';
import clsx from 'clsx';

interface NoteCardProps {
  title: string;
  description?: string;
  date?: string;      // 'YYYY-MM-DD'
  time?: string;      // 'HH:MM'
  onClick?: () => void;
  className?: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  title,
  description,
  date,
  time,
  onClick,
  className = '',
}) => {
  // Формат даты и времени
  let dateTime = '';
  if (date) {
    const dateObj = new Date(date + (time ? `T${time}` : ''));
    dateTime = dateObj.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    if (time) {
      // выводим время, если есть
      dateTime += ' ' + time;
    }
  }

  return (
    <div
      className={clsx(
        "rounded-[12px] xl:rounded-[16px] bg-[var(--color-main-light)] p-3 flex flex-col gap-1 w-full lg:w-[400px] cursor-pointer transition hover:opacity-70",
        className
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"

    >
      <div className="font-inter text-[16px] font-bold">{title}</div>
      {description && (
        <div
          className="font-inter text-[14px] font-normal text-[var(--color-dark)] mb-2 line-clamp-3"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {description}
        </div>
      )}
      <div className="mt-auto font-light text-[11px] text-[#868686] text-right select-none">{dateTime}</div>
    </div>
  );
};
