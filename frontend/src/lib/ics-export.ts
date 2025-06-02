// lib/ics-export.ts
export function getUserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

/**
 * Корректная генерация ICS-файла с поддержкой локального времени (не UTC!),
 * валидным форматом TZID, STATUS и локацией (опционально)
 * Поддерживает как all-day, так и time-based события.
 */
export function generateICS({
    title,
    description,
    date, // 'YYYY-MM-DD'
    time, // 'HH:MM'
    location, // string 
    durationMinutes = 60,
  }: {
    title: string;
    description?: string;
    date: string;
    time?: string;
    location?: string;
    durationMinutes?: number;
  }) {

    const TZID = getUserTimezone() ?? 'Europe/Moscow';
  
    let dtStart, dtEnd;
    if (time) {
      // Дата-время для DTSTART/DTEND
      dtStart = `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
      // Вычислить окончание
      const [h, m] = time.split(':').map(Number);
      const endDate = new Date(date);
      endDate.setHours(h, m + durationMinutes, 0, 0);
      dtEnd = `${date.replace(/-/g, '')}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;
    } else {
      // All-day event (только дата)
      dtStart = date.replace(/-/g, '');
      dtEnd = date.replace(/-/g, '');
    }
  
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      description ? `DESCRIPTION:${description}` : '',
      location ? `LOCATION:${location}` : '',
      time
        ? `DTSTART;TZID=${TZID}:${dtStart}`
        : `DTSTART;VALUE=DATE:${dtStart}`,
      time
        ? `DTEND;TZID=${TZID}:${dtEnd}`
        : `DTEND;VALUE=DATE:${dtEnd}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:3',
      'BEGIN:VALARM',
      'TRIGGER:-PT10M',
      description ? `DESCRIPTION:${description}` : '',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean).join('\r\n');
  }
  
  function pad(n: number) {
    return n.toString().padStart(2, '0');
  }
  

  export function saveICS(content: string, filename = 'event.ics') {
    const blob = new Blob([content], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
  