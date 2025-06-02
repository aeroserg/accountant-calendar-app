"use client";
// components/shared/ui/Skeleton.tsx
import React from 'react';

export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={
        `animate-pulse bg-gray-500 rounded-md ${className}`
      }
      style={style}
    />
  );
}
