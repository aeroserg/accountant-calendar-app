'use client';
import { YandexMetricaProvider } from 'next-yandex-metrica';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <YandexMetricaProvider tagID={102320706} initParameters={{
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    }}>
      {children}
    </YandexMetricaProvider>
  );
}
