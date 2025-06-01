'use client';

import React, { FC } from 'react';
import clsx from 'clsx';

// Импортируйте ваши wheel-компоненты сюда или вставьте прямо сюда их код!
import { TimeWheel, DateWheel } from '@/components/shared/ui/Wheels'; // путь адаптируйте под себя

interface PickerButtonProps {
  pickerType: 'date' | 'time';
  label: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const PickerButton: FC<PickerButtonProps> = ({
  pickerType,
  label,
  icon,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-[14px] px-6 py-2 bg-[var(--color-main)] font-geologica text-white font-semibold text-lg min-w-[120px] transition',
        className
      )}
      style={{ minHeight: 56 }}
    >
      {icon && <img src={icon} alt="" className="h-7 w-7" />}
      <span>{label}</span>
      <div className="ml-4">
        {pickerType === 'time' ? (
          <TimeWheel value={value} onChange={onChange} />
        ) : (
          <DateWheel value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};
