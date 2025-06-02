// types/event.interface.ts

import { RichTextElement } from './rich-text.interface';

export interface EventItem {
  id: number;
  date: string; // ISO date string: 'YYYY-MM-DD'
  type: 'ООО' | 'ИП' | 'физлицо' | 'иное';
  title: string;
  content: RichTextElement[];
}
