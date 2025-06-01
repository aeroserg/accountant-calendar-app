calendar-notes-app/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Общий layout (шапка, навигация)
│   ├── page.tsx               # Редирект на /calendar
│   ├── calendar/
│   │   ├── page.tsx           # Главный календарь
│   │   └── components/
│   │       ├── CalendarGrid.tsx
│   │       ├── MonthSelector.tsx
│   │       ├── DayCell.tsx
│   │       └── RichTextBlock.tsx
│   ├── notes/
│   │   ├── page.tsx           # Все заметки
│   │   └── components/
│   │       ├── NotesList.tsx
│   │       └── NotesTabs.tsx
│   └── globals.css            # Tailwind, базовые стили
│
├── components/
│   ├── Modal.tsx              # Универсальная модалка
│   ├── NoteCard.tsx           # Универсальная карточка заметки
│   ├── AddNoteButton.tsx      # Кнопка "Добавить заметку"
│   ├── MobileHeader.tsx       # Заголовок для мобильных
│   └── MainMenu.tsx           # Навигация между страницами
│
├── db/
│   ├── indexedDb.ts           # Инициализация БД
│   └── notesRepository.ts     # CRUD-хелперы по заметкам
│
├── hooks/
│   ├── useNotes.ts            # Хук для работы с заметками
│   └── useEvents.ts           # Хук для загрузки событий из Strapi
│
├── lib/
│   ├── api-helper.ts          # ApiHelper.get / put
│   ├── ics-export.ts          # Генерация .ics-файлов
│   ├── render-rich-text.tsx   # Рендер rich text с форматированием
│   └── date-utils.ts          # Вспомогательные функции для дат
│
├── types/
│   ├── note.ts                # Типы заметок
│   ├── event.ts               # Типы событий из Strapi
│   └── rich-text.ts           # Структура CKEditor rich text
│
├── public/
│   ├── icons/
│   └── manifest.json          # PWA
│
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── tsconfig.json
