// types/note.interface.ts

export interface UserNote {
  id: string;
  title: string;
  text: string;
  date?: string; // 'YYYY-MM-DD'
  time?: string; // 'HH:MM'
  createdAt: string;
  updatedAt: string;
}