"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAvailablePeriods, pad, getRuMonthDativ, getLocalDateString, getLocalTimeString } from "@/lib/date.util";
import { ResponsiveCalendar } from "@/components/calendar/ui/ResponsiveCalendar";
import { useNotes } from "@/hooks/useNotes";
import { notesRepository } from "@/db/notesRepository";
import { useStrapiEventDates } from "@/hooks/useAllEvents";
import { useToast } from "@/components/shared/ui/ToastProvider";
import { useDateNews } from "@/hooks/useEvents";
import { NotesList } from "@/components/notes/ui/NotesList";
import { Skeleton } from "@/components/shared/ui/Skeleton";
import { NoteModal } from "@/components/modal/NoteModal";
import { renderRichText } from "@/lib/render-rich-text";
import { UserNote } from "@/types/note.interface";
import { Button } from "@/components/shared/ui/Button";


export default function CalendarPage() {

  const periods = getAvailablePeriods();
  const periodsFlat = periods.flatMap((period) =>
    period.months.map((month) => ({ year: period.year, month }))
  );

  // Стейты
  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [selectedTime, setSelectedTime] = useState(getLocalTimeString());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalDate, setModalDate] = useState<string>(getLocalDateString());
  const [modalTime, setModalTime] = useState<string>(getLocalTimeString());
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);
  const [noteDates, setNoteDates] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"info" | "notes">("info");
  const toast = useToast();

  // refs для скролла
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const currentMonthKey = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString()}`;

  // Интеграции с хранилищем и API
  const { notes, loading, reload, addNote, updateNote, deleteNote } = useNotes(selectedDate);
  const strapiEvents = useStrapiEventDates();
  const { event, loading: eventLoading } = useDateNews(selectedDate);

  // Даты с заметками (для окрашивания в календаре)
  const refreshNoteDates = async () => {
    const dates = await notesRepository.getAllDates();
    setNoteDates(dates);
  };
  React.useEffect(() => { refreshNoteDates(); }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    setTimeout(() => {
      console.log("currentMonthKey", currentMonthKey);
        console.log("monthRefs.current", monthRefs.current);
      if (monthRefs.current && monthRefs.current[currentMonthKey]) {
        
        monthRefs.current[currentMonthKey].scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }, 0);
  }, [currentMonthKey, monthRefs, noteDates, periodsFlat]);

  // Для MonthCard: собрать day-данные
  function daysForMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateKey = `${year}-${pad(month)}-${pad(day)}`;
      return {
        day,
        strapi: Boolean(strapiEvents[dateKey]),
        user: noteDates.includes(dateKey),
        isSelected: dateKey === selectedDate,
        isToday: dateKey === getLocalDateString(),
      };
    });
  }

  // --- Обработчики модалки заметки ---
  function handleAddNoteClick() {
    setModalTitle(`Заметка от ${new Date().toLocaleDateString()}`);
    setModalText("");
    setSelectedTime(getLocalTimeString());
    setModalDate(selectedDate);
    setModalTime(selectedTime);
    setEditingNote(null);
    setModalOpen(true);
  }

  const handleSaveNote = async () => {
    if (editingNote) {
      await updateNote(editingNote.id, {
        title: modalTitle,
        text: modalText,
        date: modalDate,
        time: modalTime,
      });
      await reload();
      await refreshNoteDates();
      toast("Заметка обновлена", "success");
    } else {
      await addNote({
        title: modalTitle,
        text: modalText,
        date: modalDate,
        time: modalTime,
      });
      await reload();
      await refreshNoteDates();
      toast("Заметка сохранена", "success");
    }
    setModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = async () => {
    if (editingNote) {
      await deleteNote(editingNote.id);
      await reload();
      await refreshNoteDates();
      toast("Заметка удалена", "success");
      setModalOpen(false);
      setEditingNote(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden md:max-h-screen h-full bg-[var(--background)] px-4 pt-4 gap-4">
      {/* Сайдбар календаря (адаптив) */}
      <aside className="flex flex-col md:w-[360px] w-full gap-4">
        <h1 className="text-3xl font-inter font-semibold flex-shrink-0 ">
          Бухгалтерский календарь
        </h1>
        <ResponsiveCalendar
          periodsFlat={periodsFlat}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          daysForMonth={daysForMonth}
          monthRefs={monthRefs}
        />
      </aside>

      {/* ---- Контент ---- */}
      <main className="flex-1 flex xl:flex-row flex-col rounded-[32px] bg-[var(--foreground)] xl:p-8 p-4 mb-4 gap-4 2xl:gap-8">
        {/* --------- Мобильный: дата + табы --------- */}
        <div className="flex xl:hidden flex-row justify-between items-center mb-4 gap-3 w-full">
          {/* Дата (отдельным блоком) */}
          <div className="flex flex-col items-left min-w-[70px] pt-2">
            <div className="text-2xl font-inter font-normal leading-none">
              {parseInt(selectedDate.slice(8, 10), 10)}
            </div>
            <div className="text-lg font-inter font-normal leading-none">
              {getRuMonthDativ(parseInt(selectedDate.slice(5, 7), 10))}
            </div>
          </div>
          {/* Табики */}
          <div className="flex flex-row gap-2">
            <button
              className={`cursor-pointer rounded-[12px] px-6 py-1.5 text-base font-geologica font-semibold border transition
                ${activeTab === "info"
                  ? "bg-[var(--color-main)] text-white"
                  : "bg-[var(--color-main-light)] text-[var(--color-main)] border-[var(--color-main)]"
                }`}
              onClick={() => setActiveTab("info")}
            >
              Инфо
            </button>
            <button
              className={`cursor-pointer rounded-[12px] px-6 py-1.5 text-base font-geologica font-semibold border transition
                ${activeTab === "notes"
                  ? "bg-[var(--color-main)] text-white"
                  : "bg-[var(--color-main-light)] text-[var(--color-main)] border-[var(--color-main)]"
                }`}
              onClick={() => setActiveTab("notes")}
            >
              Заметки
            </button>
          </div>
        </div>

        {/* --------- Десктоп: только дата --------- */}
        <div className="hidden xl:flex flex-col items-left min-w-[90px] pt-2">
          <div className="text-3xl font-inter font-normal leading-none">
            {parseInt(selectedDate.slice(8, 10), 10)}
          </div>
          <div className="text-3xl font-inter font-normal leading-none">
            {getRuMonthDativ(parseInt(selectedDate.slice(5, 7), 10))}
          </div>
        </div>

        {/* ---- Info блок ---- */}
        {event && <div
          className={`
            flex-1 min-w-0 max-w-fit 2xl:max-w-[500px] flex flex-col gap-4 overflow-y-auto xl:h-[calc(100vh-64px)] !h-full no-scrollbar pb-4
            ${activeTab === "info" ? "" : "hidden xl:flex"}
          `}
        >
          {eventLoading ? (
            <div className="animate-pulse h-6 bg-gray-100 rounded mb-2" />
          ) : (
            <div className="flex flex-col gap-2">
              {event.text.map((block, i) => (
                <div key={i} className="mb-2">
                  {renderRichText(block)}
                </div>
              ))}
            </div>
          ) }
        </div>}

        {/* ---- Notes блок ---- */}
        <div
          className={`
            flex flex-col flex-1 h-full min-w-0 max-w-full xl:max-w-fit 2xl:max-w-fit
            ${activeTab === "notes" ? "" : "hidden xl:flex"}
          `}
        >
          <div className="flex flex-row items-center gap-4 justify-between z-10 shadow-[0_16px_24px_12px_rgba(255,255,255,255.85)]">
            <div className="text-3xl font-inter font-normal leading-none">
              Заметки
            </div>
            <Button
              gradient={false}
              icon=""
              label="Добавить"
              button={true}
              onClick={handleAddNoteClick}
              className="!rounded-[10px] px-2 py-1 text-lg h-fit"
            />
          </div>
          {/* Список заметок — только он скроллится! */}
          {
            notes.length &&  <div className="lg:flex-1  min-h-0 md:overflow-y-auto flex flex-col gap-4 pr-1">
            {loading ? (
              <Skeleton />
            ) : (
              <NotesList
                notes={notes}
                onNoteClick={(note) => {
                  setEditingNote(note);
                  setModalTitle(note.title);
                  setModalText(note.text || "");
                  setModalDate(note.date || selectedDate);
                  setModalTime(note.time || getLocalTimeString());
                  setModalOpen(true);
                }}
              />
            )}
          </div>
          }

          {/* Подсказка и ExplainLaw */}
          <div className="shadow-[0_-26px_10px_10px_rgba(255,255,255)] flex flex-col gap-2 items-start">
            <span className="text-base text-[var(--color-dark)] w-[320px]">
              Не уверены в законе? Не стоит рисковать, спросите ИИ юриста explainLaw.
            </span>
            <Button
              gradient
              icon="/icons/ai_icon.png"
              label="Спросить ExplainLaw"
              href="https://explaingpt.ru"
              button={false}
              className="!rounded-[20px] px-6 py-2 text-lg "
            />
          </div>
        </div>
      </main>

      {/* МОДАЛКА ДОБАВЛЕНИЯ ЗАМЕТКИ */}
      {modalOpen && (
        <NoteModal
          title={modalTitle}
          noteText={modalText}
          date={modalDate || selectedDate}
          time={modalTime || selectedTime}
          onChangeTitle={setModalTitle}
          onChangeText={setModalText}
          onClose={() => setModalOpen(false)}
          onChangeDate={setModalDate}
          onChangeTime={setModalTime}
          onSave={handleSaveNote}
          onDelete={editingNote ? handleDeleteNote : undefined}
        />
      )}
    </div>
  );
}
