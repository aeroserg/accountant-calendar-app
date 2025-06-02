# 🧾 Accountant Calendar – Full Stack Repository

> Полноценное решение для отображения бухгалтерского календаря с форматируемыми событиями и экспортом заметок в `.ics`.

---

## 📁 Проекты

- [`/frontend`](./frontend/) — Next.js клиентское приложение
- [`/strapi`](./strapi-backend/) — Strapi CMS для управления событиями

---

## 🧹 Общая архитектура

- **Frontend**: отображение календаря, заметки, экспорт в `.ics`
- **Strapi CMS**: rich text события на определённые даты
- **Rich Text**: поддержка заголовков, списков, ссылок, цветного текста
- **API**: данные приходят в `frontend` через REST-запросы к Strapi

---

## 🚀 Быстрый старт

```bash
# Запуск Strapi
cd strapi
npm install
npm run develop
```

```bash
# Запуск клиента
cd frontend
npm install
npm run dev
```

---

## 🚣 Планы

- Синхронизация заметок
- Авторизация
- Отправка push
- Управление событиями через UI

---

## 👤 Автор

Сергей ([@aeroserg](https://github.com/aeroserg))  
