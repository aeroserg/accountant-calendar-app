"use client"
// src/hooks/useEvents.ts

import { useEffect, useState } from "react";
import { ApiHelper } from "@/lib/api-helper";
import { RichTextElement } from "@/types/rich-text.interface";

interface DateNewsItem {
  id: number;
  documentId: string;
  text: RichTextElement[];
  date: string;
}

export function useDateNews(selectedDate: string) {
  const [event, setEvent] = useState<DateNewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchNews() {
      setLoading(true);
      const data = await ApiHelper.get<{ data: DateNewsItem[] }>("/date-newes");
      if (!ignore && data?.data) {

        const found = data.data.find(
          item =>
            new Date(item.date).toISOString().slice(0, 10) === selectedDate
        );
        setEvent(found ?? null);
      }
      setLoading(false);
    }

    fetchNews();
    return () => {
      ignore = true;
    };
  }, [selectedDate]);

  return { event, loading };
}