// components/shared/ui/NoteModal.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import { DateWheel, TimeWheel } from '@/components/shared/ui/Wheels';
import { generateICS, saveICS } from '@/lib/ics-export';
import { useToast } from '../shared/ui/ToastProvider';

interface NoteModalProps {
  title: string;
  noteText: string;
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:MM'
  onChangeTitle: (val: string) => void;
  onChangeText: (val: string) => void;
  onChangeDate: (val: string) => void;
  onChangeTime: (val: string) => void;
  onClose: () => void;
  onSave: () => void;
  onCalendarAdd?: () => void;
  onAiClick?: () => void;
  onDelete?: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  title,
  noteText,
  date,
  time,
  onChangeTitle,
  onChangeText,
  onChangeDate,
  onChangeTime,
  onClose,
  onSave,
  onAiClick,
  onDelete,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const showToast = useToast();
  return (
    <div className="fixed inset-0 bg-[#00000090] z-50 flex justify-center items-center">
      <div className="relative w-full lg:max-w-[95%] max-w-full lg:h-[95vh] h-full lg:rounded-[40px] bg-[var(--foreground)] shadow-lg flex flex-col lg:p-10 p-4">
        {/* Крестик */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 p-1 bg-transparent !cursor-pointer rounded-full"
          aria-label="Закрыть"
        >
          <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.35355" y1="0.646447" x2="27.3536" y2="26.6464" stroke="black"/>
            <line x1="0.646447" y1="26.6464" x2="26.6464" y2="0.646446" stroke="black"/>
          </svg>
        </button>

        {/* Название заметки */}
        <input
          ref={inputRef}
          value={title}
          onChange={e => onChangeTitle(e.target.value)}
          placeholder="Название заметки"
          className="
            lg:w-1/2 w-full font-inter text-3xl font-medium bg-transparent mb-4
            border-0 border-b-2 border-b-transparent focus:border-b-[var(--color-main)]
            focus:outline-none transition px-1 py-2
          "
        />

        {/* Текстовое поле */}
        <textarea
          value={noteText}
          onChange={e => onChangeText(e.target.value)}
          placeholder="Текст заметки"
          rows={10}
          className="
            w-full h-full resize-none font-inter text-base bg-[var(--color-main-light)]
            rounded-[20px] p-6 mb-8 border-0 outline-none min-h-[180px] lg:max-h-[500px]
            focus:outline-[2px] focus:outline-[var(--color-main)] transition
          "
        />

        {/* Кнопки выбора даты и времени */}
        <div className="flex flex-row flex-wrap gap-4 justify-between items-center mt-auto mb-6">
          <div className="flex flex-row gap-4 flex-wrap">
            <Button
              gradient={false}
              icon="/icons/date_icon.png"
              label={date ? new Date(date).toLocaleDateString('ru-RU') : 'Дата'}
              button
              onClick={() => setShowDatePicker(true)}
              className="!rounded-[14px] min-w-[120px] px-6 py-2"
            />
            <Button
              gradient={false}
              icon="/icons/time_icon.png"
              label={time || 'Время'}
              button
              onClick={() => setShowTimePicker(true)}
              className="!rounded-[14px] min-w-[120px] px-6 py-2"
            />
            <Button
              gradient={false}
              icon="/icons/calendar-add_icon.png"
              label="Добавить в календарь"
              button
              onClick={() => {
                if (!date) {
                  showToast('Выберите дату!', 'warning');
                  return;
                }
                if (!title && !noteText) {
                  showToast('Заполните заметку или укажите заголовок', 'warning');
                  return;
                }
                const ics = generateICS({ title: title || 'Без названия', description: noteText, date, time});
                saveICS(ics, `${title || 'событие'}.ics`);
                showToast('Событие добавлено в календарь!', 'success');
              }}
              className="!rounded-[14px] min-w-[180px] px-6 py-2"
            />
            <Button
              gradient
              icon="/icons/ai_icon.png"
              label="Спросить у ExplainLaw"
              href='https://explaingpt.ru'
              button={false}
              onClick={onAiClick}
              className="!rounded-[14px]  h-[54px]  !py-0"
            />
          </div>
          <div className="flex flex-row gap-4 flex-wrap justify-end w-full lg:w-fit">
            {onDelete && <Button
              gradient={false}
              icon="/icons/delete_icon.png"
              label="Удалить"
              button
              onClick={onDelete}
              className="!rounded-[14px] min-w-[120px] px-6 py-2"
            />}
            <Button
              gradient={false}
              icon="/icons/done_icon.png"
              label="Сохранить"
              button
              onClick={onSave}
              className="!rounded-[14px] min-w-[120px] px-6 py-2"
            />
          </div>
        </div>

        {/* Wheel picker для даты */}
        {showDatePicker && (
          <div
            className="fixed inset-0 bg-[#00000099] z-50 flex justify-center items-center"
            onClick={() => setShowDatePicker(false)}
          >
            <div
              className="bg-white rounded-xl p-5 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <DateWheel
                value={date}
                onChange={val => { onChangeDate(val); setShowDatePicker(false); }}
              />
            </div>
          </div>
        )}
        {/* Wheel picker для времени */}
        {showTimePicker && (
          <div
            className="fixed inset-0 bg-[#00000099] z-50 flex justify-center items-center"
            onClick={() => setShowTimePicker(false)}
          >
            <div
              className="bg-white rounded-xl p-5 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <TimeWheel
                value={time}
                onChange={val => { onChangeTime(val); setShowTimePicker(false); }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
