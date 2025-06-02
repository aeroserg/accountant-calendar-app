"use client"
// src/hooks/useAllEvents.ts

import { useEffect, useState } from "react";
import { ApiHelper } from "@/lib/api-helper";

export function useStrapiEventDates() {
  const [strapiDatesMap, setStrapiDatesMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function load() {
      const res = await ApiHelper.get<{ data: { date: string }[] }>("/date-newes");
      // Составляем map: ключ - YYYY-MM-DD, значение - true
      const map: Record<string, boolean> = {};
      res?.data?.forEach(ev => {
        const day = new Date(ev.date).toISOString().slice(0, 10);
        map[day] = true;
      });
      setStrapiDatesMap(map);
    }
    load();
  }, []);

  return strapiDatesMap;
}
