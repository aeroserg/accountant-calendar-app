// components/shared/ui/ToastProvider.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'warning' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<{
  showToast: (msg: string, type?: ToastType) => void;
} | null>(null);

let toastId = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed z-[99999] bottom-2 right-[43%] flex flex-col gap-3 pointer-events-none">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`min-w-[150px] w-full px-4 py-3 rounded-xl shadow-lg font-inter text-base font-semibold pointer-events-auto
              ${type === 'success' ? 'bg-green-500 text-white'
              : type === 'warning' ? 'bg-yellow-500 text-black'
              : type === 'error' ? 'bg-red-500 text-white'
              : 'bg-gray-800 text-white'}`}
            style={{ opacity: 0.97 }}
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Хук для показа toast
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx.showToast;
};
