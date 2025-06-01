// hooks/useNotes.ts
"use client"
import { useEffect, useState, useCallback } from 'react';
import { UserNote } from '@/types/note.interface';
import { notesRepository } from '@/db/notesRepository';

export function useNotes(date?: string) {
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = date ? await notesRepository.getByDate(date) : await notesRepository.getAll();
      setNotes(data);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const addNote = async (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    await notesRepository.create(note);
    await loadNotes();
  };

  const updateNote = async (id: string, updates: Partial<UserNote>) => {
    await notesRepository.update(id, updates);
    await loadNotes();
  };

  const deleteNote = async (id: string) => {
    await notesRepository.delete(id);
    await loadNotes();
  };

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    reload: loadNotes,
  };
}
