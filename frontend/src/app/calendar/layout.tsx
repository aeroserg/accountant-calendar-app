'use client';
import { ToastProvider } from '@/components/shared/ui/ToastProvider';

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}