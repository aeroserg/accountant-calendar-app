'use client';

import Link from 'next/link';
import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface ButtonProps {
  gradient?: boolean;
  icon?: string;
  label?: string;
  button?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({
  gradient = false,
  icon,
  label = '',
  button = true,
  href = '/',
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'flex !cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-1 text-base text-white font-geologica font-semibold transition-all duration-200';

  const gradientStyle = {
    backgroundImage:
      'linear-gradient(135deg, var(--color-main) 0%, var(--color-main) 40%, var(--color-secondary) 100%)',
  };

  const solidStyle = {
    backgroundColor: 'var(--color-main)',
  };

  const style = gradient ? gradientStyle : solidStyle;

  const hoverClass = gradient ? 'hover:opacity-90' : 'hover:brightness-110';

  const content = (
    <>
      {icon && <Image src={icon} alt="icon" className="h-[40px] w-[40px]" width={45} height={45} />}
      {label}
    </>
  );

  if (button) {
    return (
      <button
        type={type}
        onClick={onClick}
        style={style}
        className={clsx(baseStyles, hoverClass, className)}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href || '/'}
      style={style}
      className={clsx(baseStyles, hoverClass, className)}
    >
      {content}
    </Link>
  );
};
