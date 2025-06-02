// db/notesRepository.ts

import { initDB, STORE_NAME } from './indexedDB';
import { UserNote } from '@/types/note.interface';

function generateId(length = 12): string {
  return Array.from({ length }, () =>
    Math.random().toString(36).charAt(2)
  ).join('');
}


export const notesRepository = {
  async getAllDates(): Promise<string[]> {
    const db = await initDB();
    const allNotes = await db.getAll(STORE_NAME);
    return Array.from(new Set(allNotes.map(n => n.date).filter(Boolean)));
  },

  async getAll(): Promise<UserNote[]> {
    const db = await initDB();
    return db.getAll(STORE_NAME);
  },

  async getByDate(date: string): Promise<UserNote[]> {
    const db = await initDB();
    const index = db.transaction(STORE_NAME).store.index('date');
    return index.getAll(date);
  },

  async getWithoutDate(): Promise<UserNote[]> {
    const db = await initDB();
    const allNotes = await db.getAll(STORE_NAME);
    return allNotes.filter((n) => !n.date);
  },

  async create(note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const db = await initDB();
    const newNote: UserNote = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...note,
    };
    await db.add(STORE_NAME, newNote);
  },

  async update(id: string, updates: Partial<UserNote>): Promise<void> {
    const db = await initDB();
    const existing = await db.get(STORE_NAME, id);
    if (!existing) throw new Error('Note not found');
    const updated: UserNote = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await db.put(STORE_NAME, updated);
  },

  async delete(id: string): Promise<void> {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
  },
};
