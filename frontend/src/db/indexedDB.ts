import { openDB, IDBPDatabase } from 'idb';
import type { UserNote } from '@/types/note.interface';

const DB_NAME = 'calendar-notes-db';
const DB_VERSION = 1;
const STORE_NAME = 'notes';

let dbPromise: Promise<IDBPDatabase<{ notes: UserNote }>>;

export function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<{ notes: UserNote }>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('date', 'date', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      },
    });
  }
  return dbPromise;
}

export { STORE_NAME };
