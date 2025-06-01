// components/notes/NotesList.tsx
import React from 'react';
import { NoteCard } from './NoteCard';
import { UserNote } from '@/types/note.interface';

interface NotesListProps {
  notes: UserNote[];
  onNoteClick: (note: UserNote) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onNoteClick }) => (
  <div className="flex flex-col gap-4 !overflow-scroll  pb-6 pt-8 no-scrollbar">
    {notes.map(note => (
      <NoteCard
        key={note.id}
        title={note.title}
        description={note.text}
        date={note.date}
        time={note.time}
        onClick={() => onNoteClick(note)}
      />
    ))}
  </div>
);
